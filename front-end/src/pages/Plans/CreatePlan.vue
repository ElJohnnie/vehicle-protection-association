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
        <md-button :to="{ name: 'Planos' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormPlan :isEdit="false" />
  </div>
</template>

<script>
import FormPlan from "./FormPlan.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import plansMixins from "@/mixins/plansMixins.js";

export default {
  components: {
    TopNavbar,
    FormPlan,
    Dialog,
  },
  mixins: [plansMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
