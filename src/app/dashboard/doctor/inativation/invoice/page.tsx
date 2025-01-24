"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import React, { useState } from "react";
import { AccordionDemo } from "@/components/Accordion";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaSearchDollar,
  FaTimesCircle,
} from "react-icons/fa";
import { columnsRefusedCustomer } from "./columnsRefusedCustomer";
import { columnsInvoicesToCheck } from "./columnsInvoicesToCheck";
import { columnsPendingCustomer } from "./columnsPendingCustomer";
import { columnsApprovedInvoices } from "./columnsApprovedInvoices";
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
      <h1 className="text-2xl font-semibold text-main-blue mb-5">
        Notas Fiscais
      </h1>

      <div className="grid grid-cols-1 gap-10 mt-5 md:w-full w-96">
        <AccordionDemo
          icon={<FaSearchDollar size={28} className="text-blue-500" />}
          title="Notas Fiscais a Conferir"
        >
          {" "}
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
          <DataTable columns={columnsInvoicesToCheck} data={filteredData} />
        </AccordionDemo>
        <AccordionDemo
          icon={<FaTimesCircle size={28} className="text-blue-500" />}
          title="Notas Fiscais Rescusadas pelo Cliente"
        >
          {" "}
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
          <DataTable columns={columnsRefusedCustomer} data={filteredData} />
        </AccordionDemo>
        <AccordionDemo
          icon={<FaHourglassHalf size={28} className="text-blue-500" />}
          title="Notas Fiscais Pendentes com o Cliente"
        >
          {" "}
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
          <DataTable columns={columnsPendingCustomer} data={filteredData} />
        </AccordionDemo>
        <AccordionDemo
          icon={<FaCheckCircle size={28} className="text-blue-500" />}
          title="Notas Fiscais Aprovadas"
        >
          {" "}
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
          <DataTable columns={columnsApprovedInvoices} data={filteredData} />
        </AccordionDemo>
      </div>
    </div>
  );
};

export default page;
