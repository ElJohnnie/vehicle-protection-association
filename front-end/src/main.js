import Vue from "vue";
import App from "./App";
import VueMask from "v-mask";
import money from "v-money";
import VueJwtDecode from "vue-jwt-decode";

// router setup
import router from "./routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";
//store
import store from "./store";
// directives
import directives from "./directives";

Vue.prototype.$Chartist = Chartist;
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(directives);
Vue.use(Notifications);
Vue.use(VueMask);
Vue.use(VueJwtDecode);
Vue.use(money, { precision: 4 });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  data: {
    Chartist: Chartist,
  },
  render: (app) => app(App),
});

export default store;
