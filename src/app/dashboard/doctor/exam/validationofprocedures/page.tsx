"use client";

import React, { useEffect, useState } from "react";
import { AccordionDemo } from "@/components/Accordion";
import { FaBuilding, FaHandshake, FaSpinner, FaUsers } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  getProceduresInValidationCooperated,
  getProceduresInValidationIndividual,
  getProceduresInValidationLegalEntity,
  getProceduresInValidationThirdParty,
} from "@/services/accreditations";
import { Dialog } from "@/components/ui/dialog";
import { acceptModal, rescueModal } from "@/hooks/useModal";
import { AcceptModal } from "@/components/signup/AcceptModal";
import useSession from "@/hooks/useSession";
import { RescueModal } from "@/components/signup/RescueModal";

const page = () => {
  const modalAccept = acceptModal();
  const modalRescue = rescueModal();
  const idProcedure = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [procedures, setProcedures] = useState<any[]>([]);
  const [numberProcedures, setNumberProcedures] = useState<number>(0);
  const [proceduresIndividual, setProceduresIndividual] = useState<any[]>([]);
  const [numberProceduresIndividual, setNumberProceduresIndividual] =
    useState<number>(0);
  const [proceduresLegalEntity, setProceduresLegalEntity] = useState<any[]>([]);
  const [numberProceduresLegalEntity, setNumberProceduresLegalEntity] =
    useState<number>(0);
  const [proceduresThirdParty, setProceduresThirdParty] = useState<any[]>([]);
  const [numberProceduresThirdParty, setNumberProceduresThirdParty] =
    useState<number>(0);

  const fetchProcedures = () => {
    setIsLoading(true);

    Promise.all([
      getProceduresInValidationIndividual(),
      getProceduresInValidationLegalEntity(),
      getProceduresInValidationCooperated(),
      getProceduresInValidationThirdParty(),
    ])
      .then(
        ([
          responseIndividual,
          responseLegalEntity,
          responseCooperated,
          responseThirdParty,
        ]) => {
          setProceduresIndividual(responseIndividual?.data.procedures || []);
          setNumberProceduresIndividual(responseIndividual?.data?.count || 0);

          setProceduresLegalEntity(responseLegalEntity?.data.procedures || []);
          setNumberProceduresLegalEntity(responseLegalEntity?.data?.count || 0);

          setProcedures(responseCooperated?.data.procedures || []);
          setNumberProcedures(responseCooperated?.data?.count || 0);

          setProceduresThirdParty(responseThirdParty?.data.procedures || []);
          setNumberProceduresThirdParty(responseThirdParty?.data?.count || 0);
        }
      )
      .catch((error) => {
        console.log(error);
        setProcedures([]);
        setProceduresIndividual([]);
        setProceduresLegalEntity([]);
        setProceduresThirdParty([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlevalidateProcedureStatus = (accreditationId: any) => {
    modalAccept.openModal(true);
    idProcedure?.setProceduresId?.(accreditationId);
  };

  const openModalRescue = (accreditationId: any) => {
    modalRescue.openModal(true);
    idProcedure?.setProceduresId?.(accreditationId);
  };

  useEffect(() => {
    fetchProcedures();
  }, []);

  useEffect(() => {
    if (!idProcedure.isLoading) {
      fetchProcedures();
    }
  }, [idProcedure.isLoading]);

  return (
    <div className="w-full h-screen mb-5">
      <h1 className="text-2xl font-semibold text-main-blue mb-5">
        Validação de Procedimentos
      </h1>

      <div className="grid grid-cols-1 gap-10 mt-5 w-full">
        <AccordionDemo
          icon={<IoPeopleSharp size={28} className="text-blue-500" />}
          title="Procedimentos Pessoas Físicas"
          number={numberProceduresIndividual}
          hidden={false}
        >
          <div className="w-full py-5 px-8">
            <div className="hidden md:grid md:grid-cols-5">
              <span className="ml-5 text-base font-semibold">Nome</span>
              <span className="ml-3 text-base font-semibold">Programa</span>
              <span className="text-base font-semibold">Serviço</span>
              <span className="text-base font-semibold">Valor</span>
            </div>
            {Array.isArray(proceduresIndividual) &&
            proceduresIndividual.length > 0 ? (
              proceduresIndividual.map((proceduresIndividual) => (
                <div
                  key={proceduresIndividual.id}
                  className="flex flex-col md:grid md:grid-cols-5 mt-5 border rounded-lg p-5 bg-gray-200"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Nome
                    </span>
                    <span className="font-bold w-60">
                      {proceduresIndividual.nameIdentification}
                    </span>
                    <span className="text-sm w-60">
                      CPF:{proceduresIndividual.documentIdentification}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Programa
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresIndividual.programName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Serviço
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresIndividual.serviceName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Valor
                    </span>
                    <span className="md:ml-2 ml-0">
                      R${proceduresIndividual.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex md:flex-row gap-2">
                    <Button
                      className="w-full md:w-24"
                      onClick={() =>
                        handlevalidateProcedureStatus(proceduresIndividual.id)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Aprovar"
                      )}
                    </Button>
                    <Button
                      onClick={() => openModalRescue(proceduresIndividual.id)}
                      className="w-full md:w-24 bg-red-700 hover:bg-destructive/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reprovar"
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-8 text-main-orange font-semibold">
                Não há procedimentos disponíveis no momento.
              </div>
            )}
          </div>
        </AccordionDemo>

        <AccordionDemo
          icon={<FaBuilding size={28} className="text-blue-500" />}
          title="Procedimentos Pessoas Jurídicas"
          hidden={false}
          number={numberProceduresLegalEntity}
        >
          <div className="w-full py-5 px-8">
            <div className="hidden md:grid md:grid-cols-5">
              <span className="ml-5 text-base font-semibold">Nome</span>
              <span className="ml-3 text-base font-semibold">Programa</span>
              <span className="text-base font-semibold">Serviço</span>
              <span className="text-base font-semibold">Valor</span>
            </div>

            {Array.isArray(proceduresLegalEntity) &&
            proceduresLegalEntity.length > 0 ? (
              proceduresLegalEntity.map((proceduresLegalEntity) => (
                <div
                  key={proceduresLegalEntity.id}
                  className="flex flex-col md:grid md:grid-cols-5 mt-5 border rounded-lg p-5 bg-gray-200"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Nome
                    </span>
                    <span className="font-bold w-60">
                      {proceduresLegalEntity.nameIdentification}
                    </span>
                    <span className="text-sm w-60">
                      CNPJ: {proceduresLegalEntity.documentIdentification}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Programa
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresLegalEntity.programName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Serviço
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresLegalEntity.serviceName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Valor
                    </span>
                    <span className="md:ml-2 ml-0">
                      R${proceduresLegalEntity.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex md:flex-row gap-2">
                    <Button
                      className="w-full md:w-24"
                      onClick={() =>
                        handlevalidateProcedureStatus(proceduresLegalEntity.id)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Aprovar"
                      )}
                    </Button>
                    <Button
                      onClick={() => openModalRescue(proceduresLegalEntity.id)}
                      className="w-full md:w-24 bg-red-700 hover:bg-destructive/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reprovar"
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-8 text-main-orange font-semibold">
                Não há procedimentos disponíveis no momento.
              </div>
            )}
          </div>
        </AccordionDemo>

        <AccordionDemo
          icon={<FaUsers size={28} className="text-blue-500" />}
          title="Procedimentos Cooperados"
          number={numberProcedures}
          hidden={false}
        >
          <div className="w-full py-5 px-8">
            <div className="hidden md:grid md:grid-cols-5">
              <span className="ml-5 text-base font-semibold">Nome</span>
              <span className="ml-3 text-base font-semibold">Programa</span>
              <span className="text-base font-semibold">Serviço</span>
              <span className="text-base font-semibold">Valor</span>
            </div>

            {Array.isArray(procedures) && procedures.length > 0 ? (
              procedures.map((proceduresCooperated) => (
                <div
                  key={proceduresCooperated.id}
                  className="flex flex-col md:grid md:grid-cols-5 mt-5 border rounded-lg p-5 bg-gray-200"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Nome
                    </span>
                    <span className="font-bold w-60">
                      {proceduresCooperated.nameIdentification}
                    </span>
                    <span className="text-sm w-60">
                      CNPJ: {proceduresCooperated.documentIdentification}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Programa
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresCooperated.programName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Serviço
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresCooperated.serviceName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Valor
                    </span>
                    <span className="md:ml-2 ml-0">
                      R${proceduresCooperated.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex md:flex-row gap-2">
                    <Button
                      className="w-full md:w-24"
                      onClick={() =>
                        handlevalidateProcedureStatus(proceduresCooperated.id)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Aprovar"
                      )}
                    </Button>
                    <Button
                      onClick={() => openModalRescue(proceduresCooperated.id)}
                      className="w-full md:w-24 bg-red-700 hover:bg-destructive/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reprovar"
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-8 text-main-orange font-semibold">
                Não há procedimentos disponíveis no momento.
              </div>
            )}
          </div>
        </AccordionDemo>

        <AccordionDemo
          icon={<FaHandshake size={28} className="text-blue-500" />}
          title="Procedimentos de Terceiros"
          number={numberProceduresThirdParty}
          hidden={false}
          customClass="mb-5"
        >
          <div className="w-full py-5 px-8">
            <div className="hidden md:grid md:grid-cols-5">
              <span className="ml-5 text-base font-semibold">Nome</span>
              <span className="ml-3 text-base font-semibold">Programa</span>
              <span className="text-base font-semibold">Serviço</span>
              <span className="text-base font-semibold">Valor</span>
            </div>

            {Array.isArray(proceduresThirdParty) &&
            proceduresThirdParty.length > 0 ? (
              proceduresThirdParty.map((proceduresThirdParty) => (
                <div
                  key={proceduresThirdParty.id}
                  className="flex flex-col md:grid md:grid-cols-5 mt-5 border rounded-lg p-5 bg-gray-200"
                >
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Nome
                    </span>
                    <span className="font-bold w-60">
                      {proceduresThirdParty.nameIdentification}
                    </span>
                    <span className="text-sm w-60">
                      CNPJ: {proceduresThirdParty.documentIdentification}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Programa
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresThirdParty.programName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Serviço
                    </span>
                    <span className="uppercase text-sm w-60">
                      {proceduresThirdParty.serviceName}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3">
                    <span className="block md:hidden mb-3 text-base font-semibold">
                      Valor
                    </span>
                    <span className="md:ml-2 ml-0">
                      R${proceduresThirdParty.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex md:flex-row gap-2">
                    <Button
                      className="w-full md:w-24"
                      onClick={() =>
                        handlevalidateProcedureStatus(proceduresThirdParty.id)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Aprovar"
                      )}
                    </Button>
                    <Button
                      onClick={() => openModalRescue(proceduresThirdParty.id)}
                      className="w-full md:w-24 bg-red-700 hover:bg-destructive/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Reprovar"
                      )}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-8 text-main-orange font-semibold">
                Não há procedimentos disponíveis no momento.
              </div>
            )}
          </div>
        </AccordionDemo>
        <Dialog
          open={modalAccept.isModalOpen}
          onOpenChange={modalAccept.openModal}
        >
          <AcceptModal />
        </Dialog>
        <Dialog
          open={modalRescue.isModalOpen}
          onOpenChange={modalRescue.openModal}
        >
          <RescueModal />
        </Dialog>
      </div>
    </div>
  );
};

export default page;
