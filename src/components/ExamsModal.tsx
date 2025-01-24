"use client";

import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { examsModal } from "@/hooks/useModal";

const mockData = [
  { id: 1, code: "0999999", name: "DENSITOMETRIA OSSEA", selected: false },
  { id: 2, code: "0999999", name: "BIOPSIA RENAL", selected: false },
  { id: 3, code: "0999999", name: "ELETROLITOS SÉRICOS", selected: false },
  { id: 4, code: "0999999", name: "RNM CARDÍACA (COM MAPA)", selected: false },
  { id: 5, code: "10101012", name: "CONSULTA EM CONSULTÓRIO", selected: false },
  { id: 6, code: "10101020", name: "CONSULTA EM DOMICÍLIO", selected: false },
  {
    id: 7,
    code: "10103023",
    name: "ATENDIMENTO AO RECÉM-NASCIDO EM SALA DE PARTO",
    selected: false,
  },
];

export function ExamsModal() {
  const examsModalState = examsModal();
  const [exams, setExams] = useState(mockData);
  const closeModal = () => {
    examsModalState.openModal(false)
  }
  const toggleSelection = (id: number) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id ? { ...exam, selected: !exam.selected } : exam
      )
    );
  };

  return (
    <DialogContent className="md:w-[40%] rounded-lg lg:max-w-[80vw] border-none">
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div className="mt-5 flex justify-end">
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Exames do Programa: Alma
          </p>
          <Input
            placeholder="Filtrar"
            className="max-w-[250px] pt-0! pb-0! ml-auto"
          />
        </div>
        <div>
          <div className="grid grid-cols-7 items-center py-3 border-b-2">
            <span className="text-base font-semibold text-left">Código</span>
            <span className="text-base font-semibold text-left">Serviço</span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold text-right">Atende</span>
          </div>
          <div className="border rounded-md max-h-[300px] overflow-y-auto">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="grid grid-cols-7 items-center px-4 py-2 border-b last:border-b-0"
              >
                <span className="text-sm text-gray-700">{exam.code}</span>
                <span className="text-sm text-gray-800">{exam.name}</span>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <input
                  type="checkbox"
                  checked={exam.selected}
                  onChange={() => toggleSelection(exam.id)}
                  className="ml-auto"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button className="w-32 py-3" type="button" variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button className="w-32 py-3" type="button" variant="tertiary" disabled>
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
