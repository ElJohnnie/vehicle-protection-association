<template>
  <div>
    <md-menu>
      <md-button md-menu-trigger>Default</md-button>
      <md-menu-content>
        <md-menu-item>My Item 1</md-menu-item>
        <md-menu-item>My Item 2</md-menu-item>
        <md-menu-item>My Item 3</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
export default {
  name: "menu-dropdown",
};
</script>

<style lang="scss" scoped>
.md-menu {
  margin: 24px;
}
</style>
