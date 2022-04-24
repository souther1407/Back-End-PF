const path = require('path');

const configSwg = {
    definition: {
    openapi: "3.0.0",
    info: {
        "title": "soy Hostel App Express-Postgres API",
        "description": "servidor de arquitectura SOLID para Soy Hostel",
        "termsOfService": "http://daleclick.com/terms/",
        "contact": {
        "name": "API Support",
        "url": "http://www.soyhostel.com/support",
        "email": "soyhostel@gmail.com"
        },
        "license": {
        "name": "Valkiria NN",
        "url": "rodrigoquintero.tamarindorivas.com"
        },
        "version": "1.0.0"
    },
    servers:[{
        "url": "https://back-end-1407.herokuapp.com",
        "description": "Production server"
    },
    {
        "url": "https://backpfhenryv2.herokuapp.com",
        "description": "Development server"
    }
    ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

module.exports = { configSwg }