export default {
  events: (state) => state.events,
  eventById: (state) => state.eventById,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
