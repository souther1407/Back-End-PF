/**
 *
 *  @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      required:
 *        - dni
 *        - tipoDocumento
 *        - nombre
 *        - apellido
 *        - password
 *        - email
 *        - rol
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
 *          required: true
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
 *        Nacionalidad:
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
 *          oneOf :
 *            - masculino
 *            - femenino 
 *            - no binario 
 *        rol:
 *          type: string
 *          description: rol en la api del usuario
 *          oneOf:
 *            - administrador
 *            - recepcionista
 *            - cliente
 */


/**
 * @swagger
 * path:
 * /usuarios:
 *  get:
 *    summary: lista todos los usuarios
 *    tags: [Usuario]
 *    requestBody:
 *      required: false
 *  responses:
 *      200:
 *        description: array de usuarios
 */

/**
 * @swagger
 * path:
 * /usuarios/{dni}:
 *  get:
 *    summary: buscar usuario por numero de dni
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: dni   
 *        required: true
 *        schema:
 *          type: integer
 *          required: true
 *          description: el dni del usuario
 *    responses:
 *        "200":
 *          description: json con el detalle del usuario
 */

/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: crear un nuevo usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/Usuario"           
 *    responses:
 *      200:
 *        description: request body
 */
