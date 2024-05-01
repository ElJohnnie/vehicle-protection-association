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
        <md-button
          :to="{ name: 'Editar usuário' }"
          class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormPassword />
  </div>
</template>

<script>
import FormPassword from "./FormPassword.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import usersMixins from "@/mixins/usersMixins.js";

export default {
  components: {
    TopNavbar,
    FormPassword,
    Dialog,
  },
  mixins: [usersMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
