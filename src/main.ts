import Vue, { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'
import './assets/styles/style.css'

createApp(App).use(store).use(router).mount('#app')
