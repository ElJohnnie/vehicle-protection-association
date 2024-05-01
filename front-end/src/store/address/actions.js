import addressUtils from "../../usecases/address";

const actions = {
  getAddressByCep: ({}, params) => {
    return addressUtils.getCep(params);
  },
};

export default actions;
