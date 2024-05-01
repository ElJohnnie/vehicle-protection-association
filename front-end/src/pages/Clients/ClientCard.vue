<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 class="category text-gray">Cliente</h6>
      <h4 class="card-title">{{ client.fullname }}</h4>
      <p class="card-description">{{ client.email }}</p>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon
          ><md-tooltip md-direction="top"
            >Ver cliente e veículos</md-tooltip
          ></md-button
        >
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon>
          <md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "client-card",
  props: {
    client: {},
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("clients", ["getclientById"]),
    toView() {
      this.$router.push({
        name: "Ver cliente",
        params: { id: this.client.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar cliente",
        params: { id: this.client.id },
      });
    },
  },
};
</script>
<style></style>
