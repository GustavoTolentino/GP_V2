import { LuClipboardList, LuUsers } from "react-icons/lu";
import {
  HiOutlineClipboardList,
  HiOutlineDocumentAdd,
  HiOutlineUserGroup,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { TbLayoutDashboardFilled, TbReportSearch } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import {
  IoAccessibilityOutline,
  IoDocumentsOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoPersonAddOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoReceiptOutline,
  IoShieldCheckmarkOutline,
  IoStarHalfOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";
import { LiaUserTieSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa";

interface IProfileProps {
  subRoutes?: any;
  route: string;
  text: string;
  icon: IconType;
}

interface IRouteProps {
  [key: string]: IProfileProps[];
}

export const routes: IRouteProps = {
  gerente: [
    {
      route: "/dashboard/doctor/starts",
      text: "Dashboard",
      icon: TbLayoutDashboardFilled,
      subRoutes: [
        {
          route: "/dashboard/doctor/starts",
          text: "Inicio",
        },
      ],
    },
    {
      route: "/dashboard/doctor/pre-register/1",
      text: "Administração de Serviços",
      icon: HiOutlineClipboardList,
      subRoutes: [
        {
          route: "/dashboard/doctor/pre-register/programs",
          text: "Programas",
        },
        {
          route: "/dashboard/doctor/pre-register/clients",
          text: "Clientes",
        },
        {
          route: "/dashboard/doctor/pre-register/clientsPerProgram",
          text: "Clientes por Programa",
        },
        {
          route: "/dashboard/doctor/pre-register/nurse",
          text: "Enfermeiras",
        },
        {
          route: "/dashboard/doctor/pre-register/sub-option-3",
          text: "Filas/Réguas de contatos",
        },
        {
          route: "/dashboard/doctor/pre-register/servicesForPrograms",
          text: "Serviços por programa",
        },
      ],
    },
    {
      route: "/dashboard/doctor/exam/1",
      text: "Contas",
      icon: IoPeopleOutline,
      subRoutes: [
        {
          route: "/dashboard/doctor/exam/manageaccounts/individuals",
          text: "Gerenciar Contas - Pessoa Física",
        },
        {
          route: "/dashboard/doctor/exam/manageaccounts/legalentities",
          text: "Gerenciar Contas - Pessoa Jurídica",
        },
        {
          route: "/dashboard/doctor/exam/manageservices",
          text: "Gerenciar Serviços",
        },
        {
          route: "/dashboard/doctor/exam/healthprofessionals",
          text: "Profissionais da Saúde",
        },
        {
          route: "/dashboard/doctor/exam/profile",
          text: "Perfis",
        },
        {
          route: "/dashboard/doctor/exam/users",
          text: "Usuários",
        },
        {
          route: "/dashboard/doctor/exam/validationofprocedures",
          text: "Validação de Procedimentos",
        },
      ],
    },
    {
      route: "/dashboard/doctor/inativation/1",
      text: "Faturamento",
      icon: IoReceiptOutline,
      subRoutes: [
        {
          route: "/dashboard/doctor/inativation/invoice",
          text: "Notas Fiscais",
        },
        {
          route: "/dashboard/doctor/inativation/evidence",
          text: "Evidências",
        },
        {
          route: "/dashboard/doctor/inativation/examsandinfusions",
          text: "Exames e Infusões",
        },
        {
          route: "/dashboard/doctor/inativation/batch",
          text: "Lotes",
        },
      ],
    },

    {
      route: "/dashboard/doctor/documentos",
      text: "Documentos",
      icon: IoDocumentsOutline,
      subRoutes: [
        {
          route: "/dashboard/doctor/documentos/sub-option-1",
          text: "Documentos",
        },
      ],
    },

    {
      route: "/dashboard/doctor/validation",
      text: "Validações e Aprovações",
      icon: IoShieldCheckmarkOutline,
      subRoutes: [
        {
          route: "/dashboard/doctor/validation/sub-option-1",
          text: "Validações e Aprovações",
        },
      ],
    },
    {
      route: "/dashboard/doctor/punctualprovider",
      text: "Prestador Pontual",
      icon: LiaUserTieSolid,
      subRoutes: [
        {
          route: "/dashboard/doctor/punctualprovider/sub-option-1",
          text: "Prestador Pontual",
        },
      ],
    },
    {
      route: "/dashboard/doctor/visitor",
      text: "Visitante",
      icon: LuUsers,
      subRoutes: [
        {
          route: "/dashboard/doctor/visitor/sub-option-1",
          text: "Visitante",
        },
      ],
    },
  ],

  // laboratory: [
  //   {
  //     route: "/dashboard/operation/starts",
  //     text: "Inicio",
  //     icon: IoHomeOutline,
  //   },
  //   {
  //     route: "/dashboard/operation/inativation",
  //     text: "Acompanhamento de Solicitação",
  //     icon: LuClipboardList,
  //   },
  // ],
  // profissional: [
  //   {
  //     route: "/dashboard/profissional/starts",
  //     text: "Início",
  //     icon: IoHomeOutline,
  //   },
  //   {
  //     route: "/dashboard/profissional/pre-register",
  //     text: "Solicitar Exames",
  //     icon: HiOutlineDocumentAdd,
  //   },
  //   {
  //     route: "/dashboard/profissional/exam",
  //     text: "Acompanhamento de Solicitação de Exames",
  //     icon: LuClipboardList,
  //   },
  // ],
};
