const arr = [
    {
        id:1
    },
    {
        id:2
    },
    {
        id:3
    },
    {
        id:1
    },
    {
        id:2
    },
    {
        id:3
    },
    {
        id:2
    },
    {
        id:3
    },
    {
        id:4
    },


]
const unicos = []

const quesio = arr.forEach( (elemento) => {
    if (!unicos.includes(elemento.id)) {
      unicos.push(elemento);
    }
  });




console.log(unicos)