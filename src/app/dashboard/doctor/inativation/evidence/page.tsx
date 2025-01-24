"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import React, { useState } from "react";
import { AccordionDemo } from "@/components/Accordion";
import { FaClock, FaHandsHelping } from "react-icons/fa";
import { columnsTraditionalService } from "./columnsTraditionalService";
import { columnsPunctualService } from "./columnsPunctualService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);

  const Buttonfilter = () => {
    const filtered = data.filter((item: any) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        item.cpf.toLowerCase().includes(lowerCaseFilter) ||
        item.namePatient.toLowerCase().includes(lowerCaseFilter) ||
        item.diseaseName.toLowerCase().includes(lowerCaseFilter) ||
        item.logisticsStatus.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <div className="w-full h-screen px-4">
      <h1 className="text-2xl font-semibold text-main-blue mb-5">Evidencias</h1>

      <div className="grid grid-cols-1 gap-10 mt-5 md:w-full w-96">
        <AccordionDemo
          icon={<FaHandsHelping size={28} className="text-blue-500" />}
          title="Atendimento Tradicional"
        >
          <div className="grid grid-cols-1 md:grid md:grid-cols-4 gap-5 mb-10 items-center md:ml-2">
            <div>
              <Input
                name="filter"
                placeholder="Filtro"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="flex mt-7 gap-5">
              <Button
                onClick={Buttonfilter}
                className="md:w-60 w-full py-7"
                type="submit"
                variant="tertiary"
              >
                Buscar
              </Button>
              <Button
                onClick={clearFilter}
                className="md:w-60 w-full py-7"
                type="submit"
                variant="tertiary"
              >
                Limpar
              </Button>
            </div>
          </div>
          <DataTable columns={columnsTraditionalService} data={filteredData} />
        </AccordionDemo>
        <AccordionDemo
          icon={<FaClock size={28} className="text-blue-500" />}
          title="Atendimento Pontual"
        >
          <div className="grid grid-cols-1 md:grid md:grid-cols-4 gap-5 mb-10 items-center md:ml-2">
            <div>
              <Input
                name="filter"
                placeholder="Filtro"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="flex mt-7 gap-5">
              <Button
                onClick={Buttonfilter}
                className="md:w-60 w-full py-7"
                type="submit"
                variant="tertiary"
              >
                Buscar
              </Button>
              <Button
                onClick={clearFilter}
                className="md:w-60 w-full py-7"
                type="submit"
                variant="tertiary"
              >
                Limpar
              </Button>
            </div>
          </div>
          <DataTable columns={columnsPunctualService} data={filteredData} />
        </AccordionDemo>
      </div>
    </div>
  );
};

export default page;
