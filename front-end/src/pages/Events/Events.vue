<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin flex-between">
      <div class="md-layout-item md-size-33">
        <md-field>
          <label>Filtrar <md-icon>search</md-icon></label>
          <md-input v-model="filterSearch" type="search"></md-input>
        </md-field>
      </div>
    </div>
    <div
      v-if="loading"
      class="md-layout-item md-layout md-gutter md-alignment-top-center"
    >
      <progress-spinner class=""></progress-spinner>
    </div>
    <div v-else class="md-layout md-layout-cards">
      <div
        v-for="event in filteredValues"
        :key="event.id"
        class="md-layout-item md-medium-size-100 md-size-33"
      >
        <event-card :event="event" />
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
import EventCard from "./EventCard.vue";
import TopNavbar from "../Layout/TopNavbar.vue";
import { mapState, mapActions } from "vuex";
import { ProgressSpinner, SnackBar } from "@/components";

export default {
  components: {
    EventCard,
    TopNavbar,
    ProgressSpinner,
    SnackBar,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      activeBar: false,
      filterSearch: null,
    };
  },
  computed: {
    ...mapState("events", ["events"]),
    snackBarActive() {
      return this.$route.query.success;
    },
    snackBarMessage() {
      return this.$route.query.message;
    },
    filteredValues() {
      if (this.filterSearch === "" || this.filterSearch === null) {
        return this.events;
      } else {
        const regex = new RegExp(this.filterSearch, "i");
        return this.events.filter(
          (item) =>
            regex.test(item.type) ||
            regex.test(item.description) ||
            regex.test(item.occurrenceDateTime) ||
            regex.test(item.vehicle.licencePlate) ||
            regex.test(item.vehicle.chassi) ||
            regex.test(item.vehicle.renavam) ||
            regex.test(item.vehicle.model)
        );
      }
    },
  },
  async created() {
    await this.getEvents().then(() => (this.loading = false));
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
    ...mapActions("events", ["getEvents"]),
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
