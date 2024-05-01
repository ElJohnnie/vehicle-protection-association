<template>
  <div class="error-content">
    <top-navbar></top-navbar>
    <div class="md-layout md-alignment-center-space-around">
      <img :src="img404" class="img-width" />
    </div>
    <div class="md-layout md-alignment-center-space-around">
      <h3>Página não encontrada</h3>
    </div>
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";

export default {
  components: {
    TopNavbar,
  },
  props: {
    img404: {
      type: String,
      default: require("@/assets/img/404.png"),
    },
  },
};
</script>
<style lang="scss" scoped>
.error-content {
  height: auto;
  .md-layout {
    height: 100%;
  }
  .img-width {
    max-width: 50vw;
  }
}
</style>
