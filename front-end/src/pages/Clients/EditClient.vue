<template>
  <div class="content">
    <top-navbar></top-navbar>
    <Dialog
      :active="activeDialog"
      :text="messageDialog"
      :defaultDialog="defaultDialog"
      @confirm="confirmDialog"
      @cancel="closeDialog"
    ></Dialog>
    <div class="md-layout md-layout-button margin">
      <md-menu md-size="big" md-direction="top-start">
        <md-button :to="{ name: 'Clientes' }" class="md-info md-raised toggle"
          ><md-icon>arrow_back_ios</md-icon> Voltar</md-button
        >
      </md-menu>
    </div>
    <FormClient
      :isEdit="true"
      :clientId="setClient"
      @deleteClient="toSetDeleteClient"
    />
  </div>
</template>

<script>
//É preciso finalizar o bug do transito de dados no formulário de edição
import FormClient from "./FormClient";
import TopNavbar from "../Layout/TopNavbar.vue";
import { Dialog } from "@/components";
import clientsMixins from "@/mixins/clientsMixins.js";

export default {
  components: {
    TopNavbar,
    FormClient,
    Dialog,
  },
  mixins: [clientsMixins],
};
</script>
<style>
.md-layout-button {
  margin-bottom: 36px;
}
</style>
