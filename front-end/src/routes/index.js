// configure router

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import VueRouteMiddleware from "vue-route-middleware";

Vue.use(VueRouter);

const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
  mode: "history",
});

router.beforeEach(VueRouteMiddleware());

export default router;
