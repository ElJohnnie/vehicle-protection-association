import gateways from "@/gateways";

const clients = {
  getClients(header) {
    return gateways
      .getClients(header)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getClientsById(headers, params) {
    return gateways
      .getClientsByid(headers, params)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  setClient(headers, data) {
    return gateways
      .setClient(headers, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editClient(headers, id, data) {
    return gateways
      .editClient(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  deleteClient(headers, id) {
    return gateways
      .deleteClient(headers, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getClientsByUnit(header, id) {
    return gateways
      .getClientsByUnit(header, id)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default clients;
