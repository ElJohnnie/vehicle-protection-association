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
        <md-button :to="{ name: 'Contratos' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormContract
      :isEdit="true"
      :vehicleId="setPlan"
      @deleteContract="toSetDeleteContract"
    />
  </div>
</template>

<script>
import FormContract from "./FormContract.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import contractMixins from "@/mixins/contractMixins.js";

export default {
  components: {
    TopNavbar,
    FormContract,
    Dialog,
  },
  mixins: [contractMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
