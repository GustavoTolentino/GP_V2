"use client";

import { DialogContent } from "@/components/ui/dialog";

export function UserServiceHistoryPF() {
  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[55%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <div className="flex flex-col w-full h-full gap-5">
        <span className="text-xl text-main-blue font-bold">Histótico</span>
        <div className="flex flex-col w-full ">
          <div className="w-full grid grid-cols-6 p-5">
            <span className="font-bold">Data</span>
            <span className="font-bold">Usuário</span>
            <span className="font-bold">Status</span>
            <span className="font-bold">Valor antigo</span>
            <span className="font-bold">Valor novo</span>
            <span className="font-bold">Controle de tratativas</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-6 bg-gray-200 dark:bg-[#27272A] p-5 rounded-t-lg">
                <span>12/12/2021</span>
                <span>José da Silva</span>
                <span>Ativo</span>
                <span>R$ 150,00</span>
                <span>R$ 200,00</span>
                <span>Outros</span>
              </div>
              <div className="w-full flex gap-1 border-t bg-gray-200 dark:bg-[#27272A] p-5 rounded-b-lg">
                <span className="font-bold">Observações:</span>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Pariatur
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-6 bg-gray-200 dark:bg-[#27272A] p-5 rounded-t-lg">
                <span>12/12/2021</span>
                <span>José da Silva</span>
                <span>Ativo</span>
                <span>R$ 150,00</span>
                <span>R$ 200,00</span>
                <span>Outros</span>
              </div>
              <div className="w-full flex gap-1 border-t bg-gray-200 dark:bg-[#27272A] p-5 rounded-b-lg">
                <span className="font-bold">Observações:</span>
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-6 bg-gray-200 dark:bg-[#27272A] p-5 rounded-t-lg">
                <span>12/12/2021</span>
                <span>José da Silva</span>
                <span>Ativo</span>
                <span>R$ 150,00</span>
                <span>R$ 200,00</span>
                <span>Outros</span>
              </div>
              <div className="w-full flex gap-1 border-t bg-gray-200 dark:bg-[#27272A] p-5 rounded-b-lg">
                <span className="font-bold">Observações:</span>
                <span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
