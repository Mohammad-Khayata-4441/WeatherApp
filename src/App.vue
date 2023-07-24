<template>
  <div class="parent">
    <div class="content">
      <div class="container">
        <div class="header">
          <h1>Weather Froecast</h1>
          <div>
            <div class="center-content">
              <input
                type="text"
                @blur="toggleResults(false)"
                @focus="toggleResults(true)"
                placeholder="Search For A City ..."
                v-model="enterdCity"
                @keyup="sendData"
              />
              <div><i class="fas fa-search"></i></div>
            </div>
            <transition name="results" mode="out-in">
              <section v-if="resultVisb">
                <ul class="search-res" v-if="foundCities">
                  <li
                    v-for="city in citiesList"
                    :key="city"
                    @click="getSelectedCity(city)"
                  >
                    {{ city }}
                  </li>
                </ul>

                <p v-else-if="!foundCities && enterdCity != ''">
                  No Citites Found
                </p>
              </section>
            </transition>
          </div>

          <nav>
            <ul class="links">
              <li><router-link to="/today">Curent</router-link></li>
              <li><router-link to="/week"> Next days</router-link></li>
            </ul>
          </nav>
        </div>

        <div class="spinners" v-if="weatherLoading">
          <div
            class="spinner-grow"
            style="width: 3rem; height: 3rem"
            role="status"
          ></div>
          <div
            class="spinner-grow"
            style="width: 3rem; height: 3rem"
            role="status"
          ></div>
          <div
            class="spinner-grow"
            style="width: 3rem; height: 3rem"
            role="status"
          ></div>
        </div>

        <div class="main" v-else>
          <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
          </router-view>
        </div>
        <div class="location" v-if="!weatherLoading">
          <h5>{{ weatherLocation.city }}</h5>
          <h5>{{ weatherLocation.region }}</h5>
          <h5>{{ weatherLocation.country }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vuex from "./store/index.js";
export default {
  computed: {
    foundCities() {
      return vuex.getters.getCities.length > 1;
    },
    weatherLocation() {
      return vuex.getters.getLocation;
    },
    citiesList() {
      return vuex.getters.getCities;
    },
  },
  data() {
    return {
      enterdCity: "",
      selectedCity: "",
      resultVisb: false,
      weatherLoading: false,
    };
  },
  methods: {
    sendData() {
      vuex.dispatch("findCity", this.enterdCity);
    },
    toggleResults(val) {
      this.resultVisb = val;
    },
    getSelectedCity(city) {
      this.selectedCity = city;
      this.loadWeather();
    },
    async loadWeather() {
      this.weatherLoading = true;
      await vuex.dispatch("loadWeather", this.selectedCity);
      await vuex.dispatch("loadSevenDays", this.selectedCity);
      this.weatherLoading = false;
    },
  },
  async created() {
    const ipAddress = await (
      await fetch("https://api64.ipify.org?format=json")
    ).json();
    this.selectedCity = ipAddress.ip;
    this.sendData();
    this.loadWeather();
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: lightblue;
  border-radius: 10px;
}

::placeholder {
  color: #777;
  opacity: .7;
}



.center-content {
  display: flex;
  justify-content: center;
}
.spinners {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 0 30px;
}
.spinners div {
  background-color: lightblue;
}
div.parent {
  margin: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("assets/images/backgrounds/back2.jpg");
  background-size: cover;
  backdrop-filter: blur(2px);
}
.content {
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: 100%;
  height: 100vh;
  background-color: rgba(48, 48, 48, 0.466);
  backdrop-filter: blur(5px);
}
@media (max-width: 1024px) {
  .content {
    border-radius: 15px;
    display: block;
    height: 85vh;
    width: 85%;
    padding-top: 20px;
    overflow: scroll;
    overflow-x: hidden;
  }
}
@media (max-width: 768px) {
  .content {
    height: 85vh;
    width: 85%;
  }
  div.main {
    margin-top: 50px;
  }
}
ul.links {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}
div.header section {
  position: absolute;
  width: 50%;
  left: 50%;
}
ul.search-res {
  list-style: none;
  width: 100%;
  border-radius: 10px;
  overflow: scroll;
  max-height: 200px;
  padding: 0 !important;
  overflow-x: hidden;
  background-color: #eee;
  position: relative;
  left: -50%;
  box-shadow: 0px 10px 32px -10px black;
}
ul.search-res li,
section p {
  font-size: 15px;
  font-weight: bold;
  padding: 7px 15px;
  box-shadow: 0px 5px 10px -10px black;
  transition: 0.3s;
}
ul.search-res li:hover {
  background-color: lightblue;
  cursor: pointer;
}
section p {
  background-color: #eee;
  color: tomato;
  border-radius: 20px;
  width: 100%;
  margin: 0;
  position: relative;
  left: -50%;
  top: 5px;
  border: dotted black 0px;
}

ul.search-res::-webkit-scrollbar {
  width: 15px;
  background-color: #ccc;
  border-radius: 20px;
}

ul.search-res::-webkit-scrollbar-thumb {
  background: dodgerblue;
  border-radius: 20px;
}
div.main {
  margin: 25px 0;
  width: 100%;
  gap: 0 20px;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
}
@media (max-width: 768px) {
  div.main {
    margin-top: 70px;
  }
}

div.header {
  display: flex;
  flex-direction: column;
  gap: 30px 0;
}
div.header h1 {
  text-align: center;
}

div.header input {
  border: none;
  margin-left: 20px;
  background-color: #eee;
  box-shadow: 0px 6px 12px -9px rgb(0, 0, 0);
  padding: 3px 15px;
  border-radius: 20px;
  outline: none;
  color: #2b2b2b;
  font-size: 20px;
  font-weight: 600px;
  width: 60%;
  height: 43px;
}
div.header i {
  position: relative;
  font-size: 20px;
  color: #777;
  top: 12px;
  right: 50px;
}
@media (max-width: 768px) {
  div.header input {
    width: 70%;
  }
}

nav {
  width: 100%;
}
nav ul {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  margin: 0;
  gap: 0 30px;
}
a,
a:hover {
  color: #fff !important;
  text-decoration: none !important;
  padding-bottom: 10px;
}
a:hover {
  text-decoration: none;
  color: lightblue !important;
}

.location {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 2px 0;
}
footer {
  margin-top: 20px;
}

.router-link-active {
  color: lightblue !important;
  text-decoration: none;
  border-bottom: 2px solid lightblue;
}
h5 {
  text-align: center;
  color: #ccc;
  font-size: 18px !important;
}
h1 {
  color: lightblue;
  font-weight: bold;
}
@media (max-width:1024px) {
  ::placeholder , i{
  font-size: 16px;
  font-weight: bold;
}
div.header input {
width: 80%;
}
}
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-enter-active {
  transition: all 0.3s ease-in;
}

.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.results-enter-active {
  transition: all 0.3s ease-out;
}
.results-leave-active {
  transition: all 0.3s ease-in;
}

.results-enter-to,
.results-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.results-leave-to,
.results-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
