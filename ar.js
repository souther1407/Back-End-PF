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

 arr.forEach( (e) => {
    if (!unicos.includes(e)) {
      unicos.push(e);
    }
  });




console.log(unicos)