import { createRouter, createWebHistory } from "vue-router";
import CurrentWeather from "../components/CurrentWeather.vue";
import WeatherList from "../components/WeatherList.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/today", component: CurrentWeather, name: "today", props: true },
    { path: "/week", component: WeatherList, name: "week", props: true },
    { path: "/", redirect: "/today" },
  ],
});

export default router;
