import fipe from "@/usecases/vehicles/fipe";
import users from "@/usecases/users";
import vehicles from "@/usecases/vehicles";

const actions = {
  getVehicles: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await vehicles.getVehicles(headers);
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_VEHICLES", data.vehicles);
  },
  getVehicleById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await vehicles.getVehicleById(
      headers,
      id
    );
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_VEHICLE_BY_ID", data);
  },
  setVehicle: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await vehicles.setVehicle(headers, data);
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editVehicle: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { id, body } = data;
    const { status, message } = await vehicles.editVehicle(headers, id, body);
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deleteVehicle: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await vehicles.deleteVehicle(headers, id);
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  getVehiclesByClient: async ({ commit }, clientId) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await vehicles.getVehiclesByClient(
      headers,
      clientId
    );
    if (status !== "success") {
      commit("SET_VEHICLES_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_VEHICLES", data.vehicles);
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_VEHICLES_ERROR", { hasError: false, message: null });
  },
  // fim api backend
  // api fipe
  getBrandsByType: async ({}, params) => {
    return await fipe.getBrandsByType(params);
  },
  getModelsByBrand: async ({}, params) => {
    return await fipe.getModelsByBrand(params);
  },
  getYearsByModelAndBrand: async ({}, params) => {
    return await fipe.getYearsByModelAndBrand(params);
  },
  getValueVehicleFipe: async ({}, params) => {
    return await fipe.getValueVehicleFipe(params);
  },
};

export default actions;
