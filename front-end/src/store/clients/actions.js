import clients from "@/usecases/clients";
import users from "@/usecases/users";

const actions = {
  getClients: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await clients.getClients(headers);
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_CLIENTS", data.clients);
  },
  getClientById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const params = {
      id,
    };
    const { data, status, message } = await clients.getClientsById(
      headers,
      params
    );
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_CLIENT_BY_ID", data.client);
  },
  setClient: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await clients.setClient(headers, data);
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editClient: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await clients.editClient(
      headers,
      data.id,
      data.body
    );
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deleteClient: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await clients.deleteClient(headers, id);
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  getClientsByUnit: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await clients.getClientsByUnit(
      headers,
      id
    );
    if (status !== "success") {
      commit("SET_CLIENTS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_CLIENTS", data.clients);
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_CLIENTS_ERROR", { hasError: false, message: null });
  },
};

export default actions;
