"use client";

import { validateProcedureStatus } from "@/services/accreditations";
import { Button } from "../ui/button";
import { DialogContent } from "../ui/dialog";
import { toast } from "sonner";

import { use, useState } from "react";
import useSession from "@/hooks/useSession";
import { acceptModal } from "@/hooks/useModal";

export function AcceptModal() {
  const idProcedure = useSession();
  const modalAccept = acceptModal();

  const handlevalidateProcedureStatus = (
    accreditationId: any,
    validate: boolean
  ) => {
    idProcedure?.setIsLoading?.(true);

    validateProcedureStatus({ accreditationId, validate })
      .then((response) => {
        toast.success("Procedimento validado com sucesso!");
        modalAccept.openModal(false);
        idProcedure?.setProceduresId?.("");
      })
      .catch((error) => {
        toast.error("Erro ao validar procedimento");
      })
      .finally(() => {
        idProcedure?.setIsLoading?.(false);
      });
  };

  return (
    <DialogContent className="w-[90%] md:w-[30%] rounded-lg lg:max-w-[80vw] border border-none">
      <div className="flex flex-col gap-6 p-3">
        <div>
          <span className="text-xl font-semibold ">
            Você tem certeza que deseja aceitar essa solicitação?
          </span>
        </div>

        <div className="md:flex md:flex-row flex flex-col gap-2 md:gap-4">
          <Button
            onClick={() =>
              handlevalidateProcedureStatus(idProcedure.proceduresId, true)
            }
            className="w-full"
            variant="default"
          >
            Sim
          </Button>
          <Button
            onClick={() => modalAccept.openModal(false)}
            className="w-full"
            variant="destructive"
          >
            Não
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
