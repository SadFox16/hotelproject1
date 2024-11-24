<template>
    <div class="card">
        <div class="hotel_data" v-for="el in this.hotelCard.hotelCard" v-bind:key="el">
            <h1 style="text-align: center;">{{ el.name }}</h1>
            <p style="text-decoration: underline; text-align: center;">Адрес: {{ el.address }}</p>
            <div class="row mb-3">
                <div class="col-4">
                    Особенности:
                    <ul v-for="serv in el.accomodation_services" v-bind:key="serv">
                        <li>{{ serv.service_category_name }}</li>
                    </ul>
                </div>
                <div class="col-8">
                    <carousel :items-to-show="1">
                        <slide v-for="img in this.hotelCard.images" :key="img">
                            <img class="d-block w-100" :src="img" alt="Слайд {{ img }}" >
                        </slide> 
                        <template #addons>
                            <navigation/>
                            <pagination/>
                        </template>
                    </carousel>
                </div>
            </div> 
            <div> Описание: {{ el.description }} </div> 
            <div class="rating">
                <p class="rating_text">Рейтинг: {{ el.reviews_rating}} </p> 
                <img src="../../public/icons/star.png" class="star">
            </div>
        </div>
        <router-link :to="'/'">
            <button type="button" class="btn btn-primary" style="width: 100%;">На главную</button>
        </router-link>
    </div>
</template>

<script>
import { useHotelStore } from '@/store/HotelsStore';
import { useAttributesStore } from '@/store/AttributesStore';
import { useHotelCardStore } from '@/store/HotelCardStore';
import { markRaw, toRaw } from 'vue';
import {useRoute} from "vue-router";

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    setup(){
        const allHotels = useHotelStore()
        const allAttributes = useAttributesStore()
        const hotelCard = useHotelCardStore()
        const route = useRoute();
        const id = route.params.id
        console.log('id:', id)
        return { allHotels, allAttributes, hotelCard, id }
    },
    data(){
        return{
            card: null,
            attrs: null,
        }
    },   
    mounted(){
        this.hotelCard.getHotelCard(this.id)
    },
}
</script>

<style>
.card{
    display: table;
    width: 1100px;
}

.hotel_data{
    display: table-cell;
}

.hotel_photo{
    display: table-cell;
}

.rating{
    display: flex;
}

.rating_text{
    padding-top: 4px;
    margin: 0px;
}

.star{
    width: 30px;
    height: 30px;
}
</style>