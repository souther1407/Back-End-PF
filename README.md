# Back-End PF - Peticiones y Rutas de la API
## GET:  / habitaciones
- ### Entrega un array con ojetos cuya extructura varia segun el tipo de habitacion.
- ### Sí es una habitacion individual el objeto tendra la forma:
```javascript
    [{
	"id": 1,
	"nombre": String,
	"comodidades": String,
	"descripcion": String,
	"cantCamas": Number,
	"privada": Boolean,
	"precio": Number,
	"banoPrivado": Boolean,
	"createdAt": "2022-04-15T13:00:26.870Z",
	"Camas": Array Vacio,
	"Imagens": [
		{
			"id": 1,
			"imagen": "https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png",
			"HabitacionId": 1
		}, ...
	],
	"Reservas": []
}, ...]
```
- ### Sí es una habitacion compartida el objeto tendrá la forma:
```javascript
  [{
	"id": 1,
	"nombre": String,
	"comodidades": String,
	"descripcion": String,
	"cantCamas": Number,
	"privada": Boolean,
	"precio": Number,
	"banoPrivado": Boolean,
	"createdAt": "2022-04-15T13:00:26.870Z",
	"Camas": [
    {
			"id": "ca8f3891-3f6d-4bcb-ac08-f6dfb3eec7b7",
			"precio": Number,
			"estado": String,
			"HabitacionId": 1,
			"HuespedId": null
		}, ...
  ],
	"Imagens": [
		{
			"id": 1,
			"imagen": "https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png",
			"HabitacionId": 1
		}, ...
	],
	"Reservas": []
}, ...]
```
---
## GET:  / habitaciones /:idHabitacion
- ### Entrega un objeto con los datos de la habitación.
```javascript
{
	"id": 1,
	"nombre": String,
	"comodidades": String,
	"descripcion": String,
	"cantCamas": Number,
	"privada": Boolean,
	"precio": Number,
	"banoPrivado": Boolean,
	"createdAt": "2022-04-15T13:00:26.870Z",
	"Camas": Array Vacio,
	"Imagens": [
		{
			"id": 1,
			"imagen": "https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png",
			"HabitacionId": 1
		}, ...
	],
	"Reservas": []
}
```
- ### En caso de una Habitación privada la propiedad cama es un array vacio.
---
## GET: /habitacionestipo?tipo=compartida&bano=compartido
- ### Recibe por query el tipo de habitación a buscar.
tipo : compartida | privada
- ### Recibe por query el si la habitacion posee baño privado o no
bano : compartido | privado
- ### Puede recibir ambos parametros y realizar una busqueda anidada o solo uno y realizar una busqueda simple.
---
## POST: /habitaciones
- ### Recibe por body todos los datos necesarios para crear una habitación.

```javascript
Datos a recibir por BODY.
-------------------------

Habitación compartida:

{
	"nombre": String,
  "comodidades": String,
  "cantCamas": 5,
  "privada": false,
  "banoPrivado": false,
  "preciosCamas": [1000],
	"descripcion": "soy la descripcion",
	"imagenes": ["https://media-cdn.tripadvisor.com/media/photo-s/16/af/28/82/dormitorio-de-12-camas.jpg", "https://pix10.agoda.net/hotelImages/285046/-1/5dc1a6d87c68b8ecc5528eff4c29c0ab.jpg?ca=7&ce=1&s=1024x768"]
}

En caso de querer que todas las camas compartidas tengan el mismo precio 
"preciosCamas": [1500]

Habitación Privada:
se reemplaza "preciosCamas" por "precioHabitacion"
 
 "precioHabitacion": 1500
```
---