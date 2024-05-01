<template>
  <div class="content">
    <top-navbar></top-navbar>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button :to="{ name: 'Usuários' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <div v-if="loading" class="md-layout md-alignment-center">
      <progress-spinner></progress-spinner>
    </div>
    <md-card v-else class="md-card-plain">
      <md-card-header data-background-color="blue">
        <h4 class="title">Dados do usuário</h4>
      </md-card-header>

      <md-card-content class="md-layout md-alignment-center">
        <template>
          <div class="md-layout-item md-small-size-100 md-size-50 border">
            <p>
              <span>Nome completo:</span>
              {{ userById.fullname }}
            </p>
            <p>
              <span>CPF/CNPJ:</span>
              {{ formatDocumentNumber(userById.documentNumber) }}
            </p>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50 border">
            <p>
              <span>Email:</span>
              {{ userById.email }}
            </p>
            <p>
              <span>Tipo de usuário:</span>
              {{ returnRoleValue(userById.role) }}
            </p>
          </div>
        </template>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import TopNavbar from "../Layout/TopNavbar.vue";
import { RegularCard, ProgressSpinner } from "@/components";
import { mapActions, mapGetters } from "vuex";
import { parseISO, format } from "date-fns";
import {
  formatDocumentNumber,
  formatPhone,
  returnRoleValue,
} from "../../helpers/utils";

export default {
  components: {
    TopNavbar,
    ProgressSpinner,
  },
  data: function () {
    return {
      search: null,
      loading: true,
      title: "Usuário",
      format,
      formatDocumentNumber,
      parseISO,
      formatPhone,
      returnRoleValue,
    };
  },
  computed: {
    ...mapGetters("users", ["userById"]),
    userId() {
      return this.$route.params.id;
    },
  },
  watch: {
    userById(value) {
      if (value) {
        this.title = this.userById.fullname;
      }
    },
  },
  async created() {
    await this.getUserById(this.userId).then(() => (this.loading = false));
  },
  methods: {
    ...mapActions("users", ["getUserById"]),
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
