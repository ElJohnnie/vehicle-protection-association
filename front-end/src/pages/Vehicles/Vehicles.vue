<template>
  <div class="content">
    <top-navbar></top-navbar>
    <Dialog
      :active="activeDialog"
      :text="messageError"
      @confirm="resetErrorStatus"
    ></Dialog>
    <div class="md-layout md-layout-button margin flex-between">
      <div class="md-layout-item md-size-33">
        <md-field>
          <label>Filtrar <md-icon>search</md-icon></label>
          <md-input v-model="filterSearch" type="search"></md-input>
        </md-field>
      </div>
      <md-menu md-size="big" md-direction="top-start">
        <md-button
          :to="{ name: 'Adicionar veículos' }"
          class="md-info md-raised toggle"
          ><md-icon>add</md-icon> Cadastrar veículo</md-button
        >
      </md-menu>
    </div>
    <div
      v-if="loading"
      class="md-layout-item md-layout md-gutter md-alignment-top-center"
    >
      <progress-spinner class=""></progress-spinner>
    </div>
    <div v-else class="md-layout md-layout-cards">
      <div
        v-for="vehicle in filteredValues"
        :key="vehicle.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <vehicles-card :vehicle="vehicle" />
      </div>
    </div>
    <SnackBar
      :showSnackbar="activeBar"
      :message="snackBarMessage"
      @callback="close"
    ></SnackBar>
  </div>
</template>

<script>
import VehiclesCard from "./VehiclesCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { ProgressSpinner, SnackBar, Dialog } from "@/components";
import { mapGetters, mapActions } from "vuex";
import vehiclesMixins from "@/mixins/vehiclesMixins.js";

export default {
  components: {
    VehiclesCard,
    TopNavbar,
    ProgressSpinner,
    SnackBar,
    Dialog,
  },
  mixins: [vehiclesMixins],
  data: function () {
    return {
      search: null,
      activeBar: false,
      filterSearch: null,
    };
  },
  computed: {
    ...mapGetters("vehicles", ["allVehicles"]),
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
    filteredValues() {
      if (this.filterSearch === "" || this.filterSearch === null) {
        return this.allVehicles;
      } else {
        const regex = new RegExp(this.filterSearch, "i");
        return this.allVehicles.filter(
          (item) =>
            regex.test(item.model) ||
            regex.test(item.type) ||
            regex.test(item.brand) ||
            regex.test(item.client.fullname) ||
            regex.test(item.renavam) ||
            regex.test(item.chassi) ||
            regex.test(item.client.licenseDocument.licenseNumber) ||
            regex.test(item.licensePlate)
        );
      }
    },
  },
  watch: {
    activeBar(value) {
      if (value) {
        setTimeout(() => {
          this.activeBar = false;
        }, "2000");
      }
    },
    allVehicles(value) {
      console.log(value);
    },
    async selectedUnit(value) {
      if (value.allUnits === true) {
        return await this.getVehicles().then(() => (this.loading = false));
      }
      return await this.getVehiclesByUnit(value.selectedUnitId).then(
        () => (this.loading = false)
      );
    },
  },
  async created() {
    await this.setSelectedUnit();
    if (this.snackBarActive) {
      this.activeBar = true;
    }
  },
  methods: {
    ...mapActions("vehicles", ["getVehicles"]),
    close() {
      this.activeBar = false;
    },
  },
};
</script>
<style>
.md-layout-button {
  display: flex;
  align-content: flex-end;
  justify-content: end;
  margin-bottom: 36px;
  margin-right: 36px;
}
</style>
