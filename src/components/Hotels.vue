<template>
        <span v-if="this.flag">
            <div v-for="el in getAllResult" v-bind:key="el.id" class="container">
                <div class="card" style="width: 18rem;">
                    <div class="card-body" v-for="item in getAllResult.items" v-bind:key="item.id">
                        <img src="../../public/Hotels images/photo.jpg" class="card-img-top" alt="Hotel image">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.address }}</p>
                        <ul v-for="attr in item.attributes" v-bind:key="attr">
                            <li>{{ getAttributeName(attr) }}</li>
                        </ul>
                        <button type="button" class="btn btn-primary" @click="this.openCard(item.id)">More info</button>
                    </div>
                </div>
            </div>
        </span>
        <span v-else>
            <HotelCard v-bind:id="idHotel"/>
        </span>
</template>

<script>
import { markRaw } from 'vue';
import HotelCard from './HotelCard.vue';

export default{
    components:{ 
        HotelCard 
    },
    props:{
        id: 0
    },
    data(){
        return{
            getAllResult: null,
            getAttributesResult: null,
            flag: true,
        }
    },
    methods:{
        async getAllData() {
            try {
                const res = await fetch(`https://kudanamore.softorium.pro/api/v1/accomodations`);
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result = {
                    data: data,
                };
                this.getAllResult = markRaw(data)
            } catch (err) {
                this.getResult = err.message;
            }
        },
        async getAttributesData(){
            try{
                const res = await fetch('https://kudanamore.softorium.pro/api/v1/accomodation-attributes')
                if(!res.ok){
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result = {};
                for(let key in data.items){
                    result[data.items[key].slug] = data.items[key] 
                }
                this.getAttributesResult = markRaw(result)
            } catch (err) {
                this.getResult = err.message;
            }
        },
        getAttributeName(slug){
            return this.getAttributesResult[slug].name 
        },
        openCard(id){
            this.idHotel = id
            this.flag = false
        }
    },
    mounted(){
        this.getAttributesData(),
        this.getAllData()
    },
}
</script>

<style>
.container{
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.card{
    width: 200px;
}

.card-body{
    border-style: double;
    margin: 20px;
    text-align: center;
}
</style>