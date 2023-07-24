<template>
  <ul>
    <weather-item
      v-for="item in weatherList"
      :key="item"
      :weatherObject="item"
    ></weather-item>
  </ul>
</template>
<script>
import WeatherItem from "./WeatherItem.vue";
export default {
  components: { WeatherItem },
  computed: {
    weatherList() {
      return this.$store.getters.getSevenDays;
    },
  },
};
</script>

<style scoped>
ul {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}
@media (max-width: 1024px) {
  ul {
    display: grid;
    gap: 25px 0;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 800px) {
  ul {
    grid-template-columns: 1fr 1fr;
  }
  ul li:first-child {
    grid-column: span 2;
  }
}
@media (max-width: 600px) {
  ul {
    grid-template-columns: auto;
  }
  ul li:first-child {
    grid-column: auto;
  }
}
</style>