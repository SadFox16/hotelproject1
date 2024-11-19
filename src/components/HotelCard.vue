<template>
    <div class="card">
        <div class="hotel_data">
            <h1>{{ card.name }}</h1>
            <p>{{ card.address }}</p>
            <p>{{ attrs }}</p>
            <div class="rating">
                <p class="rating_text">Рейтинг: {{ card.category_stars }} </p> 
                <img src="../../public/icons/star.png" class="star">
            </div>
        </div>
        <div class="hotel_photo">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" :src="card.photo" alt="Photo">
                    <!-- <img class="d-block w-100" src="img-cdn.kudanamore.ru/1NNAL_lPGTQeI4dudlq_J5lw_y0=/800x534/filters:no_upscale():quality(65):format(webp)/hotels/2602/3efa0d76a36b3dbbf98c6b84c2ee8044.jpg" alt="Photo"> -->
                    </div>
                    <div class="carousel-item" v-for="photo in this.photoUrls" v-bind:key="photo">
                        <img class="d-block w-100" :src="photo"  alt="Второй слайд">
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