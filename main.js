import funciones from "./data.js";

let dataPokemon;

// // EJECUCION
// funciones.loadJSON((res) => {
//   datosPokemon = JSON.parse(res).pokemon; //PARSEAR EL JSON PQ LO QUE RECIBO ES UN STRING GIGANTE
// });

  fetch("./data/pokemon/pokemon.json")
  .then(function(res) {
    if(res.status !== 200) {
      //console.log(res.status)
    }

    res.json().then(function(data) {
      dataPokemon = data.pokemon
      checkButtonBack(pageInitial);
      checkButtonNext(pageInitial);
      addListener()
    })
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })


const containerData = document.getElementById("contenedorTodaData");
const containerPokemones = document.getElementById("pokemones");
const modal = document.getElementById("modal");
const buttonCloseModal = document.getElementById("cerrar");
const containerButtons = document.getElementById("contenedorBotones");
const buttonNext = document.getElementById("siguiente");
const buttonPrevious = document.getElementById("anterior");
const menuBurguer = document.getElementById("menuTrigger");
const selectFilter = document.getElementById("buscar__type");
const order = document.getElementById("ordenarPorNombre");
const CHART = document.getElementById("chart");

let pokemonesForPage = 12;

let pageInitial = 1;
let viewInitial;

//Agregar addEventListener a cada opcion del menu
function addListener() {
  const links = document.querySelectorAll(".header__link");
  links.forEach((link) => link.addEventListener("click", changeView));
}

//Cambiar vista respecto a la seleccion del menu
function changeView(evento) {
  
  
  const linkActive = document.querySelector(".header__link__active");

  document
    .querySelectorAll(".paginas")
    .forEach((view) => view.classList.add("hidden"));
  linkActive.classList.remove("header__link__active");
  closeModal();

  const link = evento.target;
  const view = link.getAttribute("href").slice(1);
  link.classList.add("header__link__active");
  document.getElementById(view).classList.remove("hidden");

  if (view === "pokedex" || view === "ordenar") {        
    containerButtons.classList.remove("hidden");
  } else if (view === "datos") {   
    showGraphics();
    containerButtons.classList.add("hidden");
  } else {
    containerButtons.classList.add("hidden");
  }

  pageInitial = 1;
  viewInitial = view;
  menu();
  showPokemon(viewInitial);
  scrollto()
}

//Funcion para la pagecion
function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size); //intervalo del array
}

//Crear las card de forma dinamica
function createPokemonCard(pokemon) {
  const card = document.createElement("article");
  const container = document.createElement("div");
  // NOMBRE DE CLASE
  const containerTitulo = document.createElement("div");

  const image = document.createElement("img");
  image.src = `${pokemon.img}`;
  image.setAttribute("class", "card__image");

  const nombre = document.createElement("h2");
  nombre.innerHTML = `${pokemon.name}`;
  nombre.setAttribute("class", "pintarTitulo");

  const id = document.createElement("h3");
  id.innerHTML = ` ${pokemon.id}`;

  const tipo = document.createElement("h3");
  tipo.innerHTML = `Tipo: ${pokemon.type.join(", ")}`;

  const debilidades = document.createElement("h3");
  debilidades.innerHTML = `Debilidad: ${pokemon.weaknesses.join(", ")}`;
  debilidades.setAttribute("class", "debilidades");

  containerTitulo.appendChild(nombre);
  containerTitulo.appendChild(id);
  containerTitulo.setAttribute("class", "container__flex");

  container.appendChild(containerTitulo);
  container.appendChild(tipo);
  container.appendChild(debilidades);
  container.setAttribute("class", "card__info");

  card.appendChild(image);
  card.appendChild(container);
  card.setAttribute("class", "card__container");

  card.addEventListener("click", () => openModal(pokemon));

  return card;
}

//Realizamos el llamado a las funciones de data.js 
function showPokemon(view) {
  let showData;
  let containerShowPokemon;
  let pagination;

  if (view === "ordenar") { 
      
    const containerPokemonesOrganized = document.getElementById(
      "pokemonesOrdenados"
    );
    containerPokemonesOrganized.innerHTML = "";
    containerShowPokemon = containerPokemonesOrganized;
    let valueOrder = order.value;
    const d = dataPokemon.slice();
    showData = funciones.sortData(d, "name", valueOrder);
    pokemonesForPage = 12;
  } else if (view === "buscar") {
    const FilterForType = document.getElementById("pruebaFiltro");
    FilterForType.innerHTML = "";
    let valueFilter = selectFilter.value;
    const d = dataPokemon.slice();
    showData = funciones.filterData(d, valueFilter);
    containerShowPokemon = FilterForType;
    pokemonesForPage = 26;
  } else {    
    deleteContent();
    showData = dataPokemon;
    containerShowPokemon = containerPokemones;
  }

  pagination = paginate(showData, pokemonesForPage, pageInitial);
  pagination.forEach((pokemon) => {
    containerShowPokemon.appendChild(createPokemonCard(pokemon));
  });
}

//Borrar contenido de la pestaña Pokedex
function deleteContent() {
  containerPokemones.innerHTML = "";
}

//Verificar si se muestra el boton siguiente
function checkButtonNext(page) {
  const separationPage = Math.ceil(dataPokemon.length / pokemonesForPage);
  buttonNext.style.display =
    page + 1 > separationPage ? "none" : "block";
}

//Verificar si se muestra el boton atras
function checkButtonBack(page) {
  buttonPrevious.style.display = page - 1 === 0 ? "none" : "block";
}

