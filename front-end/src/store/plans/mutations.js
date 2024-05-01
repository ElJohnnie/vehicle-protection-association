const mutations = {
  SET_PLANS: (state, value) => {
    state.plans = value;
  },
  SET_PLAN_BY_ID: (state, value) => {
    state.planById = value;
  },
  SET_PLANS_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
