<template>
    <div class="card">
            {{ this.getCard($route.params.id) }}
        <div class="hotel_data">
            <h1 style="text-align: center;">{{ this.card.name }}</h1>
            <p style="text-decoration: underline; text-align: center;">Адрес: {{ this.card.address }}</p>
            <div class="row mb-3">
                <div class="col-4">
                    <ul v-for="attr in attrs" v-bind:key="attr">
                        <li>{{ this.getAttributeName(attr) }}</li>
                    </ul>
                </div>
                <carousel :items-to-show="1.5" class="col-8">
                    <slide v-for="(slide, index) in this.card.photos" :key="slide">
                        <img class="d-block w-100" :src="slide" alt="Первый слайд" v-if="index==0">
                        <img class="d-block w-100" :src="slide" alt="Второй слайд" v-if="index==1">
                        <img class="d-block w-100" :src="slide" alt="Третий слайд" v-if="index==2">
                        <img class="d-block w-100" :src="slide" alt="Четвертый слайд" v-if="index==3">
                        <img class="d-block w-100" :src="slide" alt="Пятый слайд" v-if="index==4">
                    </slide>
                    <template #addons>
                    <navigation />
                    <pagination />
                    </template>
                </carousel>
            </div>  
            <div class="rating">
                <p class="rating_text">Рейтинг: {{ this.card.reviews_rating}} </p> 
                <img src="../../public/icons/star.png" class="star">
            </div>
        </div>
        <router-link :to="'/'">
            <button type="button" class="btn btn-primary" style="width: 100%;">Back to main</button>
        </router-link>
    </div>
</template>

<script>
import { useHotelStore } from '@/store/HotelsStore';
import { useAttributesStore } from '@/store/AttributesStore';
import { markRaw, toRaw } from 'vue';

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
        return { allHotels, allAttributes }
    },
    data(){
        return{
            card: null,
            attrs: null
        }
    },
    methods:{
      getCard(id){
        for(let el in this.allHotels.hotels){
            let hotels = this.allHotels.hotels
            let items = hotels.items
            for(let i of items){
                if( i.id == id){
                    this.card = markRaw(i)
                    this.attrs = markRaw(i.attributes)
                }
            }
        }
      },
      getAttributeName(slug){
            return this.allAttributes.attributes[slug].name 
        }
    },
    mounted(){
        this.allHotels.getHotelsData()
        this.allAttributes.getAttributesData()
    }
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