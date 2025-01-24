"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { useState, useEffect } from "react";
import { createFeedback, getAllDrodownsFeedback, getProgramsByCostumer } from "@/services/feedback";
import { toast } from "sonner";
import { FaUpload } from "react-icons/fa";
import { userFeedbackRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";

export function UserFeedbackPFRegister() {
  const feedbackRegisterModal = userFeedbackRegister();
  const refresh = useSession();
  const [reasons, setReasons] = useState<any[]>([]);
  const [costumers, setCostumers] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>({
    healthProfessionalId: refresh.idUser,
    customerId: "",
    programId: "",
    reasonFeedbackId: "",
    dateFeedback: "",
    file: "",
    fileName: "",
    fileMime: ""
  });

  useEffect(() => {
    getDropdownsContent();
  }, [])

  const getDropdownsContent = async () => {
    const response = await getAllDrodownsFeedback().then(
      (e) => {
        console.log(e);
        setCostumers(e.costumers);
        setReasons(e.reasons);
      }
    );
  }

  const getCostumerProgram = async (costumerId:any) => {
    const response = await getProgramsByCostumer(costumerId);
    setPrograms(response.data);
  }

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

  const addFeedback = () => {
    createFeedback(data)
      .then((response) => {
        if (response.success) {
          toast.success("Feedback cadastrado com sucesso");
        }
        if (response.error) {
          toast.error("Erro ao cadastrar o feedback");
        }
        clerFields();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        refresh.setRefresh(false);
      });
  };

  const clerFields = () => {
    setData({
      accountId: "",
      customerId: "",
      programId: "",
      reasonFeedbackId: "",
      dateFeedback: "",
      file: "",
      fileName: "",
      fileMime: "",
    });
    setFile(null);
    feedbackRegisterModal.openModal(false);
  };

  return (
    <DialogContent
      showCloseIcon={true}
      className="md:w-[40%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <div className="w-full flex flex-col gap-1 text-3xl md:text-2xl">
        <div>
          <p className="text-main-orange font-semibold md:text-xl text-base text-start">
            Cadastrar Feedback
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="grid grid-cols-2 gap-4 items-center">
            <CustomSelect
              name="customerId"
              label="Cliente"
              options={costumers.map((costumer) => ({
                id: costumer.id,
                value: costumer.name,
              }))}
              onChange={(selectedValue) => {
                setData((prevData: any) => ({
                  ...prevData,
                  customerId: selectedValue.target.value,
                }))
                getCostumerProgram(selectedValue.target.value);
              }}
            />

            <CustomSelect
              name="programId"
              label="Programa"
              options={programs.map((program:any) => ({
                id: program.id,
                value: program.name,
              }))}
              onChange={(selectedValue) => {
                setData((prevData: any) => ({
                  ...prevData,
                  programId: selectedValue.target.value,
                }))
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <CustomSelect
              name="reasonFeedbackId"
              label="Motivo"
              options={reasons.map((reason) => ({
                id: reason.id,
                value: reason.name,
              }))}
              onChange={(selectedValue) => {
                setData((prevData: any) => ({
                  ...prevData,
                  reasonFeedbackId: selectedValue.target.value,
                }));
              }}
            />

          </div>
          <div className="grid grid-cols-2 gap-5 items-start">
            <div>
              <label htmlFor="file" className="block cursor-pointer border-2 border-blue-500 bg-white rounded-lg p-4 text-center">
                <div className="flex flex-col items-center gap-2 text-blue-500">
                  <FaUpload size={24} />
                  <span className="text-sm font-semibold">Enviar arquivo</span>
                </div>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && <p className="mt-2 text-blue-500 text-sm break-words">Arquivo selecionado: {file.name}</p>}
            </div>


            <Input type="date" name="dateFeedback" placeholder="Valor válido a partir de" onChange={(event) => {
              const selectedDate = event.target.value;
              if (selectedDate) {
                const now = new Date();
                const isoFormattedDate = new Date(
                  `${selectedDate}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}Z`
                ).toISOString();
                setData((prevData: any) => ({
                  ...prevData,
                  dateFeedback: isoFormattedDate,
                }));
              }
            }} />

          </div>
        </div>

        <div className="flex justify-end gap-3 mt-10">
          <Button
            className="w-32 py-3 mt-2"
            type="submit"
            variant="ghost"
            onClick={clerFields}
          >
            Cancelar
          </Button>
          <Button
            className="w-32 py-3 mt-2"
            type="submit"
            variant="tertiary"
            onClick={addFeedback}
            disabled={!data.customerId || !data.programId || !data.reasonFeedbackId || !data.dateFeedback}
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
