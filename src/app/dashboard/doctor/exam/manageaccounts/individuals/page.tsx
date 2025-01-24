"use client";

import LoadingPage from "@/components/custom/loading-page";
import { InputSearching } from "@/components/custom/InputSearching";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { userRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserRegisterPF } from "@/components/UserRegisterPF";
import { getHealthProfessionalsPaged } from "@/services/healthprofessionals";
import { format } from "date-fns";

const page = () => {
  const userRegisterModal = userRegister();
  const route = useRouter();
  const refresh = useSession();
  const id = useSession();
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [numberUsers, setNumberUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(7);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const healthProfessionalsPaged = () => {
    setIsLoading(true);
    getHealthProfessionalsPaged()
      .then((response) => {
        setUsers(response.data.items);
        setNumberUsers(response.data.count);
        setFilteredUsers(response.data.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filtered = users.filter(
      (user: any) =>
        user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.type?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.city?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.state?.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.status?.toLowerCase().includes(searchValue.toLowerCase()) ||
        formattedCreatedOn(user)
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        formattedActivationDate(user)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
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

  const formattedCreatedOn = (user: any) =>
    user.createdOn
      ? format(new Date(user.createdOn), "dd/MM/yyyy")
      : "Data não disponível";

  const formattedActivationDate = (user: any) =>
    user.activationDate
      ? format(new Date(user.activationDate), "dd/MM/yyyy")
      : "Data não disponível";

  useEffect(() => {
    healthProfessionalsPaged();
  }, []);

  useEffect(() => {
    if (!refresh.refresh) {
      healthProfessionalsPaged();
    }
  }, [refresh.refresh]);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col gap-2 md:flex md:flex-row md:items-center mb-10 ">
        <h1 className="flex items-center text-2xl font-semibold text-main-blue ">
          Gerenciamento de Contas - Pessoas Físicas
        </h1>

        <div className="flex flex-col gap-2 md:flex md:flex-row md:items-center md:ml-auto">
          <div className="w-[60%]">
            <span className="text-sm text-gray-500">
              {numberUsers} Usuários Cadastrados
            </span>
          </div>

          <InputSearching value={searchTerm} onChange={handleSearchChange} />
          <Button
            className="md:w-36 w-full py-3"
            type="submit"
            variant="tertiary"
            icon={<BsPlusLg />}
            iconPosition="start"
            onClick={() => userRegisterModal.openModal(true)}
          >
            Nova Conta PF
          </Button>
        </div>
      </div>

      <div className="w-full py-5">
        <div className="hidden md:grid md:grid-cols-9">
          <span className="text-base font-semibold">Nome</span>
          <span className="text-base font-semibold ml-2">Categoria</span>
          <span className="text-base font-semibold ml-6">Cidade</span>
          <span className="text-base font-semibold">Estado</span>
          <span className="text-base font-semibold">Status</span>
          <span className="text-base font-semibold">Criação</span>
          <span className="text-base font-semibold">Ultima ativação</span>
          <span className="text-base font-semibold"></span>
        </div>
        <div className="flex flex-col gap-5">
          {currentUsers?.map((user: any) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg mt-5 bg-gray-200 dark:bg-[#27272A]"
            >
              <div className="p-3">
                <div className="flex flex-col md:grid md:grid-cols-9 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="block md:hidden text-base font-semibold">
                      Nome
                    </span>
                    <div className="flex h-full gap-2 items-center">
                      <span className="md:font-bold w-64">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Categoria
                    </span>
                    <span className="text-sm w-64">{user.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Cidade
                    </span>
                    <span className="text-sm w-64 md:ml-5">{user.city}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Estado
                    </span>
                    <span className="text-sm w-64">{user.state}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Status
                    </span>
                    <span className="text-sm w-64">{user.status}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Criação
                    </span>
                    <span className="text-sm w-64">
                      {formattedCreatedOn(user)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Ultima ativação
                    </span>
                    <span className="text-sm w-64">
                      {formattedActivationDate(user)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold cursor-pointer">
                      <IoIosArrowForward
                        size={20}
                        className="text-main-blue"
                        onClick={() => {
                          if (id && id.setUserId) {
                            id.setUserId(user.id);
                          }
                          route.push(
                            `/dashboard/doctor/exam/manageaccounts/individuals/individualsedit`
                          );
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredUsers.length > usersPerPage && (
            <div className="w-full flex justify-end mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                      }
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {[
                    ...Array(Math.ceil(filteredUsers.length / usersPerPage)),
                  ].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(index + 1)}
                        className={
                          index + 1 === currentPage
                            ? "bg-main-blue text-white"
                            : ""
                        }
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
                        currentPage ===
                        Math.ceil(filteredUsers.length / usersPerPage)
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }
                      aria-disabled={
                        currentPage ===
                        Math.ceil(filteredUsers.length / usersPerPage)
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
        open={userRegisterModal.isModalOpen}
        onOpenChange={userRegisterModal.openModal}
      >
        <UserRegisterPF />
      </Dialog>
    </div>
  );
};

export default page;
