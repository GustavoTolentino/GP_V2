"use client";

import LoadingPage from "@/components/custom/loading-page";
import { Button } from "@/components/ui/button";
import useSession from "@/hooks/useSession";
import { getAllDropdownsPayments, updatePayment, createPayment, getPaymentById } from "@/services/payment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomSelect } from "./custom/CustomSelect";
import { toast } from "react-toastify";
import { Input } from "./ui/input";

const UserPaymentPF = () => {
  const refresh = useSession();
  const auth = useSession();
  const [volumetriesOptions, setVolumetriesOptions] = useState<any[]>([]);
  const [paymentTypesOptions, setPaymentTypesOptions] = useState<any[]>([]);
  const [volumetries, setVolumetries] = useState<any[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<any>({
    healthProfessionalId: refresh.idUser,
    paymentTypeId: "",
    volumetryId: "",
    paymentTerm: 0
  });

  useEffect(() => {
    getDropdownsContent();
    getPaymentDetails();
  }, []);

  const getDropdownsContent = async () => {
    const response = await getAllDropdownsPayments();
    setVolumetriesOptions(response.volumetries);
    setPaymentTypesOptions(response.paymentTypes);
  };

  const getPaymentDetails = async () => {
    const response = await getPaymentById(refresh.idUser);
    const result = response.data;
    setVolumetries(result.volumetries || []);
    setPaymentTypes(result.paymentTypes || []);
    setPaymentTerms(result.paymentTerms || []);
    setData((prevData: any) => ({
      ...prevData,
      paymentTypeId: result.paymentTypeId || "",
      volumetryId: result.volumetryId || "",
      paymentTerm: result.paymentTerm || ""
    }));
  };

  const addPayment = async () => {
    console.log(data);
    updatePayment(data)
      .then((response) => {
        console.log("Atualizar");
        console.log(response);
        if(!response.data){
          createPayment(data).then((resp:any) => {
            if(resp.success) {
              toast.success("Dados de pagamento cadastrados com sucesso");
              setEditMode(false);
            } else {
              toast.error("Erro ao atualizar os Dados de pagamento");
            }
          });
        } else {
          toast.success("Dados de pagamento atualizados com sucesso");
          setEditMode(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        refresh.setRefresh(false);
      });
  };

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-3 gap-4 items-center">
        <CustomSelect
          name="volumetryId"
          label="Volumetria"
          options={volumetriesOptions.map((volumetry) => ({
            id: volumetry.id,
            value: volumetry.name,
          }))}
          value={data.volumetryId}
          onChange={(selectedValue) => {
            setData((prevData: any) => ({
              ...prevData,
              volumetryId: selectedValue.target.value,
            }));
          }}
          disabled={!editMode}
        />

        <CustomSelect
          name="paymentTypeId"
          label="Tipo de pagamento"
          options={paymentTypesOptions.map((paymentType) => ({
            id: paymentType.id,
            value: paymentType.name,
          }))}
          value={data.paymentTypeId}
          onChange={(selectedValue) => {
            setData((prevData: any) => ({
              ...prevData,
              paymentTypeId: selectedValue.target.value,
            }));
          }}
          disabled={!editMode}
        />
        <Input
              name="paymentTerm"
              placeholder="Prazo pagamento (em dias)"
              value={data.paymentTerm}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  paymentTerm: e.target.value,
                }));
              }}
              disabled={!editMode}
            />
      </div>
      <div className="flex justify-end gap-3 mt-10">
        {!editMode ? (
          <Button
            className="w-32 py-3 mt-2"
            type="button"
            variant="tertiary"
            onClick={() => setEditMode(true)}
          >
            Editar
          </Button>
        ) : (
          <>
            <Button
              className="w-32 py-3 mt-2"
              type="submit"
              variant="ghost"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
            <Button
              className="w-32 py-3 mt-2"
              type="submit"
              variant="tertiary"
              onClick={addPayment}
              disabled={!data.paymentTypeId || !data.volumetryId || !data.paymentTerm}
            >
              Salvar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPaymentPF;
