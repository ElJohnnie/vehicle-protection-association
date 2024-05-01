const directives = {
  install(Vue) {
    Vue.directive("low-user", {
      bind(el, binding, node) {
        if (binding.value.role === "LOW") {
          el.style.display = "none";
        }
      },
    });
    Vue.directive("medium-user", {
      bind(el, binding, node) {
        if (binding.value.role === "MEDIUM") {
          el.style.display = "none";
        }
      },
    });
  },
};

export default directives;
