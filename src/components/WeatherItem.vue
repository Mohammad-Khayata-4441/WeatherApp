<template>
  <li class="item">
    <header>
      <img :src="image" alt="" />
    </header>
    <main>
      <span class="temp">{{ weatherObject.temp }}°</span>
      <span class="forcast">{{ weatherObject.forcast }}</span>
      <span class="date">{{ weatherObject.date }}</span>
    </main>
  </li>
</template>


<script>
export default {
  props: ["weatherObject"],
  computed: {
    image() {
      const image = require(`../assets/images/pngs/${this.weatherObject.forcast.toLowerCase()}.png`);
      return image;
    },
  },
};
</script>

<style scoped>
.temp,
.forcast,
.date {
  text-align: center;
}
.temp {
  color: #a1d0ff;
  font-size: 25px;
  font-weight: bold;
}
.forcast {
  color: #fff;
  font-size: 22px;
  font-weight: 500;
}
.date {
  color: #fcb641;
  font-size: 16px;
  font-weight: bold;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
main {
  display: flex;
  flex-direction: column;
}
img {
  width: 60px;
  height: 60px;
}
header {
  margin-bottom: 10px;
}
</style>