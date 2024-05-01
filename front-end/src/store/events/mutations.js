const mutations = {
  SET_EVENTS: (state, value) => {
    state.events = value;
  },
  SET_EVENT_BY_ID: (state, value) => {
    state.eventById = value;
  },
  SET_EVENTS_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
