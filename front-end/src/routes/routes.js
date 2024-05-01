import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import AppDashboard from "@/pages/AppDashboard.vue";
import UserLogin from "@/pages/Login/UserLogin.vue";
import Maps from "@/pages/Maps/Maps.vue";

import { Clients, CreateClient, EditClient, ViewClient } from "@/pages/Clients";

import {
  Vehicles,
  CreateVehicle,
  EditVehicle,
  ViewVehicle,
} from "@/pages/Vehicles";

import {
  Users,
  CreateUser,
  EditUser,
  ViewUser,
  EditUserPassword,
} from "@/pages/Users";

import { Plans, CreatePlan, EditPlan } from "@/pages/Plans";

import { Events, CreateEvent, EditEvent, ViewEvent } from "@/pages/Events";

import { Contracts, CreateContract, EditContract } from "@/pages/Contracts";

import {
  Units,
  CreateUnit,
  EditUnit,
  ViewUnit,
  ManagerUnit,
  UnitsMain,
} from "@/pages/Units";

import { PrintOut } from "@/pages/PrintOut";

import { auth, hasAuth, userHigh } from "./middlewares";

import { Error404 } from "@/pages/Error";

import { UserProfile, EditProfile } from "@/pages/Profile";

const routes = [
  {
    path: "/",
    redirect: { name: "Dashboard" },
    component: DashboardLayout,
    meta: {
      middleware: [auth, userHigh],
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: AppDashboard,
      },
      // clientes
      {
        path: "clientes",
        name: "Clientes",
        component: Clients,
      },
      {
        path: "clientes/adicionar",
        name: "Adicionar clientes",
        component: CreateClient,
      },
      {
        path: "clientes/editar/:id",
        name: "Editar cliente",
        component: EditClient,
      },
      {
        path: "clientes/:id",
        name: "Ver cliente",
        component: ViewClient,
      },
      // fim clientes
      // veículos
      {
        path: "veiculos",
        name: "Veículos",
        component: Vehicles,
      },
      {
        path: "veiculos/adicionar",
        name: "Adicionar veículos",
        component: CreateVehicle,
      },
      {
        path: "veiculos/editar/:id",
        name: "Editar veículo",
        component: EditVehicle,
      },
      {
        path: "veiculos/:id",
        name: "Ver veículo",
        component: ViewVehicle,
      },
      // fim veículos
      // usuários
      {
        path: "usuarios",
        name: "Usuários",
        component: Users,
      },
      {
        path: "usuarios/adicionar",
        name: "Adicionar usuários",
        component: CreateUser,
      },
      {
        path: "usuarios/editar/:id",
        name: "Editar usuário",
        component: EditUser,
      },
      {
        path: "usuarios/editar/senha/:id",
        name: "Alterar senha do usuário",
        component: EditUserPassword,
      },
      {
        path: "usuarios/:id",
        name: "Ver usuário",
        component: ViewUser,
      },
      // fim usuários
      // Unidades
      {
        path: "unidades",
        name: "Unidades",
        component: Units,
      },
      {
        path: "unidades/adicionar",
        name: "Adicionar unidade",
        component: CreateUnit,
      },
      {
        path: "unidades/editar/:id",
        name: "Editar unidade",
        component: EditUnit,
      },
      {
        path: "unidades/:id",
        name: "Ver unidade",
        component: ViewUnit,
      },
      {
        path: "unidades/gerente/:id",
        name: "Alocar gerente",
        component: ManagerUnit,
      },
      // fim Unidades
      // Planos
      {
        path: "planos",
        name: "Planos",
        component: Plans,
      },
      {
        path: "planos/adicionar",
        name: "Adicionar plano",
        component: CreatePlan,
      },
      {
        path: "planos/editar/:id",
        name: "Editar plano",
        component: EditPlan,
      },
      // fim planos
      // Geolocalização
      {
        path: "mapa",
        name: "Mapa",
        component: Maps,
      },
      // fim geolocalização
      // ocorrências
      {
        path: "ocorrencias",
        name: "Ocorrências",
        component: Events,
      },
      {
        path: "ocorrencias/cadastrar",
        name: "Cadastrar ocorrência",
        component: CreateEvent,
      },
      {
        path: "ocorrencias/editar/:id",
        name: "Editar ocorrência",
        component: EditEvent,
      },
      {
        path: "ocorrencia/:id",
        name: "Ver ocorrência",
        component: ViewEvent,
      },
      // fim ocorrencias
      // perfil
      {
        path: "/perfil",
        name: "Ver perfil",
        component: UserProfile,
      },
      {
        path: "/perfil/editar",
        name: "Editar perfil",
        component: EditProfile,
      },
      // fim perfil
      // contratos
      {
        path: "contratos",
        name: "Contratos",
        component: Contracts,
      },
      {
        path: "contratos/cadastrar/:id",
        name: "Criar contrato",
        component: CreateContract,
      },
      {
        path: "contratos/editar/:id",
        name: "Editar contrato",
        component: EditContract,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: UserLogin,
    meta: {
      middleware: [hasAuth],
    },
  },
  {
    path: "/selecionarunidade",
    name: "Selecione a unidade",
    component: UnitsMain,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "*",
    name: "Página não encontrada",
    component: Error404,
  },
  {
    path: "/gerarimpressao/:type",
    name: "Gerar impressão",
    component: PrintOut,
  },
];

export default routes;
