/**
 * @swagger
 * components:
 *  securitySchemes:
 *   ApiKeySecurity:
 *     type: apiKey
 *     in: header
 *     name: api
 *   Token:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT 
 */

// SCHEMA DE USUARIOS
/**
 *  @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: nombre del usuario
 *        lastname:
 *          type: string
 *          description: apellido del usuario
 *        typeofdocument:
 *          type: string
 *          description: clase de identificador
 *        dni:
 *          type: string
 *          description: identificacion numerica del usuario
 *        password:
 *          type: string
 *          description: password del usuario
 *          minLength: 8
 *          maxLength: 20
 *        email:
 *          type: string
 *          description: email valido del usuario
 *          format: email
 *        fechaNacimiento:
 *          type: string
 *          description: formato ISO de tipo YYYY/MM/DD
 *          format: date
 *        nationality:
 *          type: string
 *          description: nacionalidad del usuario
 *        telefono:
 *          type: integer
 *          description: numero de telefono de contacto del usuario
 *        direccion:
 *          type: string
 *          description: direccion real del usuario
 *        genre:
 *          type: string
 *          description: genero del usuario
 *        role:
 *          type: string
 *          description: rol en la api del usuario
 *      required:
 *        - dni
 *        - typeofdocument
 *        - name
 *        - lastname
 *        - password
 *        - email
 *        - genre
 *        - birthdate
 *      example: 
 *       #
 *       #
 *        dni: "12345678"
 *        tipoDocumento: DNI
 *        name: "Juan"
 *        lastname: "Perez"
 *        email: juan@gmail.com
 *        password: "12345678"
 *        birthdate: 1991-09-19
 *        genre: "masculino"
 * */

// GET USUARIO
/**
 * @swagger
 * path:
 * /usuarios:
 *  get:
 *    summary: Retorna una lista de todos los usuarios
 *    tags: [Usuario]
 *    security:
 *     - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: array de usuarios
 *         content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Usuario'
 *    
 *    401: 
 *     description: "Error: Unauthorized"
 */

// GET USUARIO POR ID
/**
 * @swagger
 * path:
 * /usuarios/{dni}:
 *  get:
 *    summary: Retorna un usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: dni   
 *        required: true
 *        schema:
 *          type: integer
 *        description: el dni del usuario
 *    security:
 *     - ApiKeySecurity: []
 *       Token: []
 *    responses:
 *      200:
 *         description: devuelve un usuario
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Usuario'
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 *      404:
 *         description: usuario no encontrado
 *
 */

// POST USUARIO
/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *    security:
 *     - ApiKeySecurity: []
 *    responses:
 *      200:
 *        description: Retorna el usuario creado, un un Json
 *      201:
 *        description: devuelve el usuario creado
 *      400:
 *        description: El usuario no pudo ser creado
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 */

// DELETE USUARIO POR ID
/**
 * @swagger
 * path:
 * /usuarios/{dni}:
 *  delete:
 *    summary: Elimina un usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: dni   
 *        required: true
 *        schema:
 *          type: integer
 *        description: Se pasa el dni del usuario
 *    security:
 *     - ApiKeySecurity: []
 *       Token: []
 *    responses:
 *      201:
 *         description: devuelve el dni del usuario eliminado
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Usuario'
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 *      404:
 *        description: usuario no encontrado
 *
 */


// SCHEMA DE RESERVAS
/**
 *  @swagger
 * components:
 *  schemas:
 *    Reserva:
 *      type: object
 *      properties:
 *        fecha_ingreso:
 *          type: string
 *          description: Fecha en la que el usuario ingresa al Hostel, Formato yyyy/mm/dd
 *        fecha_egreso:
 *          type: string
 *          description: Fecha en la que el usuario se retira del Hostel, Formato yyyy/mm/dd
 *        saldo:
 *          type: integer
 *          description: Valor que abona el Usuario
 *        camas:
 *          description: Array con los IDs de las camas a reservar
 *          type: array
 *        Habitaciones: 
 *          description: Array con los IDs de las habitaciones privadas a reservar
 *          type: array
 *      required:
 *        - fecha_ingreso
 *        - fecha_egreso
 *        - saldo
 *      example: 
 *       # 
 *       # 
 *        fecha_ingreso: 2022-05-18
 *        fecha_egreso: 2022-05-30
 *        saldo: 6500
 *        camas: ['5dsd54-15d','da45-41dsd153']
 *        habitaciones: ['1', '6']
 * */
