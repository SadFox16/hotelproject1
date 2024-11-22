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
                            Here
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



    <!-- </span> -->
        <!-- <span v-else class="hotel_card"> -->
            <!-- <HotelCard v-bind:card="card" v-bind:attrs="attrs"/> -->
        <!-- </span> -->


        <!-- <span v-if="this.flag" class="main">
            <div v-for="el in getAllResult" v-bind:key="el.id" class="container">
                <div class="card">
                    <div class="card-body" v-for="item in getAllResult.items" v-bind:key="item.id">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">Адрес: {{ item.address }}</p>
                        <div class="row mb-3">
                            <div class="col-4">
                                <ul v-for="attr in item.attributes" v-bind:key="attr" class="attrs">
                                    <li>{{ getAttributeName(attr) }}</li>
                                </ul>
                            </div>
                            <div class="col-8">
                                <img :src="item.photos[0]" class="img-fluid" alt="Hotel image">
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="this.openCard(item.id)">More info</button>
                        <router-link to="/hotelcard/:id">
                            <button type="button" class="btn btn-primary" @click="this.openCard(item.id)">More info</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div>
            <ul>
                <li v-for="p in paginatedData" v-bind:key="p">
                {{p.first}} 
                {{p.last}}  
                {{p.suffix}}
                </li>
            </ul>
            <button @click="prevPage">
                Previous 
            </button>
            <button @click="nextPage">
                Next
            </button>
        </div>
        </span>
        <span v-else class="hotel_card">
            <HotelCard v-bind:card="card" v-bind:attrs="attrs"/>
        </span> -->
</template>

<script>
import { markRaw, toRaw } from 'vue';
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
    width: 100%;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
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
    /* display: grid;
    grid-template-columns: 2; */
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