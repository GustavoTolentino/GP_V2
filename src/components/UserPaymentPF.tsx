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
  const [banks, setBanks] = useState<any[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState<any>({
    healthProfessionalId: refresh.idUser,
    paymentTypeId: "",
    paymentTerm: "",
    agency: "",
    bankAccountNumber: "",
    pixKey: "",
    bankId: ""
  });

  useEffect(() => {
    getDropdownsContent();
    getPaymentDetails();
  }, []);

  const getDropdownsContent = async () => {
    const response = await getAllDropdownsPayments();
    setBanks(response.banks);
    setPaymentTypesOptions(response.paymentTypes);
  };

  const getPaymentDetails = async () => {
    const response = await getPaymentById(refresh.idUser);
    console.log(response)
    console.log(response.data)
    const result = response.data;
    setPaymentTypes(result.paymentTypes || []);
    setPaymentTerms(result.paymentTerms || []);
    setData((prevData: any) => ({
      ...prevData,
      paymentTypeId: result.paymentTypeId || "",
      paymentTerm: result.paymentTerm || "",
      bankId: result.bankId || "",
      pixKey: result.pixKey || "",
      bankAccountNumber: result.bankAccountNumber || "",
      agency: result.agency || ""
    }));
  };

  const addPayment = async () => {
    updatePayment(data)
      .then((response) => {
        if (!response.data) {
          createPayment(data).then((resp: any) => {
            if (resp.success) {
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
      <div className="grid grid-cols-3 gap-4 items-center mb-4">
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
        <CustomSelect
          name="bankId"
          label="Banco"
          options={banks.map((bank) => ({
            id: bank.id,
            value: bank.name,
          }))}
          value={data.bankId}
          onChange={(selectedValue) => {
            setData((prevData: any) => ({
              ...prevData,
              bankId: selectedValue.target.value,
            }));
          }}
          disabled={!editMode}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <Input
          name="agency"
          placeholder="Agência"
          value={data.agency}
          onChange={(e) => {
            setData((prevState: any) => ({
              ...prevState,
              agency: e.target.value,
            }));
          }}
          disabled={!editMode}
        />
        <Input
          name="bankAccountNumber"
          placeholder="Conta corrente"
          value={data.bankAccountNumber}
          onChange={(e) => {
            setData((prevState: any) => ({
              ...prevState,
              bankAccountNumber: e.target.value,
            }));
          }}
          disabled={!editMode}
        />
        <Input
          name="pixKey"
          placeholder="Chave Pix"
          value={data.pixKey}
          onChange={(e) => {
            setData((prevState: any) => ({
              ...prevState,
              pixKey: e.target.value,
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
              disabled={!data.paymentTypeId || !data.paymentTerm || !data.agency || !data.bankAccountNumber || !data.pixKey}
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
