"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { useState } from "react";
import { creatUsers } from "@/services/users";
import { toast } from "sonner";

import ReactInputMask from "react-input-mask";
import { userRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getProfileByProfileTypeId } from "@/services/profiles";
import { set } from "date-fns";

export function UserRegister() {
  const userRegisterModal = userRegister();
  const refresh = useSession();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [data, setData] = useState<any>({
    name: "",
    email: "",
    password: "",
    profileId: "",
    status: null,
  });

  const [profileOptions, setProfileOptions] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");

  const handleStatusChange = (newStatus: boolean) => {
    setData((prevState: any) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  const addUser = () => {
    refresh.setRefresh(true);
    creatUsers(data)
      .then((response) => {
        if (response.success) {
          toast.success("Usuário cadastrado com sucesso");
        }
        if (response.error) {
          toast.error("Erro ao cadastrar usuário");
        }
        clerFields();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        refresh.setRefresh(false);
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      toast.error("Por favor, insira um e-mail válido.");
    } else {
      toast.success("E-mail válido.");
      setIsEmailValid(true);
    }
  };

  const clerFields = () => {
    setData({
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "",
      email: "",
      password: "",
      profileId: "",
      status: null,
    });
    setSelectedProfile("");
    userRegisterModal.openModal(false);
  };

  return (
    <DialogContent
      showCloseIcon={false}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Cadastrar Usuário
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <Input
            name="name"
            placeholder="Nome"
            value={data.name}
            onChange={(e: any) => {
              const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
              setData((prevState: any) => ({
                ...prevState,
                name: onlyLetters,
              }));
            }}
            maxLength={50}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={data.email}
            onChange={(e: any) => {
              setData((prevState: any) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            onBlur={(e) => {
              validateEmail(e.target.value);
            }}
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
                      ? "bg-blue-500 text-white rounded-l-md"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedProfile("Interno");
                    profileByProfileTypeId(
                      "DCB01A4D-5BCB-4337-91D4-CB06F53CE33A"
                    );
                  }}
                >
                  Interno
                </div>
                <div className="h-full bg-gray-500 w-[1px]"></div>
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    selectedProfile === "Externo"
                      ? "bg-blue-500 text-white rounded-r-md"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedProfile("Externo");
                    profileByProfileTypeId(
                      "88FE63FA-C271-414F-B515-40DEE831696B"
                    );
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
              value={data.profileId}
              onChange={(e: any) => {
                setData((prevState: any) => ({
                  ...prevState,
                  profileId: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col gap-2">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Status
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg ">
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center  ${
                    data.status === true
                      ? "bg-blue-500 text-white  rounded-l-md"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(true)}
                >
                  Ativo
                </div>
                <div className="h-full bg-gray-500 w-[1px]"></div>
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    data.status === false
                      ? "bg-blue-500 text-white  rounded-r-md "
                      : ""
                  }`}
                  onClick={() => handleStatusChange(false)}
                >
                  Inativo
                </div>
              </div>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={data.password}
              onChange={(e: any) => {
                setData((prevState: any) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-10">
          <Button
            className="w-32 py-3 mt-2"
            type="submit"
            variant="ghost"
            onClick={clerFields}
          >
            Cancelar
          </Button>
          <Button
            className="w-32 py-3 mt-2"
            type="submit"
            variant="tertiary"
            onClick={addUser}
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
