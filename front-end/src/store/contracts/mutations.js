const mutations = {
  SET_CONTRACTS: (state, value) => {
    state.contracts = value;
  },
  SET_CONTRACT_BY_PARAM: (state, value) => {
    state.contractByParam = value;
  },
  SET_CONTRACT_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
