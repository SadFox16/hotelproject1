import { defineStore } from 'pinia';

export const useAttributesStore = defineStore('attributes', {
    state: () => ({
        attributes: null
    }),
    actions:{
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
                this.attributes = result
                // console.log(this.attributes)
            } catch (err) {
                this.getResult = err.message;
            }
        }
    }
})