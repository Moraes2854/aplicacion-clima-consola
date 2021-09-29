require('dotenv').config();

const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, leerInput, pause, inquirerMenuOpciones } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
console.clear();


const main = async() =>{
    let opt = '';
    let busquedas = new Busquedas();

    do{
        console.clear();
        opt=await inquirerMenu();

        if (opt.opcion == '1'){
            const termino = await leerInput('Ciudad:');
            const ciudades = await busquedas.ciudad(termino);
            const idSeleccionado = await inquirerMenuOpciones(ciudades);
            if (idSeleccionado!='0'){
            let lugarSeleccionado = {};
            Object.keys(ciudades).forEach((key)=>{if (ciudades[key].id == idSeleccionado) lugarSeleccionado=ciudades[key];})
            mostrarData(lugarSeleccionado, await busquedas.temperatura(lugarSeleccionado.latitud, lugarSeleccionado.longitud));
            busquedas.agregarBusqueda(lugarSeleccionado.nombre, lugarSeleccionado.latitud, lugarSeleccionado.longitud, lugarSeleccionado.id);
            guardarDB(busquedas.historial);
            }
        }
        if (opt.opcion == '2'){
            const idSeleccionadoHistorial= await inquirerMenuOpciones(busquedas.historial.reverse());
            busquedas.historial.reverse();  
            if (idSeleccionadoHistorial != '0'){
                let lugarSeleccionadoHistorial = {};
                Object.keys(busquedas.historial).forEach((key) =>{
                    if (busquedas.historial[key].id == idSeleccionadoHistorial) lugarSeleccionadoHistorial=busquedas.historial[key];
                })
                mostrarData(lugarSeleccionadoHistorial, await busquedas.temperatura(lugarSeleccionadoHistorial.latitud, lugarSeleccionadoHistorial.longitud));
            }
        }

        if (opt.opcion != '0') await pause();
    }while(opt.opcion != '0')

}

const mostrarData = (lugarSeleccionado, temperatura) =>{

    console.log('\n Información de la ciudad: \n'.green);
    console.log('Ciudad: ',lugarSeleccionado.nombre);
    console.log('Latidud: ',lugarSeleccionado.latitud);
    console.log('Longitud: ', lugarSeleccionado.longitud);
    console.log('Temperatura: ', temperatura.temp);
    console.log('Mínima: ', temperatura.temp_min);
    console.log('Máxima: ', temperatura.temp_max);


}

main();