"use client";

import { DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CustomSelect } from "./custom/CustomSelect";
import { useEffect, useState } from "react";
import { userRegister } from "@/hooks/useModal";
import useSession from "@/hooks/useSession";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { toast } from "sonner";
import {
  checkIfCpfExists,
  createHealthProfessional,
  getAllHealthProfessionalStatus,
  getAllHealthProfessionalTypes,
} from "@/services/healthprofessionals";
import { getAllReasonsInactivations } from "@/services/standard";
import { UFlist } from "@/helpers/select-filters";

export function UserRegisterPF() {
  const userRegisterModal = userRegister();
  const refresh = useSession();
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCepValid, setIsCepValid] = useState(true);
  const [status, setStatus] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [reasons, setReasons] = useState<any>([]);
  const currentDateTime = new Date().toISOString();
  const [data, setData] = useState<any>({
    healthProfessionals: {
      healthProfessionalStatusId: "",
      healthProfessionalTypeId: "",
      name: "",
      cpf: "",
      rg: "",
      phone: "",
      cellPhone: "",
      email: "",
      emailSecondary: "",
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      activationDate: currentDateTime,
      statusDate: currentDateTime,
      createdOn: currentDateTime,
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
        country: "",
        createdOn: currentDateTime,
        status: true,
        isDeleted: false,
      },
    },
  });

  useEffect(() => {
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
  }, []);

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

  const sendForm = () => {
    refresh.setRefresh(true);
    createHealthProfessional(data)
      .then((res) => {
        if (res.data) {
          toast.success("Pessoa Física cadastrada com sucesso");
          clearFields();
        }
      })
      .catch((err) => {
        toast.error("Erro ao cadastrar pessoa física");
      })
      .finally(() => {
        refresh.setRefresh(false);
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

  const clearFields = () => {
    setData({
      healthProfessionals: {
        healthProfessionalStatusId: "",
        healthProfessionalTypeId: "",
        name: "",
        cpf: "",
        rg: "",
        phone: "",
        cellPhone: "",
        email: "",
        emailSecondary: "",
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        activationDate: currentDateTime,
        statusDate: currentDateTime,
        createdOn: currentDateTime,
        status: true,
        isDeleted: false,
        companyStatus: null,
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
          country: "",
          createdOn: currentDateTime,
          status: true,
          isDeleted: false,
        },
      },
    });
    userRegisterModal.openModal(false);
    setIsCpfValid(true);
    setIsEmailValid(true);
    setIsCepValid(true);
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
    const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, "");
    return alphanumericValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})([a-zA-Z0-9])/, "$1-$2");
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

  return (
    <DialogContent
      showCloseIcon={false}
      className="md:w-[50%] rounded-lg lg:max-w-[80vw]  border border-none"
    >
      <div className="w-full flex flex-col">
        <p className="text-main-orange font-semibold md:text-xl text-base text-start">
          Cadastrar Pessoa Física
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full mt-4 flex flex-col gap-2"
      >
        <AccordionItem className="text-bold" value="dados-pessoais">
          <AccordionTrigger className="flex items-center space-x-2 font-bold text-base">
            Dados Pessoais
          </AccordionTrigger>
          <AccordionContent>
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
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dados-endereco">
          <AccordionTrigger className="flex items-center space-x-2 font-bold text-base">
            Dados Endereço
          </AccordionTrigger>
          <AccordionContent>
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
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dados-especialidade">
          <AccordionTrigger className="flex items-center space-x-2 font-bold text-base">
            Dados da Especialidade
          </AccordionTrigger>
          <AccordionContent>
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
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dados-prestador">
          <AccordionTrigger className="flex items-center space-x-2 font-bold text-base">
            Dados do Prestador
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4 items-center">
              <div className="relative">
                <CustomSelect
                  label="Status"
                  name="healthProfessionalStatusId"
                  value={data.healthProfessionals.healthProfessionalStatusId}
                  options={status}
                  onChange={(e) =>
                    setData((prevState: any) => ({
                      ...prevState,
                      healthProfessionals: {
                        ...prevState.healthProfessionals,
                        healthProfessionalStatusId: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              {data.healthProfessionals.healthProfessionalStatusId ===
                "2edc140c-7989-4e56-940f-31db393cd164" && (
                <div className="relative">
                  <CustomSelect
                    label="Motivo da Inativação"
                    name="reasonInactivation"
                    value={data.healthProfessionals.reasonInactivation || ""}
                    options={reasons}
                    onChange={(e) =>
                      setData((prevState: any) => ({
                        ...prevState,
                        healthProfessionals: {
                          ...prevState.healthProfessionals,
                          reasonInactivation: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="dados-credenciamento">
          <AccordionTrigger className="flex items-center space-x-2 font-bold text-base">
            Dados do Credenciamento
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-4  items-center">
              <Input
                name="name"
                value={data.name}
                onChange={(e) => handleInputChange(e, maskName)}
                placeholder="Pessoa de contato"
                maxLength={50}
              />

              <div className="relative">
                <Input
                  name="email"
                  value={data.email}
                  onChange={(e) => handleInputChange(e, maskName)} // Usando handleInputChange para e-mail também
                  placeholder="Email credenciado"
                  maxLength={50}
                />
                {!isEmailValid && (
                  <span className="text-red-500 text-sm">Email inválido</span>
                )}
              </div>
              <div className="relative">
                <Input
                  name="email"
                  value={data.email}
                  onChange={(e) => handleInputChange(e, maskName)} // Usando handleInputChange para e-mail também
                  placeholder="Email credenciado 2"
                  maxLength={50}
                />
                {!isEmailValid && (
                  <span className="text-red-500 text-sm">Email inválido</span>
                )}
              </div>
              <Input
                name="phone1"
                value={data.phone1}
                onChange={(e) => handleInputChange(e, maskPhone)}
                placeholder="Telefone 1"
                maxLength={15}
              />
              <Input
                name="phone2"
                value={data.phone1}
                onChange={(e) => handleInputChange(e, maskPhone)}
                placeholder="Whatsapp credenciamento"
                maxLength={15}
              />
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
      <div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={clearFields} variant="link" className="w-48">
            Cancelar
          </Button>
          <Button
            disabled={
              !data.healthProfessionals.healthProfessionalStatusId ||
              !data.healthProfessionals.healthProfessionalTypeId ||
              !data.healthProfessionals.name ||
              !data.healthProfessionals.cpf ||
              !data.healthProfessionals.rg ||
              !data.healthProfessionals.phone ||
              !data.healthProfessionals.cellPhone ||
              !data.healthProfessionals.email ||
              !data.healthProfessionals.address.postalCode ||
              !data.healthProfessionals.address.state ||
              !data.healthProfessionals.address.city ||
              !data.healthProfessionals.address.neighborhood ||
              !data.healthProfessionals.address.street ||
              !data.healthProfessionals.address.number ||
              !data.healthProfessionals.councilUF ||
              !data.healthProfessionals.councilNumber ||
              !data.healthProfessionals.dateCouncilConsultation ||
              !data.healthProfessionals.dateNextCouncilMeeting ||
              !validateCPF(data.healthProfessionals.cpf) ||
              !validateEmail(data.healthProfessionals.email) ||
              !isCpfValid
            }
            onClick={sendForm}
            className="w-48"
          >
            Salvar
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
