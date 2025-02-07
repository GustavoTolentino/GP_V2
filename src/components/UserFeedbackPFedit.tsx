"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";
import { creatUsers } from "@/services/users";
import { toast } from "sonner";
import { userServiceEdit } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import { getProfileByProfileTypeId } from "@/services/profiles";
import { Textarea } from "./ui/textarea";

export function UserFeedbackPFedit() {
  const registerEdit = userServiceEdit();
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

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    setFile(uploadedFile);
  };

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
    registerEdit.openModal(false);
  };

  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Editar Feedback
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="grid grid-cols-2 gap-4 items-center">
            <CustomSelect
              name=""
              label="Cliente"
              options={[{
                id: "Astellas",
                value: "Astellas"
              }]}
            />

            <CustomSelect
              name=""
              label="Programa"
              options={[{
                id: "Sobre a vida",
                value: "Sobre a vida"
              }]}
            />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <CustomSelect
              name=""
              label="Motivo"
              options={[{
                id: "Nao utilizou EPIs",
                value: "Nao utilizou EPIs"
              }]}
            />

          </div>
          <div className="grid grid-cols-4 gap-5 items-center">
            <Input type="date" name="" placeholder="Valor válido a partir de" />

            <label htmlFor="file" className="block cursor-pointer border-2 border-blue-500 bg-white rounded-lg p-4 text-center">
              <div className="flex flex-col items-center gap-2 text-blue-500">
                <FaUpload size={24} />
                <span className="text-sm font-semibold">Enviar arquivo</span>
              </div>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && <p className="mt-2 text-blue-500">Arquivo selecionado: {file.name}</p>}
          </div>
          <div className="grid grid-cols-1 gap-5">

            <div className="flex flex-col gap-2">
              <span className="w-full flex gap-1 text-start mb-1 text-sm font-bold uppercase tracking-wide text-main-blue">
                Observação
              </span>
              <Textarea
                name=""
                placeholder="Escreva aqui a descrição do serviço"
              />
            </div>
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
