"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRegisterPfEdit } from "@/components/UserRegisterPfEdit";
import { IoBriefcaseOutline, IoDocumentsOutline } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { FaFileInvoice, FaUserTie } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { RiFeedbackFill } from "react-icons/ri";
import UserServicePF from "@/components/UserServicePF";
import { useRouter } from "next/navigation";
import UserFeedbackPF from "@/components/UserFeedbackPF";
import UserInvoicePF from "@/components/UserInvoicePF";
import UserPaymentPF from "@/components/UserPaymentPF";

const page = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      <div
        onClick={() => {
          router.push("/dashboard/doctor/exam/manageaccounts/individuals");
        }}
        className="mb-5 p-3 flex items-center gap-2 w-fit rounded-lg cursor-pointer text-main-blue hover:bg-opacity-85 group"
      >
        <GiReturnArrow
          size={22}
          className="transition-transform duration-300"
        />
        <span className="opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Voltar
        </span>
      </div>
      <Tabs defaultValue="register">
        <TabsList className="grid w-full grid-cols-3 md:grid md:grid-cols-7 mb-10 md:mb-7 h-full dark:bg-[#27272A]">
          <TabsTrigger
            value="register"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white flex gap-2"
          >
            <CiUser size={18} />
            <span>Cadastro</span>
          </TabsTrigger>
          <TabsTrigger
            value="service"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <IoBriefcaseOutline size={18} />
            <span>Serviço</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="responsible"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <FaUserTie size={18} />
            <span>Responsável</span>
          </TabsTrigger> */}
          <TabsTrigger
            value="payment"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <BsCashCoin size={18} />
            <span>Pagamento</span>
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <RiFeedbackFill size={18} />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <IoDocumentsOutline size={18} />
            <span> Documento</span>
          </TabsTrigger>
          <TabsTrigger
            value="Invoice"
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white gap-2"
          >
            <FaFileInvoice size={18} />
            <span> Nota Fiscal</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <UserRegisterPfEdit />
        </TabsContent>
        <TabsContent value="service">
          <UserServicePF />
        </TabsContent>
        {/* <TabsContent value="responsible">
          <span>Teste 2</span>
        </TabsContent> */}
        <TabsContent value="payment">
          <UserPaymentPF/>
        </TabsContent>
        <TabsContent value="feedback">
          <UserFeedbackPF />
        </TabsContent>
        <TabsContent value="document">
          <span>Teste 5</span>
        </TabsContent>
        <TabsContent value="Invoice">
          <UserInvoicePF/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
