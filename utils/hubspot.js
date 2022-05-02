const requestAPI = require('request')
const config = require('../config/config')
const boom = require('@hapi/boom')
const hubspot = require('@hubspot/api-client')
const hubspotClient = new hubspot.Client({ apiKey: '6cd9c53d-6056-4b10-b2eb-1c6407b60dbd' })

class HubSpotHelper {

 async crearUsuario (data) {
  const nuevoContacto = await hubspotClient.crm.contacts.basicApi.create({
    properties: {
      firstname: data.nombre,
      lastname: data.apellido,
      email: data.email,
  }, 
  })
  if(!nuevoContacto){
    throw boom.badData('no se creo en el CRm')
  }
  return 'se creo en el CRM'
}


}

module.exports = HubSpotHelper