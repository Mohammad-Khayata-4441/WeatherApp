import { createStore } from "vuex";

export default createStore({
  modules: {},
  state() {
    return {
      currentWeather: {},
      sevenDaysWeather: [],
      location: {},
      cities: [],
    };
  },
  mutations: {
    setCurrentWeather(state, payload) {
      this.state.currentWeather = payload;
    },
    setDaysWeather(state, payload) {
      this.state.sevenDaysWeather = payload;
    },
    setLocation(state, payload) {
      state.location = payload;
    },
    setCities(state, payload) {
      this.state.cities = payload;
    },
  },
  getters: {
    getCurrentWeather(state) {
      return state.currentWeather;
    },
    getSevenDays(state) {
      return state.sevenDaysWeather;
    },
    getLocation(state) {
      return state.location;
    },
    getCities(state) {
      return state.cities;
    },
  },
  actions: {
    async findCity(context, payload) {
      const url = `http://api.weatherapi.com/v1/search.json?key=5f1cbd17196641caa6d64101212205&q=${payload}`;
      const response = await fetch(url);
      const responseData = await response.json();
      let cities = [];
      for (const key in responseData) {
        cities.push(responseData[key].name);
      }
      context.commit("setCities", cities);
    },

    async loadWeather(context, payload) {
      const url = `http://api.weatherapi.com/v1/current.json?key=5f1cbd17196641caa6d64101212205&q=${payload}&aqi=no`;
      const response = await fetch(url);
      const responseData = await response.json();
      const weatherData = {
        temp: responseData.current.temp_c.toString(),
        forcast: responseData.current.condition.text,
      };
      const location = {
        city: responseData.location.name,
        region: responseData.location.region,
        country: responseData.location.country,
      };
      context.commit("setLocation", location);
      context.commit("setCurrentWeather", weatherData);
    },

    async loadSevenDays(context, payload) {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=5f1cbd17196641caa6d64101212205&q=${payload}&days=7&aqi=no&alerts=no`;
      const response = await fetch(url);
      const responseData = await response.json();

      const daysWeather = [];
      for (const key in responseData.forecast.forecastday) {
        const day = {
          temp: responseData.forecast.forecastday[key].day.avgtemp_c,
          forcast: responseData.forecast.forecastday[key].day.condition.text,
          date: responseData.forecast.forecastday[key].date,
        };
        daysWeather.push(day);
      }
      context.commit("setDaysWeather", daysWeather);
    },
  },
});
