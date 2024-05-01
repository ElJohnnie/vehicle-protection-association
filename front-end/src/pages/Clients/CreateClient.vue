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
        <md-button :to="{ name: 'Clientes' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormClient :isEdit="false" />
  </div>
</template>

<script>
import FormClient from "./FormClient";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import clientsMixins from "@/mixins/clientsMixins.js";

export default {
  components: {
    TopNavbar,
    FormClient,
    Dialog,
    FormClient,
  },
  mixins: [clientsMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
