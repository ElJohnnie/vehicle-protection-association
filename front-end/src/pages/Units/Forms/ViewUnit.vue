<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button :to="{ name: 'Unidades' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <div v-if="loading" class="md-layout md-alignment-center">
      <progress-spinner></progress-spinner>
    </div>
    <md-card v-else class="md-card-plain">
      <md-card-header data-background-color="blue">
        <h4 class="title">Dados da unidade</h4>
      </md-card-header>

      <md-card-content class="md-layout md-alignment-center">
        <template>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <p>
              <span>Nome unidade:</span>
              {{ unit.corporateName }}
            </p>
            <p>
              <span>CPF/CNPJ:</span>
              {{ formatDocumentNumber(unit.documentNumber) }}
            </p>
          </div>
        </template>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import TopNavbar from "../../Layout/TopNavbar.vue";
import { ProgressSpinner } from "@/components";
import { mapActions, mapGetters } from "vuex";
import { formatDocumentNumber } from "@/helpers/utils";

export default {
  components: {
    TopNavbar,
    ProgressSpinner,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      title: "Unidades",
      formatDocumentNumber,
    };
  },
  computed: {
    ...mapGetters("units", ["unit"]),
    unitId() {
      return this.$route.params.id;
    },
  },
  watch: {
    unit(value) {
      if (value) {
        this.title = value.corporateName;
      }
    },
  },
  async created() {
    await this.getUnitById(this.unitId).then(() => (this.loading = false));
  },
  methods: {
    ...mapActions("units", ["getUnitById"]),
  },
};
</script>
<style lang="scss">
.md-layout-button {
  display: flex;
  align-content: flex-end;
  justify-content: end;
  margin-bottom: 36px;
  margin-right: 36px;
}
.md-alignment-center {
  align-items: initial !important;
}

.border {
  border-right: 1px solid #9e9e9e;
}
</style>
