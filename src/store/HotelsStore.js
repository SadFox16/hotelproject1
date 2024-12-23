import { defineStore } from 'pinia';
import { markRaw, toRaw } from 'vue';

export const useHotelStore = defineStore('hotels', {
    state: () => ({
        hotels: null,
        total: null,
        pages: null,
        page: null,
        data: null
    }),
    actions:{
        async getHotelsData(page=1) {
            try {
                const params = new URLSearchParams({ page: page }).toString();
                const res = await fetch(`https://kudanamore.softorium.pro/api/v1/accomodations/?${params}`);
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                this.hotels = markRaw(data)
                this.total = this.hotels.total
                this.pages = this.hotels.pages
                this.page = this.hotels.page
            } catch (err) {
                this.getResult = err.message;
            }
        }
    }
})