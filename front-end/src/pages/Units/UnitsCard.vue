<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h4 class="card-title">{{ unit.corporateName }}</h4>
      <p class="card-description">Descrição da unidade</p>
      <div>
        <md-button @click="selectUnit(unit)" class="md-info md-sm"
          ><md-icon>login</md-icon> Selecionar Unidade</md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import units from "@/usecases/units";

export default {
  name: "units-card",
  props: {
    unit: null,
  },
  data() {
    return {};
  },
  methods: {
    selectUnit(value) {
      units.setSelectedUnit(value);
      this.$router.push({
        name: "Dashboard",
      });
    },
  },
};
</script>
