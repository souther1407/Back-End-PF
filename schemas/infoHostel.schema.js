const joi = require('joi')

const title = joi.string().required();
const description = joi.string().required();
const url = joi.string().required();



const crearInfoHostelSchema = joi.object({
  title: title.required(),
  description: description.required(),
  url: joi.string().required(),
});


const actualizarInfoHostelSchema = joi.object({
  title,
  description,
  url,
});

module.exports = {
  crearInfoHostelSchema,
  actualizarInfoHostelSchema
}
