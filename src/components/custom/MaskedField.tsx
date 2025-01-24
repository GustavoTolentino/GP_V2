import React, { forwardRef } from "react";
import ReactInputMask from "react-input-mask";
import { Input } from "../ui/input";

export type MaskedFieldProps = {
  mask: keyof typeof maskOptions;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  required?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
};

const maskOptions = {
  cpf: "999.999.999-99",
  phone: "(99) 9999-9999",
  cellphone: "(99) 99999-9999",
  cep: "99999-999",
};

export const MaskedField = forwardRef<HTMLInputElement, MaskedFieldProps>(
  (
    { mask, onChange, name, placeholder, required = false, onBlur, value = "" },
    ref
  ) => {
    const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
      e.target.setCustomValidity("Insira esta informação");
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.setCustomValidity(""); // Reseta a mensagem ao começar a digitar
    };

    return (
      <ReactInputMask
        mask={maskOptions[mask]}
        alwaysShowMask={false}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        <Input
          ref={ref}
          placeholder={placeholder}
          name={name}
          required={required}
          onInvalid={handleInvalid}
          onInput={handleInput}
        />
      </ReactInputMask>
    );
  }
);

MaskedField.displayName = "MaskedField";
