import gateways from "@/gateways";

const contracts = {
  getContracts(headers) {
    return gateways
      .getContracts(headers)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getContractByParam(headers, params) {
    return gateways
      .getContractByParam(headers, params)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  getContractCarne(headers, id) {
    return gateways
      .getContractCarne(headers, id)
      .then(({ data }) => ({ status: "success", data }))
      .catch(() => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  async setContract(headers, data) {
    try {
      await gateways.setContract(headers, data);
      return { status: "success" };
    } catch (err) {
      return {
        status: "generic_error",
        message: err.response.data.message,
      };
    }
  },
  editContract(headers, id, data) {
    return gateways
      .editContract(headers, id, data)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
  deleteContract(headers, id) {
    return gateways
      .deleteContract(headers, id)
      .then(() => ({ status: "success" }))
      .catch((e) => ({
        status: "generic_error",
        message: e.response.data.message,
      }));
  },
};

export default contracts;
