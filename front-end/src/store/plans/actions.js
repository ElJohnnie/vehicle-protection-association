import plans from "@/usecases/plans";
import users from "@/usecases/users";

const actions = {
  getPlans: async ({ commit }) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await plans.getPlans(headers);
    if (status !== "success") {
      commit("SET_PLANS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_PLANS", data.plans);
  },
  getPlanById: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { data, status, message } = await plans.getPlanById(headers, id);
    if (status !== "success") {
      commit("SET_PLANS_ERROR", { hasError: true, message: message });
      return;
    }
    commit("SET_PLAN_BY_ID", data.plan);
  },
  setPlan: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await plans.setPlan(headers, data);
    if (status !== "success") {
      commit("SET_PLANS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  editPlan: async ({ commit }, data) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { id, body } = data;
    const { status, message } = await plans.editPlan(headers, id, body);
    if (status !== "success") {
      commit("SET_PLANS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  deletePlan: async ({ commit }, id) => {
    const headers = {
      Authorization: `Bearer ${users.getAccessToken()}`,
    };
    const { status, message } = await plans.deletePlan(headers, id);
    if (status !== "success") {
      commit("SET_PLANS_ERROR", { hasError: true, message: message });
      return;
    }
    return status;
  },
  resetErrorStatus: ({ commit }) => {
    commit("SET_PLANS_ERROR", { hasError: false, message: null });
  },
};

export default actions;
