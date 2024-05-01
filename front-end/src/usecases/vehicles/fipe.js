import api from "@/gateways";

const fipe = {
  getBrandsByType(params) {
    return api
      .getBrandsByType(params)
      .then((response) => response.data)
      .catch((error) => error.response);
  },
  getModelsByBrand(params) {
    return api
      .getModelsByBrand(params)
      .then((response) => response.data)
      .catch((error) => error.response);
  },
  getYearsByModelAndBrand(params) {
    return api
      .getYearsByModelAndBrand(params)
      .then((response) => response.data)
      .catch((error) => error.response);
  },
  getValueVehicleFipe(params) {
    return api
      .getValueVehicleFipe(params)
      .then((response) => response.data)
      .catch((error) => error.response);
  },
};

export default fipe;
