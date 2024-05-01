<template>
  <div class="content">
    <top-navbar></top-navbar>
    <Dialog
      :active="activeDialog"
      :text="messageError"
      @confirm="resetErrorStatus"
    ></Dialog>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button @click="backButton" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormContract :vehicleId="vehicleId" :isEdit="false" />
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
  computed: {
    origin() {
      return this.$route.query.origin;
    },
    vehicleId() {
      return this.$route.params.id;
    },
  },
  methods: {
    backButton() {
      if (this.origin) {
        return this.$router.push({
          name: this.origin,
        });
      }
      return this.$router.push({
        name: "Contratos",
      });
    },
  },
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
