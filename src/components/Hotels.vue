<template>
        <span v-if="this.flag" class="main">
            <div v-for="el in getAllResult" v-bind:key="el.id" class="container">
                <div class="card">
                    <div class="card-body" v-for="item in getAllResult.items" v-bind:key="item.id">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">Адрес: {{ item.address }}</p>
                        <div class="attrs_list">
                            <ul v-for="attr in item.attributes" v-bind:key="attr" class="attrs">
                                <li>{{ getAttributeName(attr) }}</li>
                            </ul>
                        </div>
                        <div class="card_photo">
                            <!-- как фотку то первую вывести????? -->
                            <img :src="el.photos" class="card-img-top" alt="Hotel image">
                            <!-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
                        </div>
                        <button type="button" class="btn btn-primary" @click="this.openCard(item.id)">More info</button>
                    </div>
                </div>
            </div>
        </span>
        <span v-else class="hotel_card">
            <HotelCard v-bind:card="card" v-bind:attrs="attrs"/>
        </span>
</template>

<script>
import { markRaw, toRaw } from 'vue';
import HotelCard from './HotelCard.vue';

export default{
    components:{ 
        HotelCard 
    },
    data(){
        return{
            getAllResult: null,
            getAttributesResult: null,
            flag: true,
            card: null,
            attrs: []
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
            for(let item of this.getAllResult.items){
                if(item.id == id){
                    this.card = markRaw(item)
                    for(let attr in item.attributes){
                        for(let el in this.getAttributesResult){
                            if(item.attributes[attr] == this.getAttributesResult[el].slug){
                                this.attrs.push(this.getAttributesResult[el].name)
                            }
                        }   
                    } 
                }
            }
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