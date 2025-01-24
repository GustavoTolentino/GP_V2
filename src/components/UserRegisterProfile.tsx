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
import { Textarea } from "./ui/textarea";
import { InputSearching } from "./custom/InputSearching";
import { Check } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { set } from "date-fns";

export function UserRegisterProfile() {
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

  const clerFields = () => {
    setData({
      id: "",
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
      className="md:w-[60%] rounded-lg lg:max-w-[80vw] max-h-[calc(100vh-3rem)] overflow-y-auto border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Cadastrar Perfil
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5">
          <Input
            name="name"
            placeholder="Nome do perfil"
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
          <div className="flex flex-col gap-2">
            <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
              Breve descrição
            </span>
            <Textarea
              placeholder="Escreva uma descrição para o perfil..."
              name="description"
              value={data.description}
              onChange={(e: any) => {}}
            />
          </div>

          <div className="flex w-full">
            <div className="flex flex-col gap-2 w-80">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Status
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-full rounded-lg">
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    data.status === true
                      ? "bg-blue-500 text-white rounded-l-md"
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
                      ? "bg-blue-500 text-white rounded-r-md"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(false)}
                >
                  Inativo
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-80 ml-auto">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Tipo de perfil
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-full rounded-lg">
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
          </div>

          <div className="w-full border border-gray-500 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg text-main-blue">Permissões</span>
              </div>
              <div>
                <InputSearching size={24} />
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 md:px-7 px-4">
              <span className="text-sm md:text-base font-semibold">
                Módulo / Submódulo
              </span>
              <span className="text-sm font-semibold">Listar</span>
              <span className="text-sm font-semibold">Editar</span>
              <span className="text-sm font-semibold">Incluir</span>
              <span className="text-sm font-semibold">Todos</span>
            </div>
            <ScrollArea className="h-56 w-full md:p-4 py-2 mb-5">
              <div className="flex flex-col gap-2 max-h-72 ">
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">
                    Atribuição de serviço / Programas
                  </span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">
                    Atribuição de serviço / Enfermeras
                  </span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">
                    Atribuição de serviço / Painel de operações
                  </span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">Conta / Pessoa Física</span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">Conta / Pessoa Juridica</span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">Conta / Cooperado</span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
                <div className="flex justify-between items-center p-5 rounded-lg bg-gray-200">
                  <span className="text-sm w-32">Conta / Terceiro</span>

                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
              </div>
            </ScrollArea>
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
            onClick={() => {}}
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
