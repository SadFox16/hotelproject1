import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { Carousel3d } from 'vue-carousel-3d';
import App from './App.vue'
import Hotels from './components/Hotels.vue'
import HotelCard from './components/HotelCard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Hotels},
        {path: '/hotelcard/:id', component: HotelCard},
    ],
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Carousel3d)
app.mount('#app')
// createApp(App).mount('#app')
