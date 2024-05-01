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
        <md-button :to="{ name: 'Usuários' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormUser :isEdit="false" />
  </div>
</template>

<script>
import FormUser from "./FormUser.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import usersMixins from "@/mixins/usersMixins.js";

export default {
  components: {
    TopNavbar,
    FormUser,
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
