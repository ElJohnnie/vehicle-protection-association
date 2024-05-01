import units from "@/usecases/units";
import users from "@/usecases/users";

const actions = {
  getUnits: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, data, message } = await units.getUnits(headers);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }

    commit("SET_UNITS", data.businessUnits);
  },
  setUnit: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await units.setUnit(headers, data);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    return status;
  },
  getUnitById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const params = {
      id,
    };
    const { status, data, message } = await units.getUnitById(headers, params);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    commit("SET_UNIT_BY_ID", data.businessUnit);
  },
  getLoggedUserUnits: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, data, message } = await units.getLoggedUserUnits(
      headers,
      id
    );
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    commit("SET_UNIT_BY_LOGGED_USER", data.myBusinessUnits);
  },
  setSelectedUnit: ({ commit }) => {
    if (units.getSelectedUnit()) {
      const unit = units.getSelectedUnit();
      commit("SET_SELECTED_UNIT", unit);
    }
  },
  editUnit: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { id, body } = data;
    const { status, message } = await units.editUnit(headers, id, body);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    return status;
  },
  deleteUnit: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await units.deleteUnit(headers, id);
    if (status !== "success") {
      commit("SET_UNIT_ERROR", { status: true, message: message });
      return;
    }
    return status;
  },
  setUnitManager: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await units.setUnitManager(headers, data);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    return status;
  },
  removeUnitManager: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await units.removeUnitManager(headers, data);
    if (status !== "success") {
      commit("SET_UNITS_ERROR", { status: true, message: message });
      return;
    }
    return status;
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_UNITS_ERROR", { status: false, message: null });
  },
};
export default actions;
