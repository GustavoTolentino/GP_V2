"use client";

import LoadingPage from "@/components/custom/loading-page";
import { InputSearching } from "@/components/custom/InputSearching";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { UserRegister } from "@/components/UserRegister";
import { userRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getUsers } from "@/services/users";
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
  const [usersPerPage, setUsersPerPage] = useState(6);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const getUsersRegister = () => {
    setIsLoading(true);
    getUsers()
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
      <div className="flex flex-col gap-2 md:flex md:flex-row md:justify-between md:items-center mb-10 ">
        <h1 className="flex items-center text-2xl font-semibold text-main-blue ">
          Usuários
        </h1>

        <div className="flex flex-col gap-3 md:flex md:flex-row md:items-center">
          <span className="text-sm text-gray-500 w-full">
            <span className="text-base">{numberUsers} </span> Usuários
            Cadastrados
          </span>
          <InputSearching
            value={searchTerm}
            onChange={handleSearchChange}
            size={24}
          />
          <Button
            className="md:w-36 w-full py-3"
            type="submit"
            variant="tertiary"
            icon={<BsPlusLg />}
            iconPosition="start"
            onClick={() => userRegisterModal.openModal(true)}
          >
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="w-full py-5">
        <div className="hidden md:grid md:grid-cols-6">
          <span className="ml-8 text-base font-semibold">Nome</span>
          <span className="ml-8 text-base font-semibold">Email</span>
          <span className="ml-4 text-base font-semibold">
            Sub-Classificação
          </span>
          <span className="ml-2 text-base font-semibold">Tipo</span>
          <span className="ml-2 text-base font-semibold"></span>
        </div>
        <div className="flex flex-col gap-5">
          {currentUsers?.map((user: any) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg mt-5 bg-gray-200 dark:bg-[#27272A]"
            >
              <div
                className={`py-7 w-2 rounded-l-lg hidden md:block ${
                  user.status
                    ? "bg-green-400 dark:bg-green-500"
                    : "bg-red-600 dark:bg-red-700"
                }`}
              ></div>
              <div className="p-3">
                <div className="flex flex-col md:grid md:grid-cols-6 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="block md:hidden text-base font-semibold">
                      Nome
                    </span>
                    <div className="flex h-full gap-2 items-center">
                      {user.status ? (
                        <FaUserCheck
                          size={20}
                          className="text-green-400 hidden md:block"
                        />
                      ) : (
                        <FaUserTimes
                          size={20}
                          className="text-red-600 hidden md:block"
                        />
                      )}
                      <span className="md:font-bold w-64">{user.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Email
                    </span>
                    <span className="text-sm w-64">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Sub-Classificação
                    </span>
                    <span className="text-sm w-64 md:ml-5">
                      {user.profileName}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="block md:hidden text-base font-semibold">
                      Tipo
                    </span>
                    <span className="text-sm w-64">{user.profileTypeName}</span>
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
                          route.push(`/dashboard/doctor/exam/users/useredit`);
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
        <UserRegister />
      </Dialog>
    </div>
  );
};

export default page;
