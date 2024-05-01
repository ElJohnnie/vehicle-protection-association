// To do
import contracts from "@/usecases/contracts";
import users from "@/usecases/users";

const actions = {
  getContracts: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await contracts.getContracts(headers);
    if (status !== "success") {
      commit("SET_CONTRACT_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_CONTRACTS", data.Subscriptions);
  },
  getContractByParam: async ({ commit }, params) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await contracts.getContractByParam(
      headers,
      params
    );
    if (status !== "success") {
      commit("SET_CONTRACT_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_CONTRACT_BY_PARAM", data.Subscriptions[0]);
  },
  setContract: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await contracts.setContract(headers, data);
    if (status !== "success") {
      commit("SET_CONTRACT_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editContract: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await contracts.editContract(
      headers,
      data.id,
      data.body
    );
    if (status !== "success") {
      commit("SET_CONTRACT_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deleteContract: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await contracts.deleteContract(headers, id);
    if (status !== "success") {
      commit("SET_CONTRACT_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_CONTRACT_ERROR", { hasError: false, message: null });
  },
};

export default actions;
