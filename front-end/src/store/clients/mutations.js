const mutations = {
  SET_CLIENTS: (state, value) => {
    state.clients = value;
  },
  SET_CLIENT_BY_ID: (state, value) => {
    state.clientById = Object.assign({}, value);
  },
  SET_CLIENTS_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
