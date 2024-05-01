<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout">
      <div
        v-if="loading"
        class="md-layout-item md-layout md-gutter md-alignment-top-center"
      >
        <progress-spinner class=""></progress-spinner>
      </div>
      <div v-else class="md-layout-item">
        <user-card :user="loggedUser"> </user-card>
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
import { mapActions, mapGetters } from "vuex";
import { ProgressSpinner, SnackBar, Dialog } from "@/components";

export default {
  components: {
    UserCard,
    TopNavbar,
    SnackBar,
    ProgressSpinner,
  },
  data: function () {
    return {
      activeBar: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("users", ["loggedUser"]),
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
  },
  watch: {
    loggedUser(value) {
      if (value) {
        this.loading = false;
      }
    },
  },
  created() {
    this.setLoggedUser();
    if (this.snackBarActive) {
      this.activeBar = true;
    }
  },
  methods: {
    ...mapActions("users", ["setLoggedUser"]),
    close() {
      this.activeBar = false;
    },
  },
};
</script>
