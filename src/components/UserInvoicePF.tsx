"use client";

import LoadingPage from "@/components/custom/loading-page";
import { InputSearching } from "@/components/custom/InputSearching";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { userInvoiceRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getAllInvoicesById, getFile, getProcedureFile } from "@/services/invoice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FiDownload  } from "react-icons/fi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserInvoicePFRegister } from "./UserInvoicePFRegister";

const UserInvoicePF = () => {
  const invoiceRegisterModal = userInvoiceRegister();
  const refresh = useSession();
  const auth = useSession();
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [numberUsers, setNumberUsers] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const downloadProcedureFile = async (id: any) => {
    try {
      const response = await getProcedureFile(id) as any;
      if (response.success && response.data) {
        const { procedureInvoiceFile, procedureInvoiceFileName, procedureInvoiceFileMime } = response.data;
        const a = document.createElement("a");
        a.href = procedureInvoiceFile;
        a.download = procedureInvoiceFileName;
        a.type = procedureInvoiceFileMime;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Erro ao obter o arquivo", response.errors);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer o download do arquivo:", error);
    }
  };

  const downloadFile = async (id: any) => {
    try {
      const response = await getFile(id) as any;
      if (response.success && response.data) {
        const { file, fileName, fileMime } = response.data;
        const a = document.createElement("a");
        a.href = file;
        a.download = fileName;
        a.type = fileMime;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error("Erro ao obter o arquivo", response.errors);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer o download do arquivo:", error);
    }
  };

  const getUsersRegister = () => {
    getAllInvoicesById(auth.idUser).then((response) => {
      if (response.data) {
        setUsers(response.data);
        setNumberUsers(response.data.count);
        setFilteredUsers(response.data);
      } else {
        setUsers([]);
        setNumberUsers(0);
        setFilteredUsers([]);
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = users.filter(
      (user: any) =>
        user.identificationCode.includes(searchValue) ||
        user.amount.includes(searchValue)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(filteredUsers.length / usersPerPage)) {
      return;
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    getUsersRegister();
  }, []);

  useEffect(() => {
    if (!refresh.refresh) {
      getUsersRegister();
    }
  }, [refresh.refresh]);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col gap-3 md:flex md:flex-row md:items-center md:justify-end">
        <div>
          <span className="text-sm text-gray-500 w-full">
            <span className="text-base">{numberUsers} </span>Notas fiscais cadastradas
          </span>
        </div>
        <div>
          <InputSearching
            value={searchTerm}
            onChange={handleSearchChange}
            size={24}
          />
        </div>
        <div>
          <Button
            className="md:w-36 w-full py-3"
            type="submit"
            variant="tertiary"
            icon={<BsPlusLg />}
            iconPosition="start"
            onClick={() => invoiceRegisterModal.openModal(true)}
          >
            Nova Nota Fiscal
          </Button>
        </div>
      </div>

      <div className="w-full py-5">
        <div className="hidden md:grid md:grid-cols-4">
          <span className="ml-8 text-base font-semibold">Número do documento</span>
          <span className="ml-5 text-base font-semibold">Valor</span>
          <span className="ml-4 text-base font-semibold">Arquivo Anexado</span>
        </div>
        <div className="flex flex-col gap-5">
          {
            currentUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center gap-3 rounded-lg mt-5 bg-gray-200 dark:bg-[#27272A]"
              >
                <div className="py-6 w-2 rounded-l-lg hidden md:block"></div>
                <div className="p-3 w-full">
                  <div className="flex flex-col md:grid md:grid-cols-4 gap-2">
                    <div className="flex flex-col md:ml-8">
                      <span className="block md:hidden text-base font-semibold">
                        Numero do documento
                      </span>
                      <span className="text-sm">{user.documentNumber}</span>
                    </div>
                    <div className="flex flex-col md:ml-5">
                      <span className="block md:hidden text-base font-semibold">
                        Valor
                      </span>
                      <span className="text-sm">{user.amount}</span>
                    </div>
                    <div className="flex flex-col md:ml-4">
                      <span className="block md:hidden text-base font-semibold">
                        Documento
                      </span>
                      <span className="text-sm">
                        {user.hasFile ? (
                          <FiDownload 
                            size={32}
                            onClick={() => downloadFile(user.id)}
                            className="cursor-pointer hover:text-blue-400"
                          />
                        ) : (
                          <FiDownload 
                            size={32}
                            className="text-gray-400 opacity-50"
                          />
                        )}
                      </span>
                    </div>
                    {/* <div className="flex flex-col md:ml-2">
                      <span className="block md:hidden text-base font-semibold">
                        Procedimentos da NF
                      </span>
                      <span className="text-sm">
                        {user.hasProcedureInvoiceFile ? (
                          <FiDownload 
                            size={32}
                            onClick={() => downloadProcedureFile(user.id)}
                            className="cursor-pointer hover:text-blue-400"
                          />
                        ) : (
                          <FiDownload 
                            size={32}
                            className="text-gray-400 opacity-50"
                          />
                        )}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            ))
          }

          {filteredUsers.length > usersPerPage && (
            <div className="w-full flex justify-end mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? "bg-main-blue text-white" : ""}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                      aria-disabled={
                        currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={invoiceRegisterModal.isModalOpen}
        onOpenChange={(open) => {
          invoiceRegisterModal.openModal(open);
          if (!open) getUsersRegister();
        }}
      >
        <UserInvoicePFRegister />
      </Dialog>
    </div>
  );
};

export default UserInvoicePF;
