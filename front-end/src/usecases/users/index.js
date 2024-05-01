import gateways from "@/gateways";
import jwt_decode from "jwt-decode";
import helpers from "./helpers";

const users = {
  async setLogin(params) {
    try {
      const { data } = await gateways.setLogin(params);
      return { status: "success", data };
    } catch (e) {
      if (e.response.status === 401) {
        return {
          status: "unauthorized_error",
          message: "Seu usuário está inativo, contate o administrador!",
        };
      }
      return {
        status: "generic_error",
        message: e.message,
      };
    }
  },
  //accessToken
  setAccessToken(token) {
    const item = {
      value: token,
    };
    localStorage.setItem("accessToken", JSON.stringify(item));
  },
  getAccessToken() {
    const itemStr = localStorage.getItem("accessToken");
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const decoded = jwt_decode(item.value);
    if (Date.now() / 1000 > decoded.exp) {
      this.unsetAccessToken();
      return null;
    }
    return item.value;
  },
  getDecodedAccessToken() {
    const itemStr = localStorage.getItem("accessToken");
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const decoded = jwt_decode(item.value);
    return decoded;
  },
  unsetAccessToken() {
    localStorage.removeItem("accessToken");
  },

  //refreshToken
  setRefreshToken(token) {
    localStorage.setItem("refreshToken", token);
  },
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },
  unsetRefreshToken() {
    localStorage.removeItem("accessToken");
  },

  // usuários gerais
  getUsers(headers) {
    return gateways
      .getUsers(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  async getUserById(headers, params) {
    try {
      const { data } = await gateways.getUserById(headers, params);
      data.units = helpers.getUnitsId(data.units);
      return { status: "success", data };
    } catch (error) {
      return { status: "generic error", message: error.message };
    }
  },
  setUser(headers, data) {
    return gateways
      .setUser(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editUser(headers, id, data) {
    return gateways
      .editUser(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  changeUserPassword(headers, id, data) {
    return gateways
      .changeUserPassword(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  deleteUser(headers, id, data) {
    return gateways
      .deleteUser(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getUsersByUnit(headers, id) {
    return gateways
      .getUsersByUnit(headers, id)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({ status: "generic_error" }));
  },
  inactivateUser(headers, id) {
    return gateways
      .inactivateUser(headers, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  activateUser(headers, id) {
    return gateways
      .activateUser(headers, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  // fim usuários gerais
};

export default users;
