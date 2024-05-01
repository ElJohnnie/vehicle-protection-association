<template>
  <div class="login-content">
    <Dialog
      :active="activeDialog"
      :text="messageError"
      @confirm="resetErrorStatus"
    ></Dialog>
    <div class="md-layout md-alignment-center-space-around">
      <div
        class="md-layout-item md-logo-item md-size-25 md-small-size-50 md-xsmall-size-100"
      >
        <img src="../../assets/img/logo.png" alt="vehicle-insurance" />
      </div>
      <div
        class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"
      >
        <box-login-form data-background-color="blue"> </box-login-form>
      </div>
    </div>
  </div>
</template>

<script>
import { BoxLoginForm } from "@/pages";
import { Dialog } from "@/components";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    BoxLoginForm,
    Dialog,
  },
  data() {
    return {
      activeDialog: false,
    };
  },
  computed: {
    ...mapGetters("users", ["error", "messageError"]),
  },
  watch: {
    error(error) {
      if (error) {
        this.activeDialog = true;
      } else {
        this.activeDialog = false;
      }
    },
  },
  methods: {
    ...mapActions("users", ["resetErrorStatus"]),
  },
};
</script>
<style lang="scss" scoped>
.login-content {
  height: 100vh;
  .md-layout {
    height: 100%;
  }
}
</style>
