import api from "@/gateways";

const vehicles = {
  getVehicles(header) {
    return api
      .getVehicles(header)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getVehicleById(header, id) {
    return api
      .getVehicleById(header, id)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  setVehicle(header, data) {
    return api
      .setVehicle(header, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  editVehicle(header, id, data) {
    return api
      .editVehicle(header, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  deleteVehicle(header, id) {
    return api
      .deleteVehicle(header, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getVehiclesByClient(header, clientId) {
    return api
      .getVehiclesByClient(header, clientId)
      .then(({ data }) => ({ status: "success", data }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default vehicles;
