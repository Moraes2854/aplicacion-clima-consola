const Busqueda = require('./models/busqueda');
const Busquedas = require('./models/busquedas');

console.clear();
const busquedas = new Busquedas();

busquedas.agregarBusqueda('Mar del plata', '1', '1', '2000');
busquedas.agregarBusqueda('Toronto', '1', '1', '2000');
busquedas.agregarBusqueda('Barcelona', '1', '1', '2000');
busquedas.agregarBusqueda('Madrid', '1', '1', '2000');
busquedas.agregarBusqueda('Lisboa', '1', '1', '2000');
busquedas.agregarBusqueda('Montevideo', '1', '1', '2000');


console.log(busquedas.historial.reverse());
//montevideo lisboa madrid barcelona toronto
console.log('agregamos busqueda');
busquedas.historial.reverse();
busquedas.agregarBusqueda('La mantanza', '1', '1', '2000');

console.log(busquedas.historial.reverse());
//la mantanza montevideo lisboa madrid barcelona