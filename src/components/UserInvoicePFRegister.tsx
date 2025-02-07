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
  const [docName, setDocName] = useState<string>("Selecione o arquivo");

  const [documentTypes] = useState<{ id: string; name: string }[]>([
    { id: "67c5d605-9921-4300-a8e5-cb3ec02b7b94", name: "Nota Fiscal" },
    { id: "9e369cb1-671b-4628-aff6-0a00004c4112", name: "Recibo" },
    { id: "18abdf58-dd7b-4642-9977-25e30d6e206a", name: "Notificação de Débito" },
  ]);

  const [data, setData] = useState<any>({
    healthProfessionalId: refresh.idUser,
    documentNumber: "",
    file: "",
    fileName: "",
    fileMime: "",
    amount: "",
    observation: "",
    insertionDate: "2025-02-07T10:28:31.903Z",
    issueDate: "2025-02-07T10:28:31.903Z",
  });

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
      };
    }
  };

  const addInvoice = () => {
    createInvoice(data)
      .then((response) => {
        if (response.success) {
          toast.success("Nota Fiscal cadastrada com sucesso");
          refresh.setRefresh(true);
        }
        if (response.error) {
          toast.error("Erro ao cadastrar a Nota Fiscal");
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
      documentNumber: "",
      file: "",
      fileName: "",
      fileMime: "",
      amount: "",
    });
    setFile(null);
    setDocName("");
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
            <div className="flex-1 flex flex-cols-2 gap-2">
              <Input
                name="documentNumber"
                onChange={(e) => {
                  setData((prevState: any) => ({
                    ...prevState,
                    documentNumber: e.target.value,
                  }));
                }}
                value={data.documentNumber}
                placeholder="Número do documento"
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
          <CustomSelect
              name="documentTypeId"
              label="Documento"
              options={documentTypes.map((documentType) => ({
                id: String(documentType.id),
                value: documentType.name,
              }))}
              value={data.documentTypeId ? String(data.documentTypeId) : undefined}
              onChange={(selectedValue) => {
                setData((prevData: any) => ({
                  ...prevData,
                  invoiceTypeId: selectedValue.target.value,
                }));
                switch (selectedValue.target.value) {
                  case "9e369cb1-671b-4628-aff6-0a00004c4112":
                    setDocName("Selecione o Recibo");
                  break;
                  case "18abdf58-dd7b-4642-9977-25e30d6e206a":
                    setDocName("Selecione a Notificação de Débito");
                  break;
                  case "67c5d605-9921-4300-a8e5-cb3ec02b7b94":
                    setDocName("Selecione a Nota fiscal");
                  break;
                  default:
                    setDocName("Selecione o arquivo");
                  break;
                }
              }}
            />
            
            <div>
              <label
                htmlFor="file"
                className="block cursor-pointer border-2 border-blue-500 bg-white rounded-lg p-4 text-center"
              >
                <div className="flex flex-col items-center gap-2 text-blue-500">
                  <FaUpload size={24} />
                  <span className="text-sm font-semibold">{docName}</span>
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
            disabled={!data.documentNumber || !data.amount || !data.invoiceTypeId}
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
