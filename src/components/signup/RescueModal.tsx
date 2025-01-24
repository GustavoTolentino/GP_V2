"use client";

import { validateProcedureStatus } from "@/services/accreditations";
import { Button } from "../ui/button";
import { DialogContent } from "../ui/dialog";
import { toast } from "sonner";

import { useState } from "react";
import useSession from "@/hooks/useSession";
import { rescueModal } from "@/hooks/useModal";

export function RescueModal() {
  const [isLoading, setIsLoading] = useState(false);
  const idProcedure = useSession();
  const modalRescue = rescueModal();

  const handlevalidateProcedureStatus = (
    accreditationId: any,
    validate: boolean
  ) => {
    idProcedure?.setIsLoading?.(true);

    validateProcedureStatus({ accreditationId, validate })
      .then((response) => {
        toast.success("Procedimento validado com sucesso!");
        modalRescue.openModal(false);
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
            Você tem certeza que deseja recusar essa solicitação?
          </span>
        </div>

        <div className="md:flex md:flex-row flex flex-col gap-2 md:gap-4">
          <Button
            onClick={() =>
              handlevalidateProcedureStatus(idProcedure.proceduresId, false)
            }
            className="w-full"
            variant="default"
          >
            Sim
          </Button>
          <Button
            onClick={() => modalRescue.openModal(false)}
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
