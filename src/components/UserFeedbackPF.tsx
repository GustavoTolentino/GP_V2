"use client";

import LoadingPage from "@/components/custom/loading-page";
import { InputSearching } from "@/components/custom/InputSearching";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { UserRegister } from "@/components/UserRegister";
import {
  userFeedbackRegister,
  userFeedbackEdit,
  userFeedbackHistory,
} from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getAllFeedbacksById } from "@/services/feedback";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RiFileHistoryFill } from "react-icons/ri";
import { UserFeedbackPFRegister } from "./UserFeedbackPFRegister";
import { UserFeedbackPFedit } from "./UserFeedbackPFedit";
import { UserFeedbackPFHistory } from "./UserFeedbackPFHistory";

const UserFeedbackPF = () => {
  const feedbackRegisterModal = userFeedbackRegister();
  const feedbackHistoryModal = userFeedbackHistory();
  const feedbackEditModal = userFeedbackEdit();
  const refresh = useSession();
  const auth = useSession();
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [numberUsers, setNumberUsers] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const getUsersRegister = () => {
      getAllFeedbacksById(auth.idUser).then((response) => {
        if (response) {
          console.log(response);
          setUsers(response.data);
          setNumberUsers(response.count);
        } else{
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
            <span className="text-base">{numberUsers} </span> Usuários
            Cadastrados
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
            onClick={() => feedbackRegisterModal.openModal(true)}
          >
            Novo Feedback
          </Button>
        </div>
      </div>

      <div className="w-full py-5">
        <div className="hidden md:grid md:grid-cols-5">
          <span className="ml-8 text-base font-semibold">Cliente</span>
          <span className="ml-5 text-base font-semibold">Programa</span>
          <span className="ml-4 text-base font-semibold">Data Feedback</span>
          <span className="ml-2 text-base font-semibold">Motivo</span>
        </div>
        <div className="flex flex-col gap-5">
          {users.length > 0 ? (
            users.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center gap-3 rounded-lg mt-5 bg-gray-200 dark:bg-[#27272A]"
              >
                <div className={`py-6 w-2 rounded-l-lg hidden md:block`}></div>
                <div className="p-3">
                  <div className="flex flex-col md:grid md:grid-cols-5 gap-2">
                    <div className="flex flex-col">
                      <span className="block md:hidden text-base font-semibold">
                        Cliente
                      </span>
                      <span className="text-sm w-64">{user.customerName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="block md:hidden text-base font-semibold">
                        Programa
                      </span>
                      <span className="text-sm w-64">{user.programName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="block md:hidden text-base font-semibold">
                        Data Feedback
                      </span>
                      <span className="text-sm w-64">{user.dateFeedback}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="block md:hidden text-base font-semibold">
                        Motivo
                      </span>
                      <span className="text-sm w-64">{user.reasonFeedbackName}</span>
                    </div>
                    <div className="flex justify-end gap-5">
                      <span className="text-base font-semibold cursor-pointer">
                        <RiFileHistoryFill
                          size={20}
                          className="text-main-blue"
                          onClick={() => feedbackHistoryModal.openModal(true)}
                        />
                      </span>
                      <span className="text-base font-semibold cursor-pointer">
                        <IoIosArrowForward
                          size={20}
                          className="text-main-blue"
                          onClick={() => feedbackEditModal.openModal(true)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-[40px]">
              Nenhum feedback cadastrado
            </div>
          )}

          {filteredUsers && filteredUsers.length > usersPerPage && (
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
        open={feedbackRegisterModal.isModalOpen}
        onOpenChange={feedbackRegisterModal.openModal}
      >
        <UserFeedbackPFRegister />
      </Dialog>
      <Dialog
        open={feedbackEditModal.isModalOpen}
        onOpenChange={feedbackEditModal.openModal}
      >
        <UserFeedbackPFedit />
      </Dialog>
      <Dialog
        open={feedbackHistoryModal.isModalOpen}
        onOpenChange={feedbackHistoryModal.openModal}
      >
        <UserFeedbackPFHistory />
      </Dialog>
    </div>
  );
};

export default UserFeedbackPF;
