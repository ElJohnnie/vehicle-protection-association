export default {
  profile: (state) => state.profile,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
