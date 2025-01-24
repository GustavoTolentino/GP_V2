"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { useState, useEffect } from "react";
import { createInvoice } from "@/services/invoice";
import { toast } from "sonner";
import { FaUpload } from "react-icons/fa";
import { userInvoiceRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";

export function UserInvoicePFRegister() {
  const invoiceRegisterModal = userInvoiceRegister();
  const refresh = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [procedureFile, setProcedureFile] = useState<File | null>(null);
  const [data, setData] = useState<any>({
    healthProfessionalId: refresh.idUser,
    identificationCode: "",
    file: "",
    fileName: "",
    fileMime: "",
    procedureInvoiceFile: "",
    procedureInvoiceFileName: "",
    procedureInvoiceFileMime: "",
    amount: ""
  });

  const handleProcedureFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    setProcedureFile(uploadedFile);
    if (uploadedFile) {
      const read = new FileReader();
      read.readAsDataURL(uploadedFile);
      read.onload = () => {
        setData((prevState: any) => ({
          ...prevState,
          procedureInvoiceFile: read.result as string,
          procedureInvoiceFileName: uploadedFile.name,
          procedureInvoiceFileMime: uploadedFile.type,
        }));
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    setFile(uploadedFile);
    if (uploadedFile) {
      const read = new FileReader();
      read.readAsDataURL(uploadedFile);
      read.onload = () => {
        setData((prevState: any) => ({
          ...prevState,
          file: read.result as string,
          fileName: uploadedFile.name,
          fileMime: uploadedFile.type,
        }));
      }
    }
  };

  const addInvoice = () => {
    console.log(data);
    createInvoice(data)
      .then((response) => {
        if (response.success) {
          toast.success("Invoice cadastrado com sucesso");
          refresh.setRefresh(true);
        }
        if (response.error) {
          toast.error("Erro ao cadastrar o invoice");
        }
        clearFields();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        refresh.setRefresh(false);
      });
  };

  const clearFields = () => {
    setData({
      healthProfessionalId: refresh.idUser,
      identificationCode: "",
      file: "",
      fileName: "",
      fileMime: "",
      procedureInvoiceFile: "",
      procedureInvoiceFileName: "",
      procedureInvoiceFileMime: "",
      amount: ""
    });
    setFile(null);
    setProcedureFile(null);
    invoiceRegisterModal.openModal(false);
  };

  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw] border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Cadastrar Nota Fiscal
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col md:flex-row md:gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <Input
                name="identificationCode"
                onChange={(e) => {
                  setData((prevState: any) => ({
                    ...prevState,
                    identificationCode: e.target.value,
                  }));
                }}
                value={data.identificationCode}
                placeholder="Número da nota fiscal"
                maxLength={50}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <Input
                name="amount"
                placeholder="Valor"
                value={data.amount}
                onChange={(e) => {
                  setData((prevState: any) => ({
                    ...prevState,
                    amount: e.target.value,
                  }));
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 items-start">
            <div>
              <label
                htmlFor="file"
                className="block cursor-pointer border-2 border-blue-500 bg-white rounded-lg p-4 text-center"
              >
                <div className="flex flex-col items-center gap-2 text-blue-500">
                  <FaUpload size={24} />
                  <span className="text-sm font-semibold">Nota Fiscal</span>
                </div>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <p className="mt-2 text-blue-500 text-sm break-words">
                  Arquivo selecionado: {file.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="procedureFile"
                className="block cursor-pointer border-2 border-blue-500 bg-white rounded-lg p-4 text-center"
              >
                <div className="flex flex-col items-center gap-2 text-blue-500">
                  <FaUpload size={24} />
                  <span className="text-sm font-semibold">Procedimento da NF</span>
                </div>
                <input
                  id="procedureFile"
                  type="file"
                  onChange={handleProcedureFileChange}
                  className="hidden"
                />
              </label>
              {procedureFile && (
                <p className="mt-2 text-blue-500 text-sm break-words">
                  Arquivo selecionado: {procedureFile.name}
                </p>
              )}
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
            onClick={addInvoice}
            disabled={!data.identificationCode || !data.amount}
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
