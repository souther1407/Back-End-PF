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
			"id": number,
			"imagen": string,
			"HabitacionId": number
		}, ...
	]
}, ...]
```
- ### Sí es una habitacion compartida el objeto tendrá la forma:
```javascript
  [{
	"id": number,
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
			"id": string,
			"precio": Number,
			"estado": String,
			"HabitacionId": string,
			"HuespedId": null
		}, ...
  ],
	"Imagens": [
		{
			"id": number,
			"imagen": string,
			"HabitacionId": number
		}, ...
	]
}, ...]
```
---
## GET:  / habitaciones /:idHabitacion
- ### Entrega un objeto con los datos de la habitación.
```javascript
{
	"id": number,
	"nombre": String,
	"comodidades": String,
	"descripcion": String,
	"cantCamas": Number,
	"privada": Boolean,
	"precio": Number,
	"banoPrivado": Boolean,
	"createdAt": "2022-04-15T13:00:26.870Z",
	"Camas": Array,
	"Imagens": [
		{
			"id": number,
			"imagen": string,
			"HabitacionId": number
		}, ...
	]
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
  "cantCamas": number,
  "privada": boolean,
  "banoPrivado": boolean,
  "preciosCamas": [1000],
	"descripcion": string,
	"imagenes": [string, string]
}

En caso de querer que todas las camas compartidas tengan el mismo precio 
"preciosCamas": [1500]

Habitación Privada:
se reemplaza "preciosCamas" por "precioHabitacion"
 
 "precioHabitacion": 1500
```
---
## DELETE: /habitaciones/:ID
- ### Recibe por query el id de la habitación a eliminar.
- ### devuelve la connfirmación del la habitacion eliminada.
---
## POST: /reservas
- ### RECIBE POR BODY ⬇️
```javascript	
	{
	"fecha_ingreso":"2022-01-10",
	"fecha_egreso":"2022-01-15",
	"camas":["5b920a51-0651-42f4-b72d-e18bb3f63ad4"],
	"habitaciones": [],
	"saldo": 100
}
```
- ### Devuelve:
```javascript
{
	"fecha_ingreso": "2022-01-10T00:00:00.000Z",
	"fecha_egreso": "2022-01-15T00:00:00.000Z",
	"id": "6bf29482-ed25-4a00-8dc0-88fcc33f5938",
	"saldo": number,
	"UsuarioDni": number
}
```
---
DELETE: /reservas/:ID
- ### Recibe por query el id de la reserva a eliminar.
- ### devuelve la connfirmación del la reserva eliminada.
---

## GET: /camas/:ID
- ### Recibe por query el id de la cama a consultar.
- ### Retorna el siguiente Objeto.
```javascript
{
	"id": "5b920a51-0651-42f4-b72d-e18bb3f63ad4",
	"precio": number,
	"estado": "libre",
	"nombre": string, // aun por implementar
	"HabitacionId": number,
	"HuespedDni": number
}
```
---
## GET: camas/
- ### devuelve un array de objetos donde muestra la infor de las camas.
```javascript
[{
	"id": "5b920a51-0651-42f4-b72d-e18bb3f63ad4",
	"precio": number,
	"estado": "libre",
	"nombre": string, // aun por implementar
	"HabitacionId": number,
	"HuespedDni": number
}, ...]
```
---
## POST: /camas
- ### Recibe por BODY: el precio de la cama a agregar, (en caso  de adicionar una cama a una habitacion privada el precio de ser 0) y HabitacionId corresponde al id de la habitacion a la cual se le va a agregar la cama.

```javascript
{precio: 12, HabitacionID:1}
```
- ### devuelve
```javascript
{
	"mensaje": "Cama Agregada a la Habitación con Id: 2"
}
```
---
## DELETE: /camas/
- ### Recibe por query el id de la cama a eliminar.

	?camaId=id de la cama a eliminar

- ### En caso de eliminar una cama de una habitacion privada recibe el id de la hbaitacion a la cual se le va a elimisr una cama.
	?habitacionid=id de la habitacion a la cual se le va a eliminar una cama.
---
## GET: /reservas 
- ### devuelve un array de objetos donde muestra la infor de las reservas.
```javascript
[
	// Reserva de una cama 
	{
		"fecha_ingreso": "2022-01-10T00:00:00.000Z",
		"fecha_egreso": "2022-01-15T00:00:00.000Z",
		"id": "6bf29482-ed25-4a00-8dc0-88fcc33f5938",
		"saldo": number, 
		"UsuarioDni": number,
		"Habitacions": [],
		"Camas": [
			{
				"HabitacionId": 3,
				"id": "5b920a51-0651-42f4-b72d-e18bb3f63ad4"
			}
		]
	},{
		// Reserva de una habitacion
		"fecha_ingreso": "2022-10-15T00:00:00.000Z",
		"fecha_egreso": "2022-10-20T00:00:00.000Z",
		"id": "a1d5e62d-3e06-4ebb-a6bc-a39575be713d",
		"saldo": number,
		"UsuarioDni": number,
		"Habitacions": [
			{
				"id": 2
			}
		],
		"Camas": []
	} ...
]
```
---
## GET: /reservas/disponibilidad/
- ### RECIBE POR QUERY: fecha_ingreso, fecha_egreso ⬇️

	? fecha_ingreso = 2022-01-01 & fecha_egreso = 2022-12-20

- ### Devuelve el siguiente array
```javascript
[
	{
		// Hbaitacion Compartida
		"idHabitacion": 3,
		"cantidadCamas": 5,
		"camasDisponible": 1,
		"camasDisponiblesIds": [
			"5b920a51-0651-42f4-b72d-e18bb3f63ad4"
		]
	},
	{
		// Habitacion Privada
		"idHabitacion": 7
	}, {...}
]
```	
---
### GET: /usuarios
- ### devuelve un array de objetos donde muestra la infor de los usuarios.
```javascript
[
	{
		"dni": string,
		"nombre": string,
		"apellido": string,
		"rol": "administrador",
		"telefono": string,
		"direccion": string,
		"email": string,
		"password": string, //Hasheado
		"genero": "masculino",
		"tokenRecuperacion": null,
		"createdAt": "2022-04-22T20:37:43.883Z",
		"NacionalidadeId": null,
		"TipoDocumentoId": null
	}
]
```
---
### POST: /usuarios
- ### Recibe por BODY:
```javascript
[
	{
		"dni": number,
		"nombre": string,
		"apellido": string,
		"telefono":number,
		"email": string,
		"password":string/number,
		"rol": "administrador",
		"fechaNacimiento": string,
		"TipoDocumento": number,
		"genero": "masculino"
	}
]
```
---