// GET RESERVAS
/**
 * @swagger
 * path:
 * /reservas:
 *  get:
 *   summary: Retorna una lista de todos las reservas
 *   tags: [Reserva]
 *   security:
 *    - ApiKeySecurity: []
 *      Token: []
 *   responses:
 *     200:
 *       description: Array de reservas
 *       content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Reserva'
 *     401:
 *        description: El usuario no tiene los permisos necesarios
 */

// GET RESERVAS POR FECHAS
/**
 * @swagger
 * path:
 * /reservas/?:
 *  get:
 *    summary: Retorna las reservas en un rango de fecha determinado
 *    tags: [Reserva]
 *    parameters:
 *      - in: query
 *        name: fecha_ingreso   
 *        required: true
 *        schema:
 *          type: string
 *          description: fomato yyyy-mm-dd
 *      - in: query
 *        name: fecha_egreso   
 *        required: true
 *        schema:
 *          type: string
 *          description: fomato yyyy-mm-dd
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *       200:
 *         description: Devuelve un array con las reservas en esa fecha
 *         content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Reserva'
 *       401: 
 *         description: "Error: Unauthorized"
 *
 */


// SCHEMA DE DISPONIBILIDAD
/**
 *  @swagger
 * components:
 *  schemas:
 *    Disponibilidad:
 *      type: object
 *      properties:
 *        idHabitacion:
 *          type: integer
 *          description: Id de la Habitacion a detallar
 *          example: 2
 *        cantidadCamas:
 *          type: integer
 *          description: Cantidad de camas que posee la habitación
 *          example: 5
 *        camasDisponible:
 *          example: 3
 *          type: integer
 *          description: Cantidad de camas disponibles
 *        camasDisponiblesIds: 
 *          type: objet
 *          description: Objeto con nombre y id de las cama disponible
 *          example:
 *              camaNombre: Cama 5 de la Habitacion Imperial
 *              camaId: 74d9d204-c32d-44c4-8164-a062b2978f5f
 *              
 * */

// GET DISPONIBILIDAD POR FECHAS
/**
 * @swagger
 * path:
 * /reservas/disponibilidad/?:
 *  get:
 *    summary: Retorna las reservas en un rango de fecha determinado
 *    tags: [Disponibilidad]
 *    parameters:
 *      - in: query
 *        name: ingreso   
 *        required: true
 *        schema:
 *          type: string
 *          description: fomato yyyy-mm-dd
 *      - in: query
 *        name: egreso   
 *        required: true
 *        schema:
 *          type: string
 *          description: fomato yyyy-mm-dd
 *    responses:
 *       200:
 *         description: Devuelve un array con las camas disponibles y los detalles necesarios
 *         content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Disponibilidad'
 *       401: 
 *         description: "Error: Unauthorized"
 *
 */

// POST RESERVA
/**
 * @swagger
 * path:
 * /reservas:
 *  post:
 *    summary: Crea una nueva reserva
 *    tags: [Reserva]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Reserva'           
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *      200:
 *        description: Retorna la reserva creada, un un Json
 *      400:
 *        description: Reserva no pudo ser creada
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 */

