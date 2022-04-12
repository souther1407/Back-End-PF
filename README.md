# Back-End-PF

### Peticiones y Rutas de la API

## GET:  / habitaciones
- ##### Entrega un array con ojetos cuya extructura varia segun el tipo de habirtacion.
- ##### Si es una habitacion individual el objeto tendra la forma:
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
- ##### Si es una habitacion compartida el objeto tendra la forma:
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
