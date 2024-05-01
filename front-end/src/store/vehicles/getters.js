export default {
  allVehicles: (state) => state.vehicles,
  vehicleById: (state) => state.vehicleById,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
