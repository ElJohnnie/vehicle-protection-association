import axios from "axios";
import config from "./config";

const { endpoint, cep, fipe, banks } = config;

const api = axios.create({
  baseURL: endpoint,
});

export default {
  //gateways login
  async setLogin(params) {
    return await api.post(`/auth/login`, params);
  },
  // gateways usuários
  async getUsers(headers) {
    return await api.get(`/user`, { headers });
  },
  async getUserById(headers, params) {
    return await api.get(`/user/${params.id}`, { headers });
  },
  async setUser(headers, body) {
    return await api.post(`/user`, body, {
      headers,
    });
  },
  async editUser(headers, id, body) {
    return await api.patch(`/user/${id}`, body, {
      headers,
    });
  },
  async changeUserPassword(headers, id, body) {
    return await api.patch(`/user/password/${id}`, body, {
      headers,
    });
  },
  async deleteUser(headers, id) {
    return await api.delete(`/user/${id}`, {
      headers,
    });
  },
  async getUsersByUnit(headers, id) {
    return await api.get(`/unit/${id}/users`, { headers });
  },
  async getLoggedUserUnits(headers) {
    return await api.get(`/unit/myUnits`, { headers });
  },
  async inactivateUser(headers, id) {
    return await api.patch(`/user/inactivate/${id}`, {}, { headers });
  },
  async activateUser(headers, id) {
    return await api.patch(`/user/activate/${id}`, {}, { headers });
  },
  //gateways clientes
  async getClients(headers) {
    return await api.get(`/client`, { headers });
  },
  async getClientsByid(headers, params) {
    return await api.get(`/client/${params.id}`, {
      headers,
    });
  },
  async setClient(headers, body) {
    return await api.post(`/client`, body, {
      headers,
    });
  },
  async editClient(headers, id, body) {
    return await api.put(`/client/${id}`, body, {
      headers,
    });
  },
  async deleteClient(headers, id) {
    return await api.delete(`/client/${id}`, {
      headers,
    });
  },
  async getClientsByUnit(headers, id) {
    return await api.get(`/unit/${id}/clients`, { headers });
  },
  //gateways cep
  async getCep(params) {
    return await axios.get(`${cep}/${params}/json/`);
  },
  //gateways veículos
  async getVehicles(headers) {
    return await api.get(`/vehicle`, { headers });
  },
  async getVehicleById(headers, id) {
    return await api.get(`/vehicle/${id}`, { headers });
  },
  async setVehicle(headers, body) {
    return await api.post(`/vehicle`, body, { headers });
  },
  async editVehicle(headers, id, body) {
    return await api.put(`/vehicle/${id}`, body, { headers });
  },
  async deleteVehicle(headers, id) {
    return await api.delete(`/vehicle/${id}`, { headers });
  },
  async getVehiclesByClient(headers, clientId) {
    return await api.get(`/vehicle/client/${clientId}`, { headers });
  },
  //gateways fipe
  async getBrandsByType(params) {
    return await axios.get(`${fipe}/${params}/brands`);
  },
  async getModelsByBrand(params) {
    return await axios.get(
      `${fipe}/${params.type}/brands/${params.brand}/models`
    );
  },
  async getYearsByModelAndBrand(params) {
    return await axios.get(
      `${fipe}/${params.type}/brands/${params.brand}/models/${params.model}/years`
    );
  },
  async getValueVehicleFipe(params) {
    return await axios.get(
      `${fipe}/${params.type}/brands/${params.brand}/models/${params.model}/years/${params.year}`
    );
  },
  // fim gateways fipe

  // bancos
  async getBanks() {
    return banks;
  },
  // unidades
  async getUnits(headers) {
    return await api.get(`/unit`, { headers });
  },
  async getUnitById(headers, params) {
    return await api.get(`/unit/${params.id}`, { headers });
  },
  async setUnit(headers, body) {
    return await api.post(`/unit`, body, {
      headers,
    });
  },
  async editUnit(headers, id, body) {
    return await api.put(`/unit/${id}`, body, {
      headers,
    });
  },
  async deleteUnit(headers, id) {
    return await api.delete(`/unit/${id}`, {
      headers,
    });
  },
  async setUnitManager(headers, body) {
    return await api.post(`/unit/add/manager`, body, {
      headers,
    });
  },
  async removeUnitManager(headers, body) {
    return await api.post(`/unit/remove/manager`, body, {
      headers,
    });
  },
  // fim unidades
  // planos
  async getPlans(headers) {
    return await api.get(`/plan`, { headers });
  },
  async getPlanById(headers, id) {
    return await api.get(`/plan/${id}`, { headers });
  },
  async setPlan(headers, body) {
    return await api.post(`/plan`, body, {
      headers,
    });
  },
  async editPlan(headers, id, body) {
    return await api.put(`/plan/${id}`, body, {
      headers,
    });
  },
  async deletePlan(headers, id) {
    return await api.delete(`/plan/${id}`, {
      headers,
    });
  },
  // fim planos
  // ocorrências
  async getEvents(headers) {
    return await api.get(`/event`, { headers });
  },
  async getEventById(headers, id) {
    return await api.get(`/event/${id}`, { headers });
  },
  async setEvent(headers, body) {
    return await api.post(`/event`, body, {
      headers,
    });
  },
  async editEvent(headers, id, body) {
    return await api.put(`/event/${id}`, body, {
      headers,
    });
  },
  async deleteEvent(headers, id) {
    return await api.delete(`/event/${id}`, {
      headers,
    });
  },
  // fim ocorrências
  // contratos
  async getContracts(headers) {
    return await api.get(`/contract`, { headers });
  },
  async getContractByParam(headers, params) {
    return await api.get(`/contract/${params}`, { headers });
  },
  async setContract(headers, body) {
    return await api.post(`/contract`, body, {
      headers,
    });
  },
  async editContract(headers, id, body) {
    return await api.put(`/contract/${id}`, body, {
      headers,
    });
  },
  async deleteContract(headers, id) {
    return await api.delete(`/contract/${id}`, {
      headers,
    });
  },
  // fim contratos
  // perfil
  async loggedProfile(headers) {
    return await api.get(`/profile/myProfile`, { headers });
  },
  async editProfile(headers, body) {
    return await api.patch(`/profile/edit`, body, { headers });
  },
  async editPasswordProfile(headers, body) {
    return await api.patch(`/profile/edit/password`, body, {
      headers,
    });
  },
  // fim perfil
};
