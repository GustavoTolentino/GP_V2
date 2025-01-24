"use client";
import { useEffect, useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClientById, updateClient } from "@/services/client";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const refresh = useSession();
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState<any>({
    id: refresh.idClient,
    name: "",
    status: true,
    program: "",
  });

  // Função para buscar os dados do cliente
  const getClientDetails = async () => {
    try {
      const response = await getClientById(refresh.idClient);
      if (response?.data) {
        setData(response.data);
      } else {
        toast.error("Erro ao buscar dados do cliente.");
      }
    } catch (error) {
      toast.error("Erro ao buscar dados do cliente.");
    }
  };

  // Chama a função de busca ao carregar a tela
  useEffect(() => {
    getClientDetails();
  }, []);

  const editClient = async () => {
    updateClient(data)
      .then((res) => {
        if (res.data) {
          toast.success("Pessoa física atualizada com sucesso.");
          setEditMode(false);
        } else {
          toast.error("Erro ao atualizar profissional.");
        }
      })
      .catch((err) => {
        toast.error("Erro ao atualizar profissional.");
      });
  };

  const handleStatusChange = (newStatus: boolean) => {
    setData((prevState: any) => ({
      ...prevState,
      status: newStatus,
    }));
  };

  return (
    <div className="w-full h-full">
      <div
        onClick={() => {
          router.push("/dashboard/doctor/pre-register/clients");
        }}
        className="mb-5 p-3 flex items-center gap-2 w-fit rounded-lg cursor-pointer text-main-blue hover:bg-opacity-85 group"
      >
        <GiReturnArrow size={22} className="transition-transform duration-300" />
        <span className="opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Voltar
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        <Input
          name="name"
          placeholder="Nome"
          value={data.name}
          onChange={(e) => {
            setData((prevState: any) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          disabled={!editMode} // Desabilita o campo inicialmente
        />

        <div className="flex flex-col gap-2">
          <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
            Status (Ativo)
          </span>
          <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg ">
            <div
              className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                data.status === true ? "bg-blue-500 text-white  rounded-l-md" : ""
              } ${!editMode ? "cursor-not-allowed opacity-50" : ""}`} // Lógica para desabilitar a interação visualmente
              onClick={() => editMode && handleStatusChange(true)} // Impede ação se editMode for falso
            >
              Ativo
            </div>
            <div className="h-full bg-gray-500 w-[1px]"></div>
            <div
              className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                data.status === false ? "bg-blue-500 text-white  rounded-r-md " : ""
              } ${!editMode ? "cursor-not-allowed opacity-50" : ""}`} // Lógica para desabilitar a interação visualmente
              onClick={() => editMode && handleStatusChange(false)} // Impede ação se editMode for falso
            >
              Inativo
            </div>
          </div>
        </div>
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
              type="button"
              variant="ghost"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
            <Button
              className="w-32 py-3 mt-2"
              type="submit"
              variant="tertiary"
              onClick={editClient}
              disabled={!data.name} // Desabilita o botão de salvar se os campos obrigatórios não estiverem preenchidos
            >
              Salvar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
