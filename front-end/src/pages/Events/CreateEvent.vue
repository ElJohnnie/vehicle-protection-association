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
        <md-button :to="{ name: 'Veículos' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormEvent :isEdit="false" />
  </div>
</template>

<script>
import FormEvent from "./FormEvent.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import eventsMixins from "@/mixins/eventsMixins.js";

export default {
  components: {
    TopNavbar,
    FormEvent,
    Dialog,
  },
  mixins: [eventsMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
