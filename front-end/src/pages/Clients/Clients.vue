<template>
  <div class="content">
    <top-navbar></top-navbar>
    <Dialog
      :active="activeDialog"
      :text="messageError"
      @confirm="resetErrorStatus"
    ></Dialog>
    <div class="md-layout md-layout-button margin flex-between">
      <div class="md-layout-item md-size-33">
        <md-field>
          <label>Filtrar <md-icon>search</md-icon></label>
          <md-input v-model="filterSearch" type="search"></md-input>
        </md-field>
      </div>
      <md-menu>
        <md-button
          :to="{ name: 'Adicionar clientes' }"
          class="md-info md-raised toggle"
          ><md-icon>add</md-icon> Adicionar cliente</md-button
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
        v-for="client in filteredValues"
        :key="client.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <client-card :client="client" />
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
import ClientCard from "./ClientCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { mapActions, mapGetters } from "vuex";
import { ProgressSpinner, SnackBar, Dialog } from "@/components";
import clientsMixins from "@/mixins/clientsMixins.js";

export default {
  components: {
    ClientCard,
    TopNavbar,
    Dialog,
    ProgressSpinner,
    SnackBar,
  },
  mixins: [clientsMixins],
  data: function () {
    return {
      search: null,
      activeBar: false,
      filterSearch: null,
    };
  },
  computed: {
    ...mapGetters("clients", ["clients"]),
    filteredValues() {
      if (this.filterSearch === "" || this.filterSearch === null) {
        return this.clients;
      } else {
        const regex = new RegExp(this.filterSearch, "i");
        return this.clients.filter(
          (item) =>
            regex.test(item.fullname) ||
            regex.test(item.documentNumber) ||
            regex.test(item.email) ||
            regex.test(item.celphone) ||
            regex.test(item.telephone)
        );
      }
    },
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
  },
  async created() {
    await this.setSelectedUnit();
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
        return await this.getClients().then(() => (this.loading = false));
      }
      return await this.getClientsByUnit(value.selectedUnitId).then(
        () => (this.loading = false)
      );
    },
  },
  methods: {
    ...mapActions("clients", ["getClients"]),
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
