const mutations = {
  SET_VEHICLES: (state, value) => {
    state.vehicles = value;
  },
  SET_VEHICLE_BY_ID: (state, value) => {
    state.vehicleById = value;
  },
  SET_VEHICLES_ERROR: (state, value) => {
    state.error.hasError = value.hasError;
    state.error.message = value.message;
  },
};

export default mutations;
