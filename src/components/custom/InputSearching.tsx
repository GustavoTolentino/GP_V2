import * as React from "react";
import { cn } from "@/lib/utils";
import { MdSearch } from "react-icons/md"; // Ícone de busca
import { InputLoading } from "./InputLoading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  maxLength?: number;
  tooltip?: boolean;
  textTooltip?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      isLoading,
      maxLength,
      tooltip,
      textTooltip,
      required,
      ...props
    },
    ref
  ) => {
    if (isLoading) return <InputLoading />;

    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "flex gap-1 mb-1",
            "dark:bg-[#27272A]" // Adiciona o fundo escuro para a área do label
          )}
        >
          <label className="flex gap-1 text-sm font-semibold uppercase tracking-wide text-main-blue">
            {props.placeholder}
            {required && <span className="text-red-500">*</span>}
          </label>
          {tooltip && (
            <div className="flex items-center text-gray-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger disabled>
                    <MdSearch size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{textTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div
          className={cn(
            "flex items-center gap-2 h-12 w-full rounded-lg border border-input bg-background px-3 py-6 md:px-4 md:py-5 text-sm md:text-base ring-offset-background dark:bg-[#27272A]",
            className
          )}
        >
          <MdSearch size={24} className="text-main-blue" />
          <input
            placeholder="Busque por nome, email, categoria ou cidade"
            type="search"
            className={cn(
              "w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder:text-muted-foreground dark:bg-[#27272A]"
            )}
            ref={ref}
            {...props}
            maxLength={maxLength}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input as InputSearching };
