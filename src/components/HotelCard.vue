<template>
    <div class="card">
            {{ this.getCard($route.params.id) }}
            {{ this.card.name }}
        <div class="hotel_data">
            <h1>{{ this.card.name }}</h1>
            <p>{{ this.card.address }}</p>
                    <div class="hotel_photo" v-for="(photo, index) in this.card.photos" v-bind:key="photo">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" :src="photo[index]" alt="Photo">
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>  
            <ul v-for="attr in attrs" v-bind:key="attr">
                <li>{{ this.getAttributeName(attr) }}</li>
            </ul>
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

export default {
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
    /* display: flex;
    justify-content: space-around;
    align-items: baseline; */
    display: table;
    width: 1100px;
    /* display: inline-block; */
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