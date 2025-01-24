"use client";

import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { columns } from "./columns";
import { BsPlusLg } from "react-icons/bs";

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
      <div className="hidden md:flex justify-between items-center mb-20">
        <h1 className="hidden md:flex items-center gap-2 text-2xl font-semibold text-main-blue md:ml-2">
          Profissionais da Saúde
        </h1>
        <Button
          className="md:w-36 w-full py-3"
          type="submit"
          variant="tertiary"
          icon={<BsPlusLg />}
          iconPosition="start"
        >
          Nova Profissional
        </Button>
      </div>
      <div className="md:hidden flex flex-col items-start gap-2 text-2xl font-semibold text-main-blue mb-20">
        <h1>Profissionais da Saúde</h1>
        <Button
          className="md:w-36 w-full md:py-3 py-7 mt-5"
          type="submit"
          variant="tertiary"
          icon={<BsPlusLg />}
          iconPosition="start"
        >
          Nova Profissional
        </Button>
      </div>

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
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default page;
