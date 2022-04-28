const {DateTime} = require('luxon')

const fecha_ingreso = '2022-06-01';
const fecha_egreso = '2022-06-10';
const inUnix = Date.parse(fecha_ingreso)/100;
const outUnix = Date.parse(fecha_egreso)/100;

const dia = Date.now()
let diastr = Date.parse(dia)

//const pele = DateTime.fromFormat(fecha_ingreso, 'MM DD YYYY')
const ahora = (Date.parse(fecha_ingreso)/1000)+



console.log('ingreso normal',fecha_ingreso )
console.log('ingreso unix',inUnix )
console.log('egreso normal',fecha_egreso )
console.log('egreso unix',outUnix )

console.log(dia)
console.log(diastr)