//Cambio de pagina segun la data (12 pokemones por pagina)
function changePage(event, view) {
  deleteContent();
  if (event.target.id === "siguiente") {
    pageInitial++;
  } else {
    pageInitial--;
  }
  
  showPokemon(view);
  checkButtonBack(pageInitial);
  checkButtonNext(pageInitial);  
  scrollto()
}

//Mostrar o ocultar el menu hamburguesa
function menu() {
  document.getElementById("menu").classList.toggle("header__menu__position");
}

//Abrir modal de pokemones
function openModal(pokemon) {
  modal.classList.remove("hidden");
  containerData.classList.add("hidden");
  showPokemonModal(pokemon);
}

//Cerrar modal
function closeModal() {
  modal.classList.add("hidden");
  containerData.classList.remove("hidden");
}

//Modal
function showPokemonModal(pokemon) {
  scrollto()
  const infoPokemon = document.getElementsByClassName(
    "modal__pokemon__info"
    )[0];
    
    infoPokemon.innerHTML = `<div class = "modal__container-img">
    <img class = "modal__img" src = "./image/pngflow.png" >
    <img class = "modal__image-pokemon" src = "${pokemon.img}">
    </div>
    <div class = "modal__container-info">
    <h2>${pokemon.name} ID. ${pokemon.id}</h2>
    <div class = "modal__features">
    <div>
    <p>Altura: <span> ${pokemon.height} </span></p>
    <p>Peso: <span> ${pokemon.weight} </span></p>
    <p>Caramelo: <span> ${pokemon.candy} </span></p>
    <p>Recuento de Caramelos: <span> ${
      pokemon.candy_count
    } </span></p>
    </div>
    <div class = "modal__type">
    <p>Tipo: </p>
    <p><span>${pokemon.type.join(", ")}</span></p>
    <p>Debilidad: </p>
    <p><span>${pokemon.weaknesses.join(", ")}<span></p>
    </div>
    </div>
    </div>`;
  }
  
//Visualizar datos promedio y graficas
function showGraphics() {
  const dataAverage = document.getElementById("datosPromedio");
  dataAverage.innerHTML = `<p> El Promedio de <span>Peso</span> para los Pokemones es de: ${funciones.computeStats(
    dataPokemon,
    "weight"
  )} kg</p>
    <p> El Promedio de <span>Altura</span> para los Pokemones es de: ${funciones.computeStats(
      dataPokemon,
      "height"
    )} m
    </p>`;

  // eslint-disable-next-line no-undef,no-unused-vars
let lineChart = new Chart(CHART, {
  type: "pie",
  data: {
    labels: [
      "Dragon",
      "Veneno",
      "Volador",
      "Insecto",
      "Normal",
      "Tierra",
      "Psiquico",
      "Hielo",
      "Fantasma",
      "Yerba",
      "Fuego",
      "Agua",
      "Electrico",
      "Lucha",
      "Roca"
    ],
    datasets: [
      {
        data: [
          funciones.average(dataPokemon, "Dragon"),
          funciones.average(dataPokemon, "Veneno"),
          funciones.average(dataPokemon, "Volador"),
          funciones.average(dataPokemon, "Insecto"),
          funciones.average(dataPokemon, "Normal"),
          funciones.average(dataPokemon, "Tierra"),
          funciones.average(dataPokemon, "Psiquico"),
          funciones.average(dataPokemon, "Hielo"),
          funciones.average(dataPokemon, "Fantasma"),
          funciones.average(dataPokemon, "Yerba"),
          funciones.average(dataPokemon, "Fuego"),
          funciones.average(dataPokemon, "Agua"),
          funciones.average(dataPokemon, "Electrico"),
          funciones.average(dataPokemon, "Lucha"),
          funciones.average(dataPokemon, "Roca")
        ],
        label: "My first dataseet",
        backgroundColor: [
          "#120136",
          "#79D70F",
          "#12947F",
          "#06623B",
          "#FF5200",
          "#6F0000",
          "#222831",
          "#43D8C9",
          "#D9455F",
          "#A8DF65",
          "#D92027",
          "#1B6CA8",
          "#FFD31D",
          "#2C003E",
          "#6F0000"]
      },
    ],
  }, 
  options: {
    responsive: true,
    responsiveAnimationDuration: 0,
    maintainAspectRatio: 0,
      title: {
          display: true,
          text: 'Cantidad de Pokemones por Tipo',
          fontSize: 30,
          padding: 10,
          fontColor: '#1C2D61',
      },
      legend: {          
          labels: {
              fontSize: 16,
              padding: 10,
              boxWidth: 40,
              fontFamily: 'lato',   
              fontColor: 'black',      
          }
      },     
      tooltips: {                   
          xPadding: 10,
          yPadding: 10,
      }
  }           
  })
}

function scrollto() {
  setTimeout(() => {
    
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  });
}

buttonNext.addEventListener("click", () =>
  changePage(event, viewInitial)
);

buttonPrevious.addEventListener("click", () =>
  changePage(event, viewInitial)
);

menuBurguer.addEventListener("click", menu);
buttonCloseModal.addEventListener("click", closeModal);
order.addEventListener("change", () => {
  pageInitial = 1;
  checkButtonBack("1");
  showPokemon("ordenar");
});

selectFilter.addEventListener("change", () => {
  pageInitial = 1;
  checkButtonBack("1");
  checkButtonNext(pageInitial);
  showPokemon("buscar");
});




