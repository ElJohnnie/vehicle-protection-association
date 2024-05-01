const mutations = {
  SET_UNITS: (state, value) => {
    state.units = value;
  },
  SET_UNIT_BY_ID: (state, value) => {
    state.unitById = value;
  },
  SET_UNIT_BY_LOGGED_USER: (state, value) => {
    state.units = value;
  },
  SET_SELECTED_UNIT: (state, value) => {
    state.selectedUnit = value;
  },
  SET_UNITS_ERROR: (state, value) => {
    state.error.hasError = value.status;
    state.error.message = value.message;
  },
};

export default mutations;
