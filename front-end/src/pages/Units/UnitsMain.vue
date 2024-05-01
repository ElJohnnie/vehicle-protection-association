<template>
  <div class="base-content">
    <div class="md-layout md-layout-button margin flex-between">
      <div class="md-layout-item">
        <top-navbar :select-unit="true"></top-navbar>
      </div>
    </div>
    <div class="md-layout md-layout-button margin flex-between">
      <div class="md-layout-item">
        <md-button
          @click="setCompleteSystem()"
          v-low-user="loggedUser"
          v-medium-user="loggedUser"
          class="md-info md-raised toggle float-right"
          ><md-icon>sensor_door</md-icon>Acesso completo</md-button
        >
      </div>
    </div>
    <div class="md-layout md-alignment-center-space-around">
      <div v-if="loading">
        <progress-spinner class=""></progress-spinner>
      </div>
      <div
        v-else-if="unitsError"
        class="md-layout md-alignment-center-space-around"
      >
        <img :src="noUnitsImg" class="md-width-30" />
      </div>
      <div
        v-else-if="maintenance"
        class="md-layout md-alignment-center-space-around"
      >
        <img :src="maintenanceImg" class="md-width-30" />
      </div>
      <template v-else>
        <div
          v-for="unit in units"
          :key="unit.id"
          class="md-layout-item md-medium-size-100 md-size-33"
        >
          <units-card :unit="unit" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import UnitsCard from "./UnitsCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { ProgressSpinner } from "@/components";
import unitsMixins from "@/mixins/unitsMixins.js";
import units from "@/usecases/units";

export default {
  components: {
    UnitsCard,
    TopNavbar,
    ProgressSpinner,
  },
  mixins: [unitsMixins],
  props: {
    noUnitsImg: {
      type: String,
      default: require("@/assets/img/semunidades.png"),
    },
    maintenanceImg: {
      type: String,
      default: require("@/assets/img/underconstruct.png"),
    },
    imgLogo: {
      type: String,
      default: require("@/assets/img/vue-logo.png"),
    },
  },
  async created() {
    await this.setLoggedUser();
  },
  methods: {
    setCompleteSystem() {
      units.setSelectedUnit();
      this.$router.push({
        name: "Dashboard",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.base-content {
  padding: 5rem;
  height: auto;
  .md-layout {
    height: 100%;
  }
}
</style>
