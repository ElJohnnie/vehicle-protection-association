import gateways from "@/gateways";

const addressUtils = {
  getCep(params) {
    return gateways
      .getCep(params)
      .then((response) => response.data)
      .catch((error) => error.response);
  },
};

export default addressUtils;
