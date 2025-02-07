"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSession from "@/hooks/useSession";
import { clientPerProgramModal } from "@/hooks/useModal";
import { getClientProgramById, updateClientProgram } from "@/services/clientsperprogram";

export function ClientPerProgram() {
  const clientPerProgramEditModal = clientPerProgramModal();
  const refresh = useSession();
  const auth = useSession();

  const [data, setData] = useState<any>({
    name: "",
    status: true,
    program: "",
  });

  useEffect(() => {
    if (auth.idClientProgram) {
      getClientInfo();
    }
  }, [auth.idClientProgram]);

  const getClientInfo = () => {
    const id = auth.idClientProgram;
    console.log(id);
    getClientProgramById(id).then((response) => {
      console.log(response);
      if (response.data) {
        console.log(response.data);
        setData(response.data);
      }
    });
  };

  const addClient = () => {
    updateClientProgram(data)
      .then((response) => {
        if (response.success) {
          toast.success("Cliente por Programa atualizado com sucesso");
          refresh.setRefresh(true);
          clearFields();
        } else {
          toast.error("Erro ao cadastrar cliente");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao cadastrar cliente");
      })
      .finally(() => {
        refresh.setRefresh(false);
      });
  };

  const clearFields = () => {
    setData({
      name: "",
      status: true,
      program: "",
    });
    clientPerProgramEditModal.openModal(false);
  };

  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw] border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 gap-4 mt-8 mb-4 items-center">
            <Input
              name="name"
              placeholder="Nome"
              value={data.customerName || ""}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  customerName: e.target.value,
                }));
              }}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 items-center">
            <Input
              name="program"
              placeholder="Programa"
              value={data.programName || ""}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  programName: e.target.value,
                }));
              }}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-4 items-center">
            <div className="flex flex-col gap-2">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Status (Ativo)
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg">
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    data.status === true ? "bg-blue-500 text-white rounded-l-md" : ""
                  }`}
                  onClick={() => setData({ ...data, status: true })}
                >
                  Ativo
                </div>
                <div className="h-full bg-gray-500 w-[1px]"></div>
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    data.status === false ? "bg-blue-500 text-white rounded-r-md" : ""
                  }`}
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
              disabled={data.status === null}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
