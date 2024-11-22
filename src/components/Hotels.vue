<template>
    <div>
        <!-- {{ this.allHotels }} -->
          <!-- {{ this.allHotels.hotels.pages }} -->
            <!-- {{ this.allHotels.hotels }} -->
            Pages: {{ this.allHotels.pages }}
           Page  {{ this.allHotels.page }}
            Total {{ this.allHotels.total }}
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
                            <!-- <div> {{item}} </div> -->
                            <div class="col-8" v-for="(photo, index) in item.photos" v-bind:key="photo">
                                <img :src="photo" class="img-fluid" alt="Hotel image" v-if="index==0">
                                <!-- <img class="img-fluid" alt="Hotel image"> -->
                                <!-- <img :src="getFirsrPhotoUrl(item)" class="img-fluid" alt="Hotel image"> -->
                            </div>
                        </div>
                        <router-link :to="'/hotelcard/' + item.id">
                        <!-- <router-link to="/hotelcard/:item.id"> -->
                            Here
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="p in paginatedData" v-bind:key="p">
            {{p.first}} 
            {{p.last}}  
            {{p.suffix}}
            </li>
        </ul>
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

// const allHotels = useHotelStore()
// const allAttributes = useAttributesStore()

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
            flag1: null,
            flag2: true,
            card: null,
            attrs: [],
            pageNumber: 1,
            firstPhotoUrl: ''
        }
    },
    // props:{
    //     size:{
    //         type:Number,
    //         required:false,
    //         default: 10
    //     }
    // },
    // computed:{
    //     getFirsrPhotoUrl(item){
    //         // let photoUrls = toRaw(item.photos)
    //         console.log(item.photos)
    //         // let firstPhotoUrl = ''
    //         // console.log(photoUrls)
    //         // console.log(item.photos)
    //         // for(let photo in item.photos){
    //         //     firstPhotoUrl = photo[0]
    //         //     // console.log(firstPhotoUrl)
    //         // }
    //         firstPhotoUrl = item.photos.slice(0,1)
    //         console.log(firstPhotoUrl)
    //         // return firstPhotoUrl
    //     },
    // },
    methods:{
        nextPage(){
            // добавить проверку на превышение pages
            if(this.pageNumber <= this.allHotels.pages){
                this.pageNumber++
                this.allHotels.getHotelsData(this.pageNumber)
            }else if(this.allHotels.pages > 2){
                this.flag1 == true
            }else{
                this.flag2 == false
            }
        },
        prevPage(){
            if(this.pageNumber = 1){
                this.flag1 == false
            }else{
                this.pageNumber--
                this.allHotels.getHotelsData(this.pageNumber)
                this.flag1 == true
                this.flag2 == false
            }
        },
        // async getAllData() {
        //     try {
        //         const res = await fetch(`https://kudanamore.softorium.pro/api/v1/accomodations`);
        //         if (!res.ok) {
        //             const message = `An error has occured: ${res.status} - ${res.statusText}`;
        //             throw new Error(message);
        //         }
        //         const data = await res.json();
        //         const result = {
        //             data: data,
        //         };
        //         this.getAllResult = markRaw(data)
        //         this.hotels = data
        //         // console.log(this.hotels)
        //     } catch (err) {
        //         this.getResult = err.message;
        //     }
        // },
        // async getAttributesData(){
        //     try{
        //         const res = await fetch('https://kudanamore.softorium.pro/api/v1/accomodation-attributes')
        //         if(!res.ok){
        //             const message = `An error has occured: ${res.status} - ${res.statusText}`;
        //             throw new Error(message);
        //         }
        //         const data = await res.json();
        //         const result = {};
        //         for(let key in data.items){
        //             result[data.items[key].slug] = data.items[key] 
        //         }
        //         this.getAttributesResult = markRaw(result)
        //         this.attributes = result
        //         // console.log(this.attributes)
        //     } catch (err) {
        //         this.getResult = err.message;
        //     }
        // },
        getAttributeName(slug){
            return this.allAttributes.attributes[slug].name 
        },
        // openCard(id){
        //     for(let item of this.getAllResult.items){
        //         if(item.id == id){
        //             this.card = markRaw(item)
        //             for(let attr in item.attributes){
        //                 for(let el in this.getAttributesResult){
        //                     if(item.attributes[attr] == this.getAttributesResult[el].slug){
        //                         this.attrs.push(this.getAttributesResult[el].name)
        //                     }
        //                 }   
        //             } 
        //         }
        //     }
        //     this.flag = false
        // }
    },
    mounted(){
        // this.getAllData(),
        // this.getAttributesData(),
        this.allHotels.getHotelsData()
        this.allAttributes.getAttributesData()
    }
    // computed:{
    //     paginatedData(){
    //         const start = this.pageNumber * this.size,
    //         end = start + this.size;
    //         // return this.getAllResult.slice(start, end);
    //     }
    // }
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