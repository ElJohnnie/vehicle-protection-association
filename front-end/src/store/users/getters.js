export default {
  loggedUser: (state) => state.loggedUser,
  userById: (state) => state.userById,
  users: (state) => state.users,
  error: (state) => state.error.hasError,
  messageError: (state) => state.error.message,
};
