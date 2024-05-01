<template>
  <md-card class="md-card-profile" md-with-hove>
    <md-card-content>
      <h6 class="category text-gray">Plano</h6>
      <h4 class="card-title">{{ plan.name }}</h4>
      <!-- criar lógica para essa tratativa -->
      <p class="card-description">
        Cartão: {{ moneyFormat(plan.planPrices[0].value) }}
      </p>
      <p class="card-description">
        Boleto: {{ moneyFormat(plan.planPrices[1].value) }}
      </p>
      <p class="card-description"></p>
      <p class="card-description">
        Periodo: {{ periodicityTranslate(plan.periodicity) }}
      </p>
      <p class="card-description">Quantidade: {{ plan.quantity }}</p>
      <div>
        <md-button @click="toEdit" class="md-warning md-icon-button md-fab"
          ><md-icon>edit</md-icon
          ><md-tooltip md-direction="top">Editar</md-tooltip></md-button
        >
      </div>
    </md-card-content>
  </md-card>
</template>
<script>
import { periodicityTranslate } from "../../helpers/periodicity";
export default {
  name: "plan-card",
  props: {
    plan: {},
  },
  data() {
    return {
      periodicityTranslate,
    };
  },
  methods: {
    toEdit() {
      this.$router.push({
        name: "Editar plano",
        params: { id: this.plan.id },
      });
    },
    moneyFormat(value) {
      return `${value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
};
</script>
