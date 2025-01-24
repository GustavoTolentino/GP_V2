"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { createClient } from "@/services/client";
import { toast } from "sonner";
import { GiReturnArrow } from "react-icons/gi";
import useSession from "@/hooks/useSession";
import { clientRegister } from "@/hooks/useModal";

export function ClientRegister() {
  const clientRegisterModal = clientRegister();
  const refresh = useSession();

  // Estado para armazenar as informações do cliente
  const [data, setData] = useState<any>({
    name: "",
    status: true, // Status inicial é Ativo
    program: "",
  });

  // Função para adicionar o cliente
  const addClient = () => {
    createClient(data)
      .then((response) => {
        if (response.success) {
          toast.success("Cliente cadastrado com sucesso");
          refresh.setRefresh(true); // Atualiza a lista de clientes
          clearFields(); // Limpa os campos após o cadastro
        } else {
          toast.error("Erro ao cadastrar cliente");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao cadastrar cliente");
      })
      .finally(() => {
        refresh.setRefresh(false); // Finaliza o processo
      });
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setData({
      name: "",
      status: true,
      program: "",
    });
    clientRegisterModal.openModal(false); // Fecha o modal
  };

  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw] border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div className="w-full h-full">
          <div
            onClick={() => {
              clientRegisterModal.openModal(false);
            }}
            className="mb-5 p-3 flex items-center gap-2 w-fit rounded-lg cursor-pointer text-main-blue hover:bg-opacity-85 group"
          >
            <GiReturnArrow size={22} className="transition-transform duration-300" />
            <span className="opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Voltar
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <Input
              name="name"
              placeholder="Nome"
              value={data.name}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />

            <div className="flex flex-col gap-2">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Status (Ativo)
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg ">
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${data.status === true ? "bg-blue-500 text-white rounded-l-md" : ""}`}
                  onClick={() => setData({ ...data, status: true })}
                >
                  Ativo
                </div>
                <div className="h-full bg-gray-500 w-[1px]"></div>
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${data.status === false ? "bg-blue-500 text-white rounded-r-md" : ""}`}
                  onClick={() => setData({ ...data, status: false })}
                >
                  Inativo
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-10">
            <Button
              className="w-32 py-3 mt-2"
              type="button"
              variant="ghost"
              onClick={clearFields}
            >
              Cancelar
            </Button>
            <Button
              className="w-32 py-3 mt-2"
              type="button"
              variant="tertiary"
              onClick={addClient}
              disabled={!data.name || data.status === null} // Botão habilitado quando o nome e o status forem preenchidos
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
