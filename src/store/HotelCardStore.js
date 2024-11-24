import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export const useHotelCardStore = defineStore('hotelCard', {
    state: () => ({
        hotelCard: null,
        images: []
    }),
    actions:{
        async getHotelCard(id){
            try{
                const res = await fetch(`https://kudanamore.softorium.pro/api/v1/accomodations/${id}/`);
                if(!res.ok){
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                this.hotelCard = markRaw(data)
                for(let el in this.hotelCard.item.media){
                    this.images.push(this.hotelCard.item.media[el].images['XL_webp'])
                }
            } catch (err) {
                this.getResult = err.message;
            }
        }
    }
})