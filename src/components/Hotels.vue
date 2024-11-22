<template>
    <div>
        <div v-for="hotel in this.allHotels.hotels" v-bind:key="hotel">
            <div v-for="item in hotel" v-bind:key="item">
                <div class="card" v-if="item.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">Адрес: {{ item.address }}</p>
                        <div class="row mb-3">
                            <div class="col-4">
                                <ul v-for="attr in item.attributes" v-bind:key="attr" class="attrs">
                                    <li>{{ getAttributeName(attr) }}</li>
                                </ul>
                            </div>
                            <div class="col-8" v-for="(photo, index) in item.photos" v-bind:key="photo">
                                <img :src="photo" class="img-fluid" alt="Hotel image" v-if="index==0">
                            </div>
                        </div>
                        <router-link :to="'/hotelcard/' + item.id">
                            <button type="button" class="btn btn-primary" style="width: 100%;">More info</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <button @click="prevPage" v-if="flag1">
            Previous 
        </button>
        <button @click="nextPage" v-if="flag2">
            Next
        </button>
    </div>
</template>

<script>
import HotelCard from './HotelCard.vue';
import { useHotelStore } from '@/store/HotelsStore';
import { useAttributesStore } from '@/store/AttributesStore';

export default{
    setup(){
        const allHotels = useHotelStore()
        const allAttributes = useAttributesStore()
        return { allHotels, allAttributes }
    },
    components:{ 
        HotelCard 
    },
    data(){
        return{
            getAllResult: null,
            getAttributesResult: null,
            flag1: false,
            flag2: true,
            card: null,
            attrs: [],
            pageNumber: 1,
            firstPhotoUrl: ''
        }
    },
    methods:{
        nextPage(){
            this.pageNumber++
            this.allHotels.getHotelsData(this.pageNumber)
            if(this.pageNumber <= this.allHotels.pages){
                this.flag1 = true
            }else if(this.allHotels.pages > 2){
                this.flag1 = true
                this.flag2 = true
            }else{
                this.flag1 = true
                this.flag2 = false
            }
        },
        prevPage(){
            this.pageNumber--
            this.allHotels.getHotelsData(this.pageNumber)
            if(this.pageNumber == 1){
                this.flag1 = false
                this.flag2 = true
            }else{
                this.flag1 = true
                this.flag2 = true
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
.main{
    width: 100%;
    height: 100%;
    margin-left: 350px;
}

.container{
    padding: 0px;
    margin: 0px;
    /* width: 100%;
    display: flex;
    align-items: center; */
}

.card{
    display: flex;
}

.card-title{
    text-align: center;
}

.card-text{
    text-align: center;
}

.card-body{
    border-style: double;
    margin: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex: 2;
}

.card-text{
    text-decoration: underline;
}

.attrs_list{
    flex: 1;
    max-width: 33.33%;
}

.attrs{
    width: 300px;
}

.card_photo{
    flex: 1;
    max-width: 33.33%;
}

.hotel_card{
    width: 100%;
    height: 100%;
}
</style>