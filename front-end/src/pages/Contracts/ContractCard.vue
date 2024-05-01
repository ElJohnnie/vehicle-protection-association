<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 class="category text-gray">Contrato</h6>
      <div>
        <md-button @click="toView" class="md-success md-icon-button md-fab"
          ><md-icon>visibility</md-icon
          ><md-tooltip md-direction="top">Ver contrato</md-tooltip></md-button
        >
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon
          ><md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "contract-card",
  props: {
    contract: {},
  },
  data() {
    return {};
  },
  methods: {
    toView() {
      this.$router.push({
        name: "Ver contrato",
        params: { id: this.contract.id },
      });
    },
    toEdit() {
      this.$router.push({
        name: "Editar contrato",
        params: { id: this.contract.id },
      });
    },
  },
};
</script>
