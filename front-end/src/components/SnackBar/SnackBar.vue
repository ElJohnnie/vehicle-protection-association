<template>
  <md-snackbar
    :md-position="position"
    :md-duration="isInfinity ? Infinity : duration"
    :md-active="showBar"
    md-persistent
  >
    <span>{{ message }}</span>
    <md-button class="md-raised md-success" @click="close">Fechar</md-button>
  </md-snackbar>
</template>

<script>
export default {
  props: {
    showSnackbar: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: "center",
    },
    duration: {
      type: Number,
      default: 4000,
    },
    isInfinity: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "",
    },
    confirm,
  },
  data: () => ({}),
  computed: {
    showBar() {
      return this.showSnackbar;
    },
  },
  methods: {
    close() {
      this.$emit("callback");
    },
  },
};
</script>
