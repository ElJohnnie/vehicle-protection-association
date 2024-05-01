<template>
  <div>
    <md-card v-if="defaultCard">
      <md-card-header
        class="card-default"
        v-if="title"
        data-background-color="blue"
      >
        <div class="md-title">{{ title }}</div>
        <md-menu class="md-button" v-if="headerButton" md-size="big">
          <md-button class="md-info md-raised toggle" @click="headerAction">
            {{ headerButtonDescribe }}
          </md-button>
        </md-menu>
      </md-card-header>

      <md-card-content>
        <slot></slot>
      </md-card-content>

      <md-card-actions v-if="withActions">
        <md-button @click="action">Action</md-button>
      </md-card-actions>
    </md-card>

    <md-card v-else>
      <md-card-header v-if="title && subTitle" data-background-color="blue">
        <div class="md-title">{{ title }}</div>
        <div class="md-subhead">{{ subTitle }}</div>
      </md-card-header>

      <md-card-content>
        <slot></slot>
      </md-card-content>

      <md-card-actions v-if="withActions">
        <md-button @click="action">Action</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "RegularCard",
  props: {
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    defaultCard: {
      type: Boolean,
      default: true,
    },
    withActions: {
      type: Boolean,
      default: false,
    },
    actionDescribe: {
      type: String,
      default: "",
    },
    actionFunction: {
      type: Function,
      default: () => {},
    },
    headerButton: {
      type: Boolean,
      default: false,
    },
    headerButtonDescribe: {
      type: String,
      default: "",
    },
  },
  methods: {
    action() {
      this.$emit("action", actionFunction);
    },
    headerAction() {
      this.$emit("headerButtonAction");
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card {
  width: 100%;
  & .card-default {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
