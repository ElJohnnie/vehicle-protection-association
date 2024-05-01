<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 class="category text-gray">Unidade</h6>
      <h4 class="card-title">{{ unit.corporateName }}</h4>
      <p class="card-description">{{ unitManager }}</p>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon
          ><md-tooltip md-direction="top">Ver mais</md-tooltip></md-button
        >
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon
          ><md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
        <md-button @click="toManager" class="md-info md-icon-button md-fab"
          ><md-icon>group</md-icon
          ><md-tooltip md-direction="top"
            >Editar gerencimento</md-tooltip
          ></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "unit-card",
  props: {
    unit: {},
  },
  data() {
    return {
      unitManager: "Sem gerente cadastrado",
    };
  },
  computed: {
    // ...mapGetters("users", ["userById"]),
  },
  // async created() {
  //   await this.getUserById(this.unit.manager.userId);
  // },
  methods: {
    // ...mapActions("users", ["getUserById"]),
    toView() {
      // por completar
      this.$router.push({
        name: "Ver unidade",
        params: { id: this.unit.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar unidade",
        params: { id: this.unit.id },
      });
    },
    toManager() {
      this.$router.push({
        name: "Alocar gerente",
        params: { id: this.unit.id },
      });
    },
  },
};
</script>
