const express = require('express');
const routerApi = require('./routes')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, error404Handler } = require('./middleware/error.handler')
const path = require('path')
const {configSwg} = require('./config/swagger')

// Swagger 
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpect = configSwg


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
