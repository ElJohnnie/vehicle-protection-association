<template>
  <div class="content">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- <SpeedDial></SpeedDial> -->
  </div>
</template>
<script>
import { SpeedDial } from "../../components";
export default {
  components: {
    // SpeedDial,
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
