import { mapGetters, mapActions } from "vuex";

export default {
  data: function () {
    return {
      search: null,
      activeDialog: false,
      messageDialog: null,
      defaultDialog: true,
      loading: true,
    };
  },
  computed: {
    ...mapGetters("profile", ["error", "messageError"]),
  },
  watch: {
    error(error) {
      if (error) {
        this.defaultDialog = true;
        this.messageDialog = this.messageError;
        this.activeDialog = true;
      } else {
        this.activeDialog = false;
        this.loading = false;
      }
    },
  },
  methods: {
    ...mapActions("profile", ["resetErrorStatus"]),
    confirmDialog() {
      if (this.error) {
        this.resetErrorStatus();
      }
      this.activeDialog = false;
    },
    closeDialog() {
      this.activeDialog = false;
    },
  },
};
