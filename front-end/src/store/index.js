import Vue from "vue";
import Vuex from "vuex";
import users from "./users";
import clients from "./clients";
import address from "./address";
import vehicles from "./vehicles";
import banks from "./banks";
import units from "./units";
import plans from "./plans";
import events from "./events";
import profile from "./profile";
import contracts from "./contracts";
import pdf from "./pdf";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users,
    clients,
    address,
    vehicles,
    banks,
    units,
    plans,
    events,
    profile,
    contracts,
    pdf,
  },
});

export default store;