// DELETE RESERVA POR ID
/**
 * @swagger
 * path:
 * /reservas/{id}:
 *  delete:
 *    summary: Elimina una reserva
 *    tags: [Reserva]
 *    parameters:
 *      - in: path
 *        name: id   
 *        required: true
 *        schema:
 *          type: string
 *        description: Se pasa el id de la reserva a eliminar
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *       201:
 *         description: Retora la confirmacion de eliminacion
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: El usuario no tiene los permisos necesarios
 *       404:
 *         description: usuario no encontrado
 *
 */

// SCHEMA DE HABITACION
/**
 *  @swagger
 * components:
 *  schemas:
 *    Habitación:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: nombre de la habbiatación
 *        comodidades:
 *          type: string
 *          description: Comodidades que posee la habitación
 *        cantCamas:
 *          type: integer
 *          description: Cantidad de camas que posee la habitación.
 *        privada:
 *          type: boolean
 *          description: Indica si la habitación es privada o no
 *        banoPrivado:
 *          type: string
 *          description: Indica si la habitación tiene bano privado o no
 *        precioHabitacion:
 *          type: integer
 *          description: En caso de ser habitación privada, indica el precio de la habitación
 *        preciosCamas:
 *          type: array
 *          description: En un array se coloca el precio de una sola cama en caso de que todas posean el mismo precio, en caso de que tengan el precio diferente deberán color dentro del array el precio de cada una de las camas
 *        descripcion:
 *          type: string
 *          description: Indica detalles importantes que deben ser considerados al momento de reservar la habitación
 *        imagenes:
 *          type: array
 *          description: Array con las URL de las imagenes que desea colocar para la habitación
 *      required:
 *        - nombre
 *        - comodidades
 *        - cantCamas
 *        - privada
 *        - banoPrivado
 *        - descripcion
 *      example: 
 *       #
 *       #
 *         nombre: "Habitación Ejemplo"
 *         comodidades: "Aire acondicionado, smart Tv, Frigobar"
 *         cantCamas: 2
 *         privada: false
 *         banoPrivado: false
 *         descripcion: "soy la descripcion"
 *         preciosCamas: [10]
 *         imagenes: ["https://hqbeds.com/wp-content/uploads/2019/11/hostel1-e1573156979842.jpg", "https://media-cdn.tripadvisor.com/media/photo-s/16/af/28/82/dormitorio-de-12-camas.jpg", "https://hqbeds.com/wp-content/uploads/2019/11/hostel1-e1573156979842.jpg", "https://media-cdn.tripadvisor.com/media/photo-s/16/af/28/82/dormitorio-de-12-camas.jpg"]
 *      
 * */


// GET HABITACIONES
/**
 * @swagger
 * path:
 * /habitaciones:
 *  get:
 *    summary: Retorna una lista de todos las Habitaciones
 *    tags: [Habitación]           
 *    security:
 *      - ApiKeySecurity: []
 *    responses:
 *      200:
 *         description: Retorna una array con las habitaciones que posee el Hostel
 *         content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Habitación'
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 */

// GET HABITACION POR ID
/**
 * @swagger
 * path:
 * /habitaciones/{id}:
 *  get:
 *    summary: Retorna una habitación
 *    tags: [Habitación]
 *    parameters:
 *      - in: path
 *        name: id   
 *        required: true
 *        schema:
 *          type: integer
 *        description: Recibe el id de la habitación a buscar
 *    responses:
 *       200:
 *         description: devuelve una habitación
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Habitación'
 *       404:
 *         description: Habitación no encontrada
 *
 */

// POST HABITACION
/**
 * @swagger
 * /habitaciones:
 *  post:
 *    summary: Crea una nueva habitación
 *    tags: [Habitación]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Habitación'           
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *      200:
 *        description: Retorna la habitacion creada, en un Json
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 */

// DELETE HABITACION POR ID
/**
 * @swagger
 * path:
 * /habitacion/{id}:
 *  delete:
 *    summary: Elimina una habitación
 *    tags: [Habitación]
 *    parameters:
 *      - in: path
 *        name: id   
 *        required: true
 *        schema:
 *          type: integer
 *        description: Se pasa el id de la habitación a eliminar           
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *       201:
 *         description: devuelve la confirmación de la eliminación
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Habitación'
 *       404:
 *         description: Habitación no encontrada
 *
 */

