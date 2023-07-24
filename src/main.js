import { createApp } from 'vue'
import WeatherItem from './components/WeatherItem.vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'animate.css'
import 'moment'

const app = createApp(App);
app.component('weather-item',WeatherItem)
app.use(router)
app.mount('#app')
app.use(store)
