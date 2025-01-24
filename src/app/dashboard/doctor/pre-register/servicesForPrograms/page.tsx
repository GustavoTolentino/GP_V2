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
import { ClientRegister } from "@/components/ClientRegister";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { examsModal, medicamentsModal } from "@/hooks/useModal";
import { ExamsModal } from "@/components/ExamsModal";
import { MedicamentsModal } from "@/components/MedicamentsModal";

const page = () => {
  const examsModalState = examsModal();
  const medicamentsModalState = medicamentsModal();
  const [filteredData, setFilteredData] = useState([]);
  const auth = useSession();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const route = useRouter();
  const [programs, setPrograms] = useState<any>([
    { code: 1, name: "Alma" },
    { code: 2, name: "Entre nos" },
    { code: 3, name: "Takeda" },
    { code: 4, name: "Enzimais" },
  ]);
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
  const openMedicationsModal = () => {
    medicamentsModalState.openModal(true);
  };

  const openExamsModal = () => {
    examsModalState.openModal(true);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = programs.filter(
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
    // getClientsRegister();
  }, []);

  // const getClientsRegister = () => {
  //   getAllClients().then((response) => {
  //     if (response.data) {
  //       setPrograms(response.data.items);
  //       setNumberUsers(response.data.count);
  //       console.log(response.data.items)
  //       console.log(response.data.count)
  //       setFilteredUsers(response.data.items);
  //     } else {
  //       setPrograms([]);
  //       setNumberUsers(0);
  //       setFilteredUsers([]);
  //     }
  //   });
  // };

  return (
    <div className="w-full h-screen px-4 py-8">
      <div className="hidden md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-main-blue">
          Administração de Serviços - <span className="text-lg">Serviços por Programa</span>
        </h1>
        <span className="text-sm text-gray-500">
          <span className="text-base">{numberUsers}</span> Serviços Cadastrados
        </span>
      </div>
      <div>

        <div className="grid grid-cols-7 items-center py-3 border-b-2">
          <span className="text-base font-semibold">Código</span>
          <span className="text-base font-semibold">Nome do Programa</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="text-base font-semibold">Gerenciar</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {programs?.map((program: any) => (
          <div
            key={program.id}
            className="grid grid-cols-7 items-center bg-gray-200 dark:bg-[#27272A] rounded-lg p-4"
          >
            <span className="text-sm font-medium">{program.code}</span>
            <span className="text-sm font-medium">{program.name}</span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className="flex gap-4">
              <Button
                className="w-32 py-2"
                type="button"
                variant="tertiary"
                onClick={openMedicationsModal}
              >
                Medicamentos
              </Button>
              <Button
                className="w-32 py-2"
                type="button"
                variant="tertiary"
                onClick={openExamsModal}
              >
                Exames
              </Button>
            </div>
          </div>
        ))}
      </div>
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
              {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map(
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      className={
                        index + 1 === currentPage ? "bg-main-blue text-white" : ""
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
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
      <Dialog
        open={examsModalState.isModalOpen}
        onOpenChange={(open) => {
          examsModalState.openModal(open);
          // if (!open) getClientsRegister();
        }}
      >
        <ExamsModal />
      </Dialog>
      <Dialog
        open={medicamentsModalState.isModalOpen}
        onOpenChange={(open) => {
          medicamentsModalState.openModal(open);
          // if (!open) getClientsRegister();
        }}
      >
        <MedicamentsModal />
      </Dialog>
    </div>
  );

};

export default page;
