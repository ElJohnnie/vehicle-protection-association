export default {
  plans: (state) => state.plans,
  planById: (state) => state.planById,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
