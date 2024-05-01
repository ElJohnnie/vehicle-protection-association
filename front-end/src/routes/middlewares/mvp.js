export default (to, from, next) => {
  if (process.env.VUE_APP_DEV_ENVIRONMENT) {
    return false;
  }
};
