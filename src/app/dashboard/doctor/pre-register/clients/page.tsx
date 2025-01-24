"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import useSession from "@/hooks/useSession";
import { getAllClients } from "@/services/client";
import { clientRegister } from "@/hooks/useModal";
import { ClientRegister } from "@/components/ClientRegister";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const page = () => {
  const clientRegisterModal = clientRegister();
  const [filteredData, setFilteredData] = useState([]);
  const auth = useSession();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const route = useRouter();
  const [clients, setClients] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [numberUsers, setNumberUsers] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const Buttonfilter = () => {
    const filtered = data.filter((item: any) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        item.cpf.toLowerCase().includes(lowerCaseFilter) ||
        item.namePatient.toLowerCase().includes(lowerCaseFilter) ||
        item.diseaseName.toLowerCase().includes(lowerCaseFilter) ||
        item.logisticsStatus.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setFilteredData(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = clients.filter(
      (user: any) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.profileName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.profileTypeName.toLowerCase().includes(searchValue.toLowerCase())
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
    getClientsRegister();
  }, []);
  const getClientsRegister = () => {
    getAllClients().then((response) => {
      if (response.data) {
        setClients(response.data.items);
        setNumberUsers(response.data.count);
        console.log(response.data.items)
        console.log(response.data.count)
        setFilteredUsers(response.data.items);
      } else {
        setClients([]);
        setNumberUsers(0);
        setFilteredUsers([]);
      }
    });
  };

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <div className="w-full h-screen px-4">
      <div className="hidden md:flex justify-between items-center mb-20">
        <h1 className="hidden md:flex items-center gap-2 text-2xl font-semibold text-main-blue md:ml-2">
          Administração de Serviços - <span className="text-lg">Clientes</span>
        </h1>
        <div>
          <span className="text-sm text-gray-500 w-full">
            <span className="text-base">{numberUsers} </span> Clientes
            Cadastrados
          </span>
        </div>
        <Button
          className="md:w-36 w-full py-3"
          type="submit"
          variant="tertiary"
          icon={<BsPlusLg />}
          iconPosition="start"
          onClick={() => clientRegisterModal.openModal(true)}
        >
          Novo Cliente
        </Button>
      </div>

      <div className="w-full py-5">
        <div className="hidden md:grid md:grid-cols-2">
          <span className="ml-8 text-base font-semibold">Nome</span>
        </div>
        <div className="flex flex-col gap-5">
          {clients?.map((client: any) => (
            <div
              key={client.id}
              className="flex items-center gap-3 rounded-lg mt-2 bg-gray-200 dark:bg-[#27272A]"
            >
              <div
                className={`py-10 w-2 rounded-l-lg hidden md:block ${client.status
                  ? "bg-green-400 dark:bg-green-500"
                  : "bg-red-600 dark:bg-red-700"
                  }`}
              ></div>
              <div className="p-3 w-full flex justify-between align-center">
                <div className="flex flex-col gap-1">
                  <span className="md:font-bold w-64">{client.name}</span>
                  <span className="text-sm w-64">{client.name}</span>
                </div>
                <div className="flex flex-col justify-end gap-5">
                  <span className="text-base font-semibold cursor-pointer">
                    <IoIosArrowForward
                      size={20}
                      className="text-main-blue"
                      onClick={() => {
                        if (auth && auth.setClientId) {
                          auth.setClientId(client.id);
                        }
                        route.push(`/dashboard/doctor/pre-register/clients/clientEdit`);
                      }}
                    />
                  </span>
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
        open={clientRegisterModal.isModalOpen}
        onOpenChange={(open) => {
          clientRegisterModal.openModal(open);
          if (!open) getClientsRegister();
        }}
      ><ClientRegister /></Dialog>
    </div>
  );
};

export default page;
