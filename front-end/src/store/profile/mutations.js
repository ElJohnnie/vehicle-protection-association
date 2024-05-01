const mutations = {
  SET_PROFILE: (state, value) => {
    state.profile = value;
  },
  SET_PROFILE_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
