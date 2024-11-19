<template>
    <div class="card">
        <div class="hotel_data">
            <h1>{{ card.name }}</h1>
            <p>{{ card.address }}</p>
            <div class="hotel_photo">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" :src="card.photos[0]" alt="Photo">
                    </div>
                    <div class="carousel-item" v-for="photo in this.photoUrls" v-bind:key="photo">
                        <img class="d-block w-100" :src="card.photos[1]"  alt="Второй слайд">
                    </div>
                    <div class="carousel-item" v-for="photo in this.photoUrls" v-bind:key="photo">
                        <img class="d-block w-100" :src="card.photos[2]"  alt="Второй слайд">
                    </div>
                    <div class="carousel-item" v-for="photo in this.photoUrls" v-bind:key="photo">
                        <img class="d-block w-100" :src="card.photos[3]"  alt="Второй слайд">
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
                <li>{{ attr }}</li>
            </ul>
            <div class="rating">
                <p class="rating_text">Рейтинг: {{ card.category_stars }} </p> 
                <img src="../../public/icons/star.png" class="star">
            </div>
        </div>
    </div>
</template>

<script>
import { markRaw } from 'vue';

export default {
    props: ['card', 'attrs'],
    data(){
        return{
            photoUrls: null
        }
    },
    methods:{
        getPhotoUrls(){
            this.photoUrls = markRaw(this.card.photos)
        },
    },
    mounted(){
        this.getPhotoUrls()
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