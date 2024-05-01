import banks from "../../usecases/banks";

const actions = {
  getBanks: async ({ commit }) => {
    const result = await banks.getBanks();
    commit("SET_BANKS", result);
  },
};

export default actions;
