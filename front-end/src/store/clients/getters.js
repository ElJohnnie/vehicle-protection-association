export default {
  clients: (state) => state.clients,
  clientById: (state) => state.clientById,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
