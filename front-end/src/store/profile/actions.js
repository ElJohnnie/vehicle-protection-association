import profile from "@/usecases/profile";
import users from "@/usecases/users";

const actions = {
  loggedProfile: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message, data } = await profile.loggedProfile(headers);
    if (status !== "success") {
      commit("SET_PROFILE_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_PROFILE", data);
  },
  editProfile: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await profile.editProfile(headers, data);
    if (status !== "success") {
      commit("SET_PROFILE_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editPasswordProfile: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await profile.editPasswordProfile(
      headers,
      data
    );
    if (status !== "success") {
      commit("SET_PROFILE_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_PROFILE_ERROR", { hasError: false, message: null });
  },
};
export default actions;
