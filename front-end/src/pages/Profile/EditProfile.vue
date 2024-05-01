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
        <md-button :to="{ name: 'Ver perfil' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <edit-profile-form data-background-color="green"> </edit-profile-form>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfileForm from "./EditProfileForm.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import profileMixins from "@/mixins/profileMixins.js";

export default {
  components: {
    EditProfileForm,
    Dialog,
    TopNavbar,
  },
  mixins: [profileMixins],
  computed: {},
  methods: {},
};
</script>
