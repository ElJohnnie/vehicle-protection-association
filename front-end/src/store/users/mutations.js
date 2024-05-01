const mutations = {
  SET_LOGGED_USER: (state, value) => {
    state.loggedUser = value;
  },
  SET_USER_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
  SET_USERS: (state, value) => {
    state.users = value;
  },
  SET_USER_BY_ID: (state, value) => {
    state.userById = value;
  },
};

export default mutations;
