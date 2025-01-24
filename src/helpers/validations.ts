export const maskCPF = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const maskPhone = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
};

export const maskRG = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1})$/, "$1-$2");
};

export const maskCep = (value: any) => {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const maskName = (value: any) => {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
};
