# Back-End PF - Peticiones y Rutas de la API

## GET:  / habitaciones
- ### Entrega un array con ojetos cuya extructura varia segun el tipo de habitacion.
- ### Sí es una habitacion individual el objeto tendra la forma:
```javascript
    {
		"id": 1, 
		"nombre": "Imperio",
		"comodidades": "Aire acondicionado, smart Tv, Frigobar",
		"cantCamas": 5,
		"privada": true,
		"bañoPrivado": false,
		"createdAt": "2022-04-12T19:48:18.730Z" 
	}
```
- ### Sí es una habitacion compartida el objeto tendrá la forma:
```javascript
  {
      "id": 2,
      "nombre": "galaxia",
      "comodidades": "Aire acondicionado, smart Tv, Frigobar",
      "cantCamas": 2,
      "privada": false,
      "bañoPrivado": false,
      "createdAt": "2022-04-12T19:48:21.090Z",
      "Camas": [
        {
        "id": "d2a265c5-f5df-4358-96c0-7221192792bf",
          "precio": 1500,
          "estado": "libre",
          "HabitacionId": 2,
          "HuespedId": null,
          "ReservaId": null
        },
        {
          "id": "3349dda6-40eb-4047-bf8f-b75eb20ad6a9",
          "precio": 1500,
          "estado": "libre",
          "HabitacionId": 2,
          "HuespedId": null,
          "ReservaId": null
        }
      ]
    }
```
---
## GET:  / habitaciones /:idHabitacion
- ### Entrega un objeto con los datos de la habitación.
```javascript
{
	"id": 2,
	"nombre": "galaxia",
	"comodidades": "Aire acondicionado, smart Tv, Frigobar",
	"cantCamas": 2,
	"privada": false,
	"bañoPrivado": false,
	"createdAt": "2022-04-12T19:48:21.090Z",
	"Camas": [
		{
			"id": "d2a265c5-f5df-4358-96c0-7221192792bf",
			"precio": 1500,
			"estado": "libre",
			"HabitacionId": 2,
			"HuespedId": null,
			"ReservaId": null
		},
		{
			"id": "3349dda6-40eb-4047-bf8f-b75eb20ad6a9",
			"precio": 1500,
			"estado": "libre",
			"HabitacionId": 2,
			"HuespedId": null,
			"ReservaId": null
		}
	]
}
```
- ### En caso de una Habitación privada omite la pripiedad camas.
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
	"nombre": "Agua2",
  "comodidades": "Aire acondicionado, smart Tv, Frigobar",
  "cantCamas": 5,
  "privada": false,
  "banoPrivado": false,
  "preciosCamas": [150, 1500, 1200, 1000]
}

En caso de querer que todas las camas compartidas tengan el mismo precio 
"preciosCamas": [1500]

Habitación Privada:
se reemplaza "preciosCamas" por "precioHabitacion"
 
 "precioHabitacion": 1500
```

- ### Devuelve la Habitación creada.
---
## PATCH:  / habitaciones /:idHabitacion
- ### Recibe por params el id de la habitación a modificar.
- ### Recibe por body los datos de la habitación a modificar con sus detalles. Valores modificables: nombre, comodidades, cantCamas, privada, bañoPrivado, preciosCamas
- ### Si la cama se modifico retonar un array con el valor 1, en caso de que no se haya modificado retorna un array con el valor 0 indicando que no se modifico nada.

## GET:  / reservas?fecha_ingreso=2020-05-1
 devuelve las reservas hechas al hostel
 ### queries(todas opcionales): fecha_ingreso, debe ser YYYY-MM-DD, devuelve solo las que tengan como fecha de ingreso lo enviado por query
 ### ejemplo
 ```json
 [
  {
    "id": "72466aed-6e54-48b2-8f6c-c72f0bff36fc",
    "fecha_ingreso": "2025-03-01",
    "fecha_egreso": "2029-09-01",
    "saldo": 12409124809,
    "UsuarioId": "7a4d894a-3897-4424-b152-a51beb0dc7e4",
    "Camas": [
        {
          "id": "79634438-ecd9-476d-b441-04ffa7e7a44c",
          "precio": 300,
          "estado": "libre",
          "HabitacionId": 1,
          "HuespedId": null,
          "Reserva_Cama": {
              "createdAt": "2022-04-13T15:31:30.793Z",
              "updatedAt": "2022-04-13T15:31:30.793Z",
              "ReservaId": "72466aed-6e54-48b2-8f6c-c72f0bff36fc",
              "CamaId": "79634438-ecd9-476d-b441-04ffa7e7a44c"
            }
        }
     ]
  }
]
 ```
## GET /reservas/byFecha/?fecha_ingreso="2020-04-15"&fecha_egreso="2020-03-15"

## GET /reservas

## POST /reservas/:idUsuario