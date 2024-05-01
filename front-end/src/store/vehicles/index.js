import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
import getters from "./getters";

export const name = "vehicles";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
