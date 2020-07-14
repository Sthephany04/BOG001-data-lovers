
 const funciones = {

  // // DEFINICION DEBERIA IR EN EL DATA.JS
  // loadJSON : function (callback) {
  // const xobj = new XMLHttpRequest();
  // xobj.overrideMimeType("application/json"); //overrideMimeType - Extension
  // xobj.open("GET", "./data/pokemon/pokemon.json", false); //FALSE PARA QUE SE DETENGA Y NO SIGA HASTA QUE TENGA LA DATA
  // xobj.onreadystatechange = () => {
  //   if (xobj.readyState === 4 && xobj.status === 200) {
  //     callback(xobj.responseText); // CUANDO RECIBA, DECIRLE QUE TENGO QUE HACER
  //   }
  // }; //CUANDO ESTE LISTO Y EL ESTADO CAMBIE, QUE HACER CON LA DATA ---- ESTADO 4 IDENTIFICA QUE LA INFORMACION FUE CARGADA --- EL 200 ES QUE SI EXISTE EL ARCHIVO
  // xobj.send(null); // INICIA LA PETICION
  // },

  sortData: function (data, sortBy, sortOrder) {  
    let dataOrdenada = data.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1 );
    if (sortOrder === 'descendente') {
      dataOrdenada = dataOrdenada.reverse()
    }
    return dataOrdenada;
  },

  filterData: function (pokemon, condition) {
    let filtro = [];
    for (let i = 0; i < pokemon.length; i++) {
      for (let j = 0; j < pokemon[i].type.length; j++) {
        if (pokemon[i].type[j] === condition) {
          filtro.push(pokemon[i]);
        }
      }
    }
    return filtro;
  },

  computeStats: function (pokemon, condicion) {
    let suma = 0;
    for (let i = 0; i < pokemon.length; i++) {
      suma += Number(pokemon[i][condicion].slice(0, -2));   
    }
    let promedio = (suma / pokemon.length).toFixed(2);
    return promedio;
  },

  average: function (pokemon, condition) {
    let filtro = [];
    let contador = 0;
    for (let i = 0; i < pokemon.length; i++) {
      for (let j = 0; j < pokemon[i].type.length; j++) {
        if (pokemon[i].type[j] === condition) {
          filtro.push(pokemon[i]);
          contador = filtro.length;
        }
      }
    }
    return contador;
  }
}

export default funciones;
