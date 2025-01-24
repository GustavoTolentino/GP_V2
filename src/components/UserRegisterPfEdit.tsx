"use client";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  checkIfCpfExists,
  getAllHealthProfessionalStatus,
  getAllHealthProfessionalTypes,
  getHealthProfessional,
  updateHealthProfessional,
} from "@/services/healthprofessionals";
import { Card, CardContent } from "./ui/card";
import { UFlist } from "@/helpers/select-filters";
import { getAllReasonsInactivations } from "@/services/standard";

export function UserRegisterPfEdit() {
  const id = useSession();
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCepValid, setIsCepValid] = useState(true);
  const [status, setStatus] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [reasons, setReasons] = useState<any>([]);
  const currentDateTime = new Date().toISOString();
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<any>({
    healthProfessionals: {
      healthProfessionalStatusId: "",
      healthProfessionalTypeId: "",
      reasonInactivationId: "",
      name: "",
      cpf: "",
      rg: "",
      phone: "",
      cellPhone: "",
      email: "",
      emailSecondary: "",
      id: id.idUser,
      activationDate: "",
      statusDate: "",
      status: true,
      isDeleted: false,
      councilUF: "",
      councilNumber: "",
      dateCouncilConsultation: "",
      dateNextCouncilMeeting: "",
      address: {
        street: "",
        number: "",
        postalCode: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        region: "",
        country: "Brasil",
        status: true,
        isDeleted: false,
        id: "",
      },
    },
  });

  useEffect(() => {
    if (id) {
      healthProfessional(id);
    }

    getAllHealthProfessionalStatus()
      .then((res) => {
        const formattedOptions = res.data.map((status: any) => ({
          id: status.id,
          value: status.name,
        }));

        setStatus(formattedOptions);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllHealthProfessionalTypes()
      .then((res) => {
        const formattedOptions = res.data.map((status: any) => ({
          id: status.id,
          value: status.name,
        }));

        setTypes(formattedOptions);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllReasonsInactivations()
      .then((res) => {
        const formattedOptions = res.data.map((status: any) => ({
          id: status.id,
          value: status.name,
        }));

        setReasons(formattedOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const healthProfessional = async (id: any) => {
    getHealthProfessional(id.idUser)
      .then((response) => {
        const apiData = response.data;

        setData((prevState: any) => ({
          ...prevState,
          healthProfessionals: {
            ...prevState.healthProfessionals,
            name: apiData.name || "",
            cpf: apiData.cpf || "",
            rg: apiData.rg || "",
            phone: apiData.phone || "",
            cellPhone: apiData.cellPhone || "",
            email: apiData.email || "",
            emailSecondary: apiData.emailSecondary || "",
            healthProfessionalTypeId: apiData.healthProfessionalTypes.id || "",
            activationDate: apiData.activationDate,
            statusDate: apiData.statusDate,
            councilUF: apiData.councilUF || "",
            councilNumber: apiData.councilNumber || "",
            companyStatus: apiData.companyStatus || null,
            dateCouncilConsultation:
              formatDate(apiData.dateCouncilConsultation) || "",
            dateNextCouncilMeeting:
              formatDate(apiData.dateNextCouncilMeeting) || "",
            healthProfessionalStatusId:
              apiData.healthProfessionalStatus.id || "",
            reasonInactivationId: apiData.reasonInactivations.id || "",
            address: {
              ...prevState.healthProfessionals.address,
              street: apiData.addresses?.street || "",
              number: apiData.addresses?.number || "",
              postalCode: apiData.addresses?.postalCode || "",
              complement: apiData.addresses?.complement || "",
              neighborhood: apiData.addresses?.neighborhood || "",
              city: apiData.addresses?.city || "",
              state: apiData.addresses?.state || "",
              id: apiData.addresses?.id || "",
              region: apiData.addresses?.region || "",
            },
          },
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do profissional:", error);
      });
  };

  const getAddress = async () => {
    const postalCode = data.healthProfessionals.address.postalCode;

    await fetch(`https://viacep.com.br/ws/${postalCode}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          toast.error("CEP inválido");
          setData((prevState: any) => ({
            ...prevState,
            healthProfessionals: {
              ...prevState.healthProfessionals,
              address: {
                ...prevState.healthProfessionals.address,
                street: "",
                neighborhood: "",
                city: "",
                state: "",
                region: "",
              },
            },
          }));
          setIsCepValid(false);
          return;
        }
        setData((prevState: any) => ({
          ...prevState,
          healthProfessionals: {
            ...prevState.healthProfessionals,
            address: {
              ...prevState.healthProfessionals.address,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
              region: data.regiao,
            },
          },
        }));
        setIsCepValid(true);
      })
      .catch((error) => {
        console.error("Erro ao consultar o CEP:", error);
        toast.error("Erro ao validar o CEP.");
      });
  };

  const updateHealthProfessionals = async () => {
    updateHealthProfessional(data)
      .then((res) => {
        if (res.data) {
          toast.success("Pessoa física atualizada com sucesso.");
          setIsEditing(false);
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
      healthProfessionals: {
        ...prevState.healthProfessionals,
        companyStatus: newStatus,
      },
    }));
  };

  const cpfCheckBase = async (cpf: string) => {
    try {
      const res = await checkIfCpfExists(cpf);
      if (res.data) {
        toast.error("CPF já cadastrado");
        setIsCpfValid(false);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      toast.error("Erro ao verificar CPF na base. Tente novamente.");
      return false;
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  function formatCPF(value: string) {
    const numericValue = value.replace(/\D/g, "");
    return numericValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function validateCPF(cpf: string) {
    const numericCPF = cpf.replace(/\D/g, "");
    if (numericCPF.length !== 11) return false;
    if (/^(\d)\1+$/.test(numericCPF)) return false;
    const calculateDigit = (base: string) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base.charAt(i)) * (base.length + 1 - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
    const base = numericCPF.slice(0, 9);
    const digit1 = calculateDigit(base);
    const digit2 = calculateDigit(base + digit1);
    return numericCPF === base + digit1 + digit2;
  }

  function formatRG(value: string) {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2");
  }

  function formatPhone(value: string) {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      return numericValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return numericValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  }

  function formatCEP(value: string) {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    healthProfessional(id);
    setIsEmailValid(true);
    setIsCpfValid(true);
  };

  return (
    <div className="h-full w-full p-5">
      <div className="flex gap-2 justify-end">
        {isEditing ? (
          <>
            <Button variant="destructive" onClick={cancelEdit}>
              Cancelar
            </Button>
            <Button
              className="bg-main-blue text-white"
              onClick={updateHealthProfessionals}
              disabled={
                !validateCPF(data.healthProfessionals.cpf) ||
                !validateEmail(data.healthProfessionals.email) ||
                !isCpfValid
              }
            >
              Salvar Alterações
            </Button>
          </>
        ) : (
          <Button className="bg-main-blue text-white" onClick={toggleEditMode}>
            Editar pessoa física
          </Button>
        )}
      </div>

      <Card className="flex flex-col gap-3 py-5 mt-5 dark:bg-black dark:border-black">
        <CardContent>
          <div className="flex justify-center  font-bold text-base">
            <span> Dados Pessoais</span>
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4 items-center">
            <Input
              name="name"
              value={data.healthProfessionals.name}
              onChange={(e) => {
                const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                const inputValue = e.target.value;

                if (regex.test(inputValue) || inputValue === "") {
                  setData((prevState: any) => ({
                    ...prevState,
                    healthProfessionals: {
                      ...prevState.healthProfessionals,
                      name: inputValue,
                    },
                  }));
                }
              }}
              placeholder="Nome"
              maxLength={50}
              disabled={!isEditing}
            />
            <div className="relative">
              <Input
                name="email"
                value={data.healthProfessionals.email}
                className={!isEmailValid ? "border-red-500" : ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setData((prevState: any) => ({
                    ...prevState,
                    healthProfessionals: {
                      ...prevState.healthProfessionals,
                      email: inputValue,
                    },
                  }));
                }}
                onBlur={(e) => {
                  const inputValue = e.target.value;
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                  if (!emailRegex.test(inputValue) && inputValue !== "") {
                    toast.error("Por favor, insira um e-mail válido.");
                    setIsEmailValid(false);
                  } else {
                    setIsEmailValid(true);
                  }
                }}
                placeholder="Email"
                maxLength={50}
                disabled={!isEditing}
              />
            </div>

            <div className="relative">
              <Input
                name="cpf"
                value={data.healthProfessionals.cpf}
                className={!isCpfValid ? "border-red-500" : ""}
                onChange={(e) => {
                  const inputValue = formatCPF(e.target.value);
                  setData((prevState: any) => ({
                    ...prevState,
                    healthProfessionals: {
                      ...prevState.healthProfessionals,
                      cpf: inputValue,
                    },
                  }));
                }}
                onBlur={async () => {
                  const cpf = data.healthProfessionals.cpf;
                  const isLocalValid = validateCPF(cpf);

                  if (!isLocalValid) {
                    toast.error(
                      "CPF inválido. Por favor, insira um CPF válido."
                    );
                    setIsCpfValid(false);
                    return;
                  }

                  const isBaseValid = await cpfCheckBase(cpf);

                  if (isLocalValid && isBaseValid) {
                    setIsCpfValid(true);
                  } else {
                    setIsCpfValid(false);
                  }
                }}
                placeholder="CPF"
                maxLength={14}
                disabled={!isEditing}
              />
            </div>

            <Input
              name="rg"
              value={data.healthProfessionals.rg}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    rg: formatRG(e.target.value),
                  },
                }))
              }
              placeholder="RG"
              maxLength={12}
              disabled={!isEditing}
            />

            <Input
              name="phone"
              value={data.healthProfessionals.phone}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    phone: formatPhone(e.target.value),
                  },
                }))
              }
              placeholder="Telefone 1"
              maxLength={15}
              disabled={!isEditing}
            />

            <Input
              name="cellPhone"
              value={data.healthProfessionals.cellPhone}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    cellPhone: formatPhone(e.target.value),
                  },
                }))
              }
              placeholder="Telefone 2"
              maxLength={15}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col gap-3 py-5 mt-5 dark:bg-black dark:border-black">
        <CardContent>
          <div className="flex justify-center  font-bold text-base">
            <span>Dados Endereço</span>
          </div>

          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4 items-center">
            <Input
              name="postalCode"
              value={data.healthProfessionals.address.postalCode}
              className={!isCepValid ? "border-red-500" : ""}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      postalCode: formatCEP(e.target.value),
                    },
                  },
                }))
              }
              onBlurCapture={getAddress}
              placeholder="CEP"
              maxLength={9}
              disabled={!isEditing}
            />
            <CustomSelect
              label="Estado"
              name="state"
              value={data.healthProfessionals.address.state}
              options={UFlist}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      state: e.target.value,
                    },
                  },
                }))
              }
              disabled
            />
            <Input
              placeholder="Cidade"
              name="city"
              value={data.healthProfessionals.address.city}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      city: e.target.value,
                    },
                  },
                }))
              }
              disabled
            />
            <Input
              placeholder="Bairro"
              name="neighborhood"
              value={data.healthProfessionals.address.neighborhood}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      neighborhood: e.target.value,
                    },
                  },
                }))
              }
              disabled
            />
            <CustomSelect
              label="Região"
              name="region"
              value={data.healthProfessionals.address.region}
              options={[
                { id: "Norte", value: "Norte" },
                { id: "Nordeste", value: "Nordeste" },
                { id: "Centro-Oeste", value: "Centro-Oeste" },
                { id: "Sudeste", value: "Sudeste" },
                { id: "Sul", value: "Sul" },
              ]}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      region: e.target.value,
                    },
                  },
                }))
              }
              disabled
            />
            <Input
              placeholder="Logradouro"
              name="street"
              value={data.healthProfessionals.address.street}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      street: e.target.value,
                    },
                  },
                }))
              }
              disabled
            />

            <Input
              placeholder="Número"
              name="number"
              value={data.healthProfessionals.address.number}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      number: e.target.value,
                    },
                  },
                }))
              }
              disabled={!isEditing}
            />
            <Input
              placeholder="Complemento"
              name="complement"
              value={data.healthProfessionals.address.complement}
              onChange={(e) =>
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    address: {
                      ...prevState.healthProfessionals.address,
                      complement: e.target.value,
                    },
                  },
                }))
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col gap-3 py-5 mt-5 dark:bg-black dark:border-black">
        <CardContent>
          <div className="flex justify-center  font-bold text-base">
            <span>Dados da Especialidade</span>
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4 items-center">
            <CustomSelect
              label="Especialidade"
              name="healthProfessionalTypeId"
              value={data.healthProfessionals.healthProfessionalTypeId}
              options={types}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    healthProfessionalTypeId: e.target.value,
                  },
                }));
              }}
              disabled={!isEditing}
            />
            <CustomSelect
              label="Estado"
              name="councilUF"
              value={data.healthProfessionals.councilUF}
              options={UFlist}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    councilUF: e.target.value,
                  },
                }));
              }}
              disabled={!isEditing}
            />
            <Input
              name="councilNumber"
              value={data.healthProfessionals.councilNumber}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    councilNumber: e.target.value,
                  },
                }));
              }}
              placeholder="Número do conselho"
              maxLength={10}
              disabled={!isEditing}
            />
            <div className="flex flex-col gap-2">
              <span className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
                Status da Empresa
              </span>
              <div className="flex items-center justify-center border border-gray-500 w-[80%] rounded-lg ">
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center  ${
                    data.healthProfessionals.companyStatus === true
                      ? "bg-blue-500 text-white  rounded-l-md"
                      : ""
                  }`}
                  onClick={() => handleStatusChange(true)}
                >
                  Ativo
                </div>
                <div className="h-full bg-gray-500 w-[1px]"></div>
                <div
                  className={`p-2 text-base cursor-pointer w-1/2 text-center ${
                    data.healthProfessionals.companyStatus === false
                      ? "bg-blue-500 text-white  rounded-r-md "
                      : ""
                  }`}
                  onClick={() => handleStatusChange(false)}
                >
                  Inativo
                </div>
              </div>
            </div>
            <Input
              name="dateCouncilConsultation"
              value={data.healthProfessionals.dateCouncilConsultation}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    dateCouncilConsultation: e.target.value,
                  },
                }));
              }}
              placeholder="Data da consulta do conselho"
              type="date"
              disabled={!isEditing}
            />
            <Input
              name="dateNextCouncilMeeting"
              value={data.healthProfessionals.dateNextCouncilMeeting}
              onChange={(e) => {
                setData((prevState: any) => ({
                  ...prevState,
                  healthProfessionals: {
                    ...prevState.healthProfessionals,
                    dateNextCouncilMeeting: e.target.value,
                  },
                }));
              }}
              placeholder="Data da próxima consulta do conselho"
              type="date"
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col gap-3 py-5 mt-5 dark:bg-black dark:border-black">
        <CardContent>
          <div className="flex justify-center  font-bold text-base">
            <span>Dados do Prestador</span>
          </div>
          <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4 items-center">
            <div className="relative">
              <CustomSelect
                label="Status"
                name="healthProfessionalStatusId"
                value={data.healthProfessionals.healthProfessionalStatusId}
                options={status}
                onChange={(e) => {
                  const selectedStatus = e.target.value;
                  const currentDate = new Date().toISOString();

                  setData((prevState: any) => ({
                    ...prevState,
                    healthProfessionals: {
                      ...prevState.healthProfessionals,
                      healthProfessionalStatusId: selectedStatus,
                      statusDate:
                        selectedStatus !==
                        prevState.healthProfessionals.healthProfessionalStatusId
                          ? currentDate
                          : prevState.healthProfessionals.statusDate,
                    },
                  }));
                }}
                disabled={!isEditing}
              />
            </div>
            {data.healthProfessionals.healthProfessionalStatusId ===
              "2edc140c-7989-4e56-940f-31db393cd164" && (
              <div className="relative">
                <CustomSelect
                  label="Motivo da Inativação"
                  name="reasonInactivationId"
                  value={data.healthProfessionals.reasonInactivationId || ""}
                  options={reasons}
                  onChange={(e) =>
                    setData((prevState: any) => ({
                      ...prevState,
                      healthProfessionals: {
                        ...prevState.healthProfessionals,
                        reasonInactivationId: e.target.value,
                      },
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
