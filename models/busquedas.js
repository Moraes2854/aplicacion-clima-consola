const axios = require('axios').default;
const Busqueda = require('./busqueda');
const { leerDB } = require('../helpers/guardarArchivo');

require('dotenv').config();
class Busquedas{
    historial=[];

    constructor(){

        if(leerDB()){
            let aux = JSON.parse(leerDB());
            Object.keys(aux).forEach((key) =>{
                this.historial.push(aux[key]);
            });
        }
    }
    agregarBusqueda(nombre, latitud, longitud, id){
        const busqueda = new Busqueda(id, nombre, latitud, longitud);
        if (this.historial.length<5)this.historial.push(busqueda);
        else{
            this.historial.shift();
            this.historial.push(busqueda);
        }
    }
    get historial(){
        return this.historial;
    }
    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    async ciudad (lugar = ''){
        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });
            let resp= await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            }));
                
        } catch (error) {
            console.log({error});
        }


    }

    async temperatura(latitud, longitud){

        try {
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat: latitud,
                    lon: longitud,
                    appid: process.env.OPENWEATHER_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });

            let resp= await instance.get();

            return resp.data.main;

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Busquedas;