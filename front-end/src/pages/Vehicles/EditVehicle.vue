<template>
  <div class="content">
    <top-navbar></top-navbar>
    <Dialog
      :active="activeDialog"
      :text="messageDialog"
      :defaultDialog="defaultDialog"
      @confirm="confirmDialog"
      @cancel="closeDialog"
    ></Dialog>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button :to="{ name: 'Veículos' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormVehicle
      :isEdit="true"
      :vehicleId="setVehicle"
      @deleteVehicle="toSetDeleteVehicle"
      @editDialog="toSetEditDialog"
    />
  </div>
</template>

<script>
import FormVehicle from "./FormVehicle.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import vehiclesMixins from "@/mixins/vehiclesMixins.js";
import { Dialog } from "@/components";

export default {
  components: {
    TopNavbar,
    FormVehicle,
    Dialog,
  },
  mixins: [vehiclesMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
