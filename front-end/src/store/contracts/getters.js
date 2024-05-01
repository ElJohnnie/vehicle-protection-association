export default {
  contracts: (state) => state.contracts,
  contractByParam: (state) => state.contractByParam,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
