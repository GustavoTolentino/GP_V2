import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import clsx from "clsx";

interface AccordionDemoProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  number?: number;
  hidden?: boolean;
  customClass?: string;
}

export function AccordionDemo({
  icon,
  title,
  children,
  number,
  hidden,
  customClass,
}: AccordionDemoProps) {
  return (
    //single para abrir um de cada vez e com isso vindo a props de collapsible
    <Accordion type="multiple" className={clsx("w-full", customClass)}>
      <AccordionItem value="item-1">
        <AccordionTrigger
          number={number}
          hidden={hidden}
          className="flex items-center space-x-2 font-bold text-base"
        >
          <span>{icon}</span>
          <span>{title}</span>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
