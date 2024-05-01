<template>
  <div>
    <md-progress-spinner class="md-primary" md-mode="indeterminate"
      ><slot
    /></md-progress-spinner>
  </div>
</template>

<script>
export default {
  name: "progress-spinner",
};
</script>

<style lang="scss" scoped>
.md-progress-spinner {
  margin: 24px;
}
</style>
