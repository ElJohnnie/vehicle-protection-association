<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button
          :to="{ name: 'Adicionar plano' }"
          class="md-info md-raised toggle"
          ><md-icon>add</md-icon> Cadastrar plano</md-button
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
        v-for="plan in plans"
        :key="plan.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <plan-card :plan="plan" />
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
import PlanCard from "./PlanCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { mapState, mapActions } from "vuex";
import { ProgressSpinner, SnackBar } from "@/components";

export default {
  components: {
    PlanCard,
    TopNavbar,
    ProgressSpinner,
    SnackBar,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      activeBar: false,
    };
  },
  computed: {
    ...mapState("plans", ["plans"]),
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
  },
  async created() {
    await this.getPlans().then(() => (this.loading = false));
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
  },
  methods: {
    ...mapActions("plans", ["getPlans"]),
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
</style>
