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
          :to="{ name: 'Adicionar usuários' }"
          class="md-info md-raised toggle"
          ><md-icon>add</md-icon> Cadastrar usuário</md-button
        >
      </md-menu>
    </div>
    <div
      v-if="loading"
      class="md-layout-item md-layout md-gutter md-alignment-top-center"
    >
      <progress-spinner class=""></progress-spinner>
    </div>
    <div v-else class="md-layout md-layout-cards">
      <div
        v-for="user in users"
        :key="user.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <user-card
          :user="user"
          @activeUser="toSetActivateUser"
          @inactiveUser="toSetInactivateUser"
        />
      </div>
    </div>
    <SnackBar
      :showSnackbar="activeBar"
      :message="snackBarMessage"
      @callback="close"
    ></SnackBar>
  </div>
</template>

<script>
import UserCard from "./UserCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { mapActions } from "vuex";
import { ProgressSpinner, SnackBar, Dialog } from "@/components";
import usersMixins from "@/mixins/usersMixins.js";

export default {
  components: {
    UserCard,
    TopNavbar,
    ProgressSpinner,
    SnackBar,
    Dialog,
  },
  mixins: [usersMixins],
  props: {
    dataNotFound: {
      type: String,
      default: require("@/assets/img/datanotfound.png"),
    },
  },
  data: function () {
    return {
      search: null,
      activeBar: false,
    };
  },
  computed: {
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
  },
  async created() {
    await Promise.all([this.setLoggedUser(), this.setSelectedUnit()]);
    if (this.snackBarActive) {
      this.activeBar = true;
    }
  },
  watch: {
    activeBar(value) {
      if (value) {
        setTimeout(() => {
          this.activeBar = false;
        }, "2000");
      }
    },
    async selectedUnit(value) {
      if (value.allUnits === true) {
        return await this.getUsers().then(() => (this.loading = false));
      }
      return await this.getUsersByUnit(value.selectedUnitId).then(
        () => (this.loading = false)
      );
    },
    // para uso das atualizações
    "$route.query": {
      handler(value) {
        if (value) {
          this.activeBar = true;
          this.snackBarMessage = value.message;
        }
      },
    },
  },
  methods: {
    ...mapActions("users", ["getUsers"]),
    close() {
      this.activeBar = false;
    },
  },
};
</script>
<style>
.md-layout-button {
  display: flex;
  align-content: flex-end;
  justify-content: end;
  margin-bottom: 36px;
  margin-right: 36px;
}
.img-width {
  max-width: 40vw;
}
</style>
