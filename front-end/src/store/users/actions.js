import users from "@/usecases/users";

const actions = {
  // usuário logado
  setLogin: async ({ commit, dispatch }, params) => {
    const { status, data, message, statusCode } = await users.setLogin(params);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    dispatch("setAccessToken", data.accessToken);
    dispatch("setRefreshToken", data.refreshToken);
    dispatch("setLoggedUser");
    return status;
  },
  unsetLogin({ dispatch }) {
    users.unsetAccessToken();
    dispatch("unsetLoggedUser");
    dispatch("resetErrorStatus");
  },
  setAccessToken({}, token) {
    users.setAccessToken(token);
  },
  setRefreshToken({}, token) {
    users.setRefreshToken(token);
  },
  setLoggedUser({ commit }) {
    if (users.getDecodedAccessToken()) {
      const user = users.getDecodedAccessToken();
      commit("SET_LOGGED_USER", user);
    }
  },
  unsetLoggedUser({ commit }) {
    commit("SET_LOGGED_USER", {});
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_USER_ERROR", { hasError: false, message: null });
  },
  // fim usuário logado
  // usuários gerais
  getUsers: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, data } = await users.getUsers(headers);
    if (status !== "success") {
      commit("SET_USER_ERROR", {
        hasError: true,
        message: "Aconteceu um erro ao buscar os usuários",
      });
      return;
    }
    commit("SET_USERS", data.users);
  },
  getUserById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const params = {
      id,
    };
    const res = await users.getUserById(headers, params);
    commit("SET_USER_BY_ID", res.data);
  },
  setUser: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await users.setUser(headers, data);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editUser: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { id, body } = data;
    const { status, message } = await users.editUser(headers, id, body);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  changeUserPassword: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { id, body } = data;
    const { status, message } = await users.changeUserPassword(
      headers,
      id,
      body
    );
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deleteUser: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await users.deleteUser(headers, id);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  getUsersByUnit: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, data } = await users.getUsersByUnit(headers, id);
    if (status !== "success") {
      commit("SET_USER_ERROR", {
        hasError: true,
        message: "Aconteceu um erro ao buscar os usuários",
      });
      return;
    }
    commit("SET_USERS", data.users);
  },
  inactivateUser: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await users.inactivateUser(headers, id);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  activateUser: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await users.activateUser(headers, id);
    if (status !== "success") {
      commit("SET_USER_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  // fim usuários gerais
};
export default actions;
