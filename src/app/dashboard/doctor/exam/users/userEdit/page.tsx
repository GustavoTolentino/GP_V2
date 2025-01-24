"use client";

import { CustomSelect } from "@/components/custom/CustomSelect";
import LoadingPage from "@/components/custom/loading-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSession from "@/hooks/useSession";
import { getProfileByProfileTypeId } from "@/services/profiles";
import { getUser, updateUsers } from "@/services/users";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

const page = () => {
  const id = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState<any>({
    id: "",
    name: "",
    email: "",
    profileId: "",
    password: "",
    status: true,
  });
  const [profileOptions, setProfileOptions] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  const getUsersRegister = () => {
    getUser(id.idUser)
      .then((response) => {
        const userData = response.data;

        if (userData.profile.profileType.name === "Interno") {
          setSelectedProfile("Interno");
          profileByProfileTypeId("dcb01a4d-5bcb-4337-91d4-cb06f53ce33a");
        } else if (userData.profile.profileType.name === "Externo") {
          setSelectedProfile("Externo");
          profileByProfileTypeId("88fe63fa-c271-414f-b515-40dee831696b");
        }

        setUpdateData({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          status: userData.status,
          profileId: userData.profile.id,
        });

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuário:", error);
      });
  };

  const profileByProfileTypeId = (id: string) => {
    getProfileByProfileTypeId({ profileTypeId: id })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const formattedOptions = response.data.map((profile: any) => ({
            id: profile.id,
            value: profile.name,
          }));

          setProfileOptions(formattedOptions);
        } else {
          setProfileOptions([]);
          console.log("Nenhum perfil encontrado para este tipo de perfil.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar perfis:", error);
        setProfileOptions([]);
      });
  };

  const updateUsersRegister = () => {
    const updatedData = {
      ...updateData,
      password: updateData.password ? updateData.password.trim() : "",
    };

    updateUsers(updatedData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsEditing(false);
        getUsersRegister();
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (status: boolean) => {
    setUpdateData((prevData: any) => ({
      ...prevData,
      status,
    }));
  };

  useEffect(() => {
    if (id.idUser) {
      getUsersRegister();
    }
  }, [id.idUser]);

  return (
    <div className="w-full h-screen">
      {isLoading && (
        <main className="h-screen opacity-70 bg-white -z-10">
          <LoadingPage />
        </main>
      )}
      <div className="flex flex-col gap-2 md:flex md:flex-row md:justify-end md:items-center mb-10">
        {isEditing ? (
          <div>
            <Button
              className="md:w-36 w-full py-3"
              type="button"
              variant="ghost"
              iconPosition="start"
              onClick={() => {
                router.push("/dashboard/doctor/exam/users");
              }}
            >
              Voltar
            </Button>
            <Button
              className="md:w-36 w-full py-3"
              type="submit"
              variant="tertiary"
              iconPosition="start"
              onClick={updateUsersRegister}
            >
              Salvar
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="md:w-36 w-full py-3"
              type="button"
              variant="ghost"
              iconPosition="start"
              onClick={() => {
                router.push("/dashboard/doctor/exam/users");
              }}
            >
              Voltar
            </Button>
            <Button
              className="md:w-36 w-full py-3"
              type="button"
              variant="tertiary"
              iconPosition="start"
              onClick={handleEdit}
            >
              Editar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 mt-5">
        <Input
          name="name"
          placeholder="Nome"
          value={updateData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <Input
          name="email"
          placeholder="E-mail"
          value={updateData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
              Tipo de perfil
            </span>
            <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg ">
              <div
                className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                  selectedProfile === "Interno"
                    ? isEditing
                      ? "bg-blue-500 text-white rounded-l-md"
                      : "bg-blue-700 text-white rounded-l-md"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (isEditing) {
                    setSelectedProfile("Interno");
                    profileByProfileTypeId(
                      "DCB01A4D-5BCB-4337-91D4-CB06F53CE33A"
                    );
                  }
                }}
              >
                Interno
              </div>
              <div className="h-full bg-gray-500 w-[1px]"></div>
              <div
                className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                  selectedProfile === "Externo"
                    ? isEditing
                      ? "bg-blue-500 text-white rounded-r-md"
                      : "bg-blue-700 text-white rounded-r-md"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (isEditing) {
                    setSelectedProfile("Externo");
                    profileByProfileTypeId(
                      "88FE63FA-C271-414F-B515-40DEE831696B"
                    );
                  }
                }}
              >
                Externo
              </div>
            </div>
          </div>

          <CustomSelect
            name="profileId"
            label="Perfil"
            options={profileOptions}
            value={updateData.profileId}
            onChange={(e: any) => {
              setUpdateData((prevState: any) => ({
                ...prevState,
                profileId: e.target.value,
              }));
            }}
            disabled={!isEditing || !selectedProfile}
          />
        </div>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-2">
            <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
              Status
            </span>
            <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg">
              <div
                className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                  selectedStatus
                    ? isEditing
                      ? "bg-blue-500 text-white rounded-l-md"
                      : "bg-blue-700 text-white rounded-l-md"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (isEditing) {
                    setSelectedStatus(true);
                    handleStatusChange(true);
                  }
                }}
              >
                Ativo
              </div>
              <div className="h-full bg-gray-500 w-[1px]"></div>
              <div
                className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                  !selectedStatus
                    ? isEditing
                      ? "bg-blue-500 text-white rounded-r-md"
                      : "bg-blue-700 text-white rounded-r-md"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (isEditing) {
                    setSelectedStatus(false);
                    handleStatusChange(false);
                  }
                }}
              >
                Inativo
              </div>
            </div>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={updateData.password || ""}
            onChange={(e: any) =>
              setUpdateData((prevData: any) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
