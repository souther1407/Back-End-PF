habitaciones:   post: "administrador" (hecho)
                patch: "administrador" (hecho)
                delete: "administrador" (hecho)
                get: sin seguridad (hecho)

camas:          post: "administrador" (hecho)
                patch: "administrador" (hecho)
                delete: "administrador" (hecho)
                get: sin seguridad (hecho)

usuarios:       get: "administrador", "recepcionista" (hecho)
                post: "administrador", "recepcionista", "cliente" (hecho)
                pach: "administrador", "recepcionista", "cliente" (hecho)
                delete: "administrador", "recepcionista", "cliente" (hecho)

reservas:       get: "administrador", "recepcionista", "cliente"  (hecho)
                post: "administrador", "recepcionista", "cliente" (hecho)
                pach: "administrador", "recepcionista" (hecho)
                delete: "administrador", "recepcionista", "cliente" (hecho)

imaganes:       get: "administrador", "recepcionista"
                post: "administrador"
                pach: "administrador", "recepcionista"
                delete: "administrador", "recepcionista"

nacionalidad:   get: "administrador"  
                post: "administrador"
                pach: "administrador"  
                delete: "administrador"

usuario default: {
        dni: "00000001",
        TipoDocumento:"dni",
        password: "admin 123",
        nombre: "admin",
        apellido: "admin",
        email: "admin@admin.com",
        fechaNacimiento:"01-01-1971",
        telefono:"0000000",
        direccion:"desconocido 100",
        Nacionalidad:"LotLoriem",
        genero:"masculino",
        rol:"administrador"
      }

