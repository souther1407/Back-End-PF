const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, error404Handler } = require('./middleware/error.handler')
const path = require('path')
const {configSwg} = require('./config/swagger')

// Swagger 
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpect = {
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
  },
  {
      "url": "localhost:3001",
      "description": "Local server"
  }
  ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpect)))

const whitelist = ['http://localhost:8080', 'https://heroku.heroku.com' ]
const option = {
  origin: (origin, callback)=>{
    if (whitelist.includes(origin)){
      callback(null, true);
    }else{
      callback(new Error('origen no permitido - CORS -'));
    }
  }
}
app.use(cors()); // en este momento esta dejando pasar todo 
require('./utils/auth');



routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(error404Handler)


app.listen(port, ()=>{
    console.log('preparado para trabajar en el puerto ' + port)
})
