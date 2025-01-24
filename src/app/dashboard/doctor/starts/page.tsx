"use client";

import { AccordionDemo } from "@/components/Accordion";
import { CardDemo } from "@/components/Card";
import { FaAddressCard, FaBriefcase } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";

const Page = () => {
  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl font-semibold text-main-blue mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 w-full md:ml-10">
        <CardDemo
          icon={<FaAddressCard size={28} className="text-main-orange" />}
          mainTitle="Credenciamento com Pedencias Paradas"
          mainDescription="4"
        />
        <CardDemo
          icon={<FaBriefcase size={28} className="text-main-orange" />}
          mainTitle="Serviços com Pendências Paradas"
          mainDescription="1"
        />
        <CardDemo
          icon={<RiFileList3Fill size={28} className="text-main-orange" />}
          mainTitle="Documentos Profissionais Vencendo"
          mainDescription="1"
        />
      </div>
      <div className="grid grid-cols-1 gap-10 mt-5 md:w-full w-96">
        <AccordionDemo
          icon={<FaAddressCard size={28} className="text-main-orange" />}
          title="Credenciamento com Pedencias Paradas"
        >
          <span>Credenciamento com Pedencias Paradas</span>
        </AccordionDemo>
        <AccordionDemo
          icon={<FaBriefcase size={28} className="text-main-orange" />}
          title="Serviços com Pendências Paradas"
        >
          <span>Serviços com Pendências Paradas</span>
        </AccordionDemo>
        <AccordionDemo
          icon={<RiFileList3Fill size={28} className="text-main-orange" />}
          title="Documentos Profissionais Vencendo"
        >
          <span>Documentos Profissionais Vencendo</span>
        </AccordionDemo>
      </div>
    </div>
  );
};

export default Page;
