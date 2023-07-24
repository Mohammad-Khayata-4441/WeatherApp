<template>
  <section>
    <weather-item :weatherObject="currentWeather"> </weather-item>
  </section>
</template>

<script>
export default {
  computed: {
    currentWeather() {
      return this.$store.getters.getCurrentWeather;
    },
  },
};
</script>
<style>
@media (min-width: 1024px) {
  section {
    margin-top: 24px;
  }
}
</style>