// SCHEMA DE CAMA
/**
 *  @swagger
 * components:
 *  schemas:
 *    Cama:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: nombre de la Cama
 *        HabitacionId:
 *          type: iteger
 *          description: ID de la habitación a la cual va a ser asiganda
 *        precio:
 *          type: integer
 *          description: En caso de que la cama posea un precio diferente a las ya situadas en la habitación.
 *      required:
 *        - HabitacionId
 *        - nombre
 *        - precio
 *      example: 
 *       #
 *       #
 *         nombre: "Cama ejemplo Habitación ejemplo"
 *         precio: 800
 *         HabitacionId: 2
 * */

// GET CAMAS
/**
 * @swagger
 * path:
 * /camas:
 *  get:
 *    summary: Retorna todas camas del Hostel
 *    tags: [Cama]           
 *    security:
 *      - ApiKeySecurity: []
 *    responses:
 *      200:
 *         description: Retorna una array con las camas que posee el Hostel
 *         content: 
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Cama'
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 */

// GET CAMA POR ID
/**
 * @swagger
 * path:
 * /camas/{id}:
 *  get:
 *    summary: Retorna una Cama
 *    tags: [Cama]
 *    parameters:
 *      - in: path
 *        name: id   
 *        required: true
 *        schema:
 *          type: string
 *        description: Recibe el id de la cama a buscar
 *    security:
 *      - ApiKeySecurity: []
 *    responses:
 *       200:
 *         description: Devuelve una cama
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Cama'
 *       404:
 *         description: cama no encontrada
 *
 */

// POST CAMA
/**
 * @swagger
 * /camas:
 *  post:
 *    summary: Crea una nueva cama
 *    tags: [Cama]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Cama'
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *      200:
 *        description: Retorna la cama creada, en un Json
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 *      404:
 *        description: Habitación no encontrada
 */

// DELETE CAMA POR ID
/**
 * @swagger
 * path:
 * /camas/{id}:
 *  delete:
 *    summary: Elimina una habitación
 *    tags: [Cama]
 *    parameters:
 *      - in: path
 *        name: id   
 *        required: true
 *        schema:
 *          type: string
 *        description: Se pasa el id de la cama a eliminar
 *    security:
 *      - ApiKeySecurity: []
 *        Token: []
 *    responses:
 *      201:
 *         description: devuelve la confirmación de la eliminación
 *         content: 
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Cama'
 *      401:
 *        description: El usuario no tiene los permisos necesarios
 *      404:
 *         description: Cama no encontrada
 */

// SCHEMA DE HUESPED
/**
 *  @swagger
 * components:
 *  schemas:
 *    Huesped:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: nombre del usuario
 *        apellido:
 *          type: string
 *          description: apellido del usuario
 *        tipoDocumento:
 *          type: string
 *          description: clase de identificador
 *        dni:
 *          type: integer
 *          description: identificacion numerica del usuario
 *        email:
 *          type: string
 *          description: email valido del usuario
 *          format: email
 *        nacionalidad:
 *          type: string
 *          description: nacionalidad del usuario
 *        telefono:
 *          type: integer
 *          description: numero de telefono de contacto del usuario
 *        direccion:
 *          type: string
 *          description: direccion real del usuario
 *        genero:
 *          description: genero del usuario
 *          type: string
 *      required:
 *        - tipoDocumento
 *        - dni
 *        - nombre
 *        - apellido
 *        - genero
 *        - nacionalidad
 *      example: 
 *       #
 *       #
 *        nombre: Juan
 *        apellido: Perez
 *        email: juan@gmail.com
 *        tipoDocumento: DNI
 *        dni: 12345678
 *        genero: femenino
 *        nacionalidad: Argenitina
 * */

