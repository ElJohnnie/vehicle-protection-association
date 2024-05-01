<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <!-- <md-button class="md-info md-raised toggle"
          ><md-icon>add</md-icon> Cadastrar contrato</md-button
        > -->
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
        v-for="contract in contracts"
        :key="contract.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <contract-card :contract="contract" />
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
import ContractCard from "./ContractCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { mapGetters, mapActions } from "vuex";
import { ProgressSpinner, SnackBar } from "@/components";

export default {
  components: {
    ContractCard,
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
    ...mapGetters("contracts", ["contracts"]),
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
  },
  async created() {
    await this.getContracts().then(() => (this.loading = false));
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
    contracts(value) {
      console.log(value);
    },
  },
  methods: {
    ...mapActions("contracts", ["getContracts"]),
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
