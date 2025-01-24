"use client";

import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { medicamentsModal } from "@/hooks/useModal";

const mockData = [
  { id: 1, code: "123456", name: "Paracetamol", selected: false },
  { id: 2, code: "234567", name: "Ibuprofeno", selected: false },
  { id: 3, code: "345678", name: "Amoxicilina", selected: false },
  { id: 4, code: "456789", name: "Diazepam", selected: false },
  { id: 5, code: "567890", name: "Cetoconazol", selected: false },
  { id: 6, code: "678901", name: "Dipirona", selected: false },
  { id: 7, code: "789012", name: "Lorazepam", selected: false },
];

export function MedicamentsModal() {
  const medicamentsModalState = medicamentsModal();
  const [medicaments, setMedicaments] = useState(mockData);
  const closeModal = () => {
    medicamentsModalState.openModal(false);
  };

  const toggleSelection = (id: number) => {
    setMedicaments((prev) =>
      prev.map((medicament) =>
        medicament.id === id ? { ...medicament, selected: !medicament.selected } : medicament
      )
    );
  };

  return (
    <DialogContent className="md:w-[40%] rounded-lg lg:max-w-[80vw] border-none">
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div className="mt-5 flex justify-end">
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Medicamentos do Programa: Alma
          </p>
          <Input
            placeholder="Filtrar"
            className="max-w-[250px] pt-0! pb-0! ml-auto"
          />
        </div>
        <div>
          <div className="grid grid-cols-7 items-center py-3 border-b-2">
            <span className="text-base font-semibold text-left">Código</span>
            <span className="text-base font-semibold text-left">Medicamento</span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold"></span>
            <span className="text-base font-semibold text-right">Atende</span>
          </div>
          <div className="border rounded-md max-h-[300px] overflow-y-auto">
            {medicaments.map((medicament) => (
              <div
                key={medicament.id}
                className="grid grid-cols-7 items-center px-4 py-2 border-b last:border-b-0"
              >
                <span className="text-sm text-gray-700">{medicament.code}</span>
                <span className="text-sm text-gray-800">{medicament.name}</span>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <input
                  type="checkbox"
                  checked={medicament.selected}
                  onChange={() => toggleSelection(medicament.id)}
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
