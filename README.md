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
## GET:  / habitaciones /filter/withBathroom
- ### devuelve un array con las habitaciones que continen baño privado.
- ### NO recibe ningun tipo de dato, hace el filtrado de forma automatica.
---
## GET:  /habitaciones/filter?privada=true
- ### Devuelve un array con las habitaciones que son privadas o compartidas segun se envie por query. En caso de querer obtener habitaciones privadas se coloca en true, en caso de querer obtener las habitaciones compartidas se coloca en false.

---
## POST:  / habitaciones /
- ### Recibe por body todos los datos necesrios para crear una habitación.
```javascript
{
	"nombre": "Lunar",
  "comodidades": "Aire acondicionado, smart Tv, Frigobar",
  "cantCamas": 5,
  "privada": false,
  "bañoPrivado": false,
  "preciosCamas": [1500, 1500, 1500, 1200, 1000]
}
```
- ### Devuelve la Habitación creada.
---
## PATCH:  / habitaciones /:idHabitacion
- ### Recibe por params el id de la habitación a modificar.
- ### Recibe por body los datos de la habitación a modificar con sus detalles. Valores modificables: nombre, comodidades, cantCamas, privada, bañoPrivado, preciosCamas
- ### Si la cama se modifico retonar un array con el valor 1, en caso de que no se haya modificado retorna un array con el valor 0 indicando que no se modifico nada.
