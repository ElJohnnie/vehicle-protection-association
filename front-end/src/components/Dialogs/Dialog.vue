<template>
  <div>
    <md-dialog-alert
      v-if="defaultDialog"
      :md-active="active"
      :md-content="text"
      md-title="Atenção!"
      md-confirm-text="Entendi"
      @click="onConfirm"
    />
    <md-dialog-confirm
      v-else
      :md-active="active"
      md-title="Atenção!"
      :md-content="text"
      md-confirm-text="Aceitar"
      md-cancel-text="Voltar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
export default {
  name: "dialog",
  props: {
    defaultDialog: {
      type: Boolean,
      default: true,
    },
    active: Boolean,
    title: String,
    text: String,
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
