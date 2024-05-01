export default {
  units: (state) => state.units,
  unit: (state) => state.unitById,
  userUnits: (state) => state.loggedUserUnits,
  selectedUnit: (state) => state.selectedUnit,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
