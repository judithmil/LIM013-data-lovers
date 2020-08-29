import order from './data.js';
import data from './data/lol/lol.js';

const datos = data.data,
  filtradoCampeones = document.getElementById("filtradoCampeones"),
  arrayCampeones = Object.values(datos);


const listaCampeones = (name, img, title, difficulty) => {
  const campeones = document.createElement("div"),
    splashCampeones = document.createElement("img"),
    nameCampeones = document.createElement("div"),
    titleCampeones = document.createElement("div"),
    difficultyCampeones = document.createElement("div");

    nameCampeones.innerHTML += name;
    titleCampeones.innerHTML += `<p>"${title}"</p>`;
    difficultyCampeones.innerHTML += `<p>Dificultad: "${difficulty}"</p>`;
  campeones.setAttribute("class", "legends");
  splashCampeones.setAttribute("class", "img-container");
  splashCampeones.setAttribute("src", img);
  nameCampeones.setAttribute("class", "name");
  titleCampeones.setAttribute("class", "name");
  difficultyCampeones.setAttribute("class", "difficulty");

  document.getElementById("container-campeones").appendChild(campeones);
  campeones.appendChild(splashCampeones);
  campeones.appendChild(nameCampeones);
  campeones.appendChild(titleCampeones);
  campeones.appendChild(difficultyCampeones);
};

/*---TRAER DATA---*/
const getCampeones = (objCampeones) => {
  for (let i = 0; i < objCampeones.length; i++) {
    let name = objCampeones[i].name;
    let img = objCampeones[i].splash;
    let title = objCampeones[i].title;
    let difficulty = objCampeones[i].info.difficulty;
    listaCampeones(name, img, title, difficulty);
  }
};

getCampeones(arrayCampeones);


filtradoCampeones.addEventListener('click', (e) => {
  const rol = e.target.id

  if (rol == null || rol == '' || rol == 'All') {
    getCampeones(arrayCampeones);
  } else {
    const result = order.filterChampions(arrayCampeones, rol)
    document.getElementById('container-campeones').innerHTML = '';
    getCampeones(result)
  }
})

/*ORDER */
const selector = document.querySelector("#order");
selector.addEventListener("click", (event) => {
  const orderName = event.target.value;
  //console.log("prueba",e.target.value);
  if (orderName == "asc") {
    const prueba = order.orderAZ(arrayCampeones);
    document.getElementById("container-campeones").innerHTML = "";
    getCampeones(prueba)
  } else if (orderName == "desc") {
    const prueba = order.orderZA(arrayCampeones);
    document.getElementById("container-campeones").innerHTML = "";
    getCampeones(prueba)
  }
});


const searchInput = document.querySelector('#searchInput'),
  result = document.querySelector('#container-campeones');

const buscador = () => {

  result.innerHTML = '';
  const texto = searchInput.value.toLowerCase();

  for (let campeones of arrayCampeones) {
    let nombre = campeones.name.toLowerCase()
    if (nombre.indexOf(texto) != -1) {

      result.innerHTML +=
        `<div class="legends">
        <img class="img-container" src="${campeones.splash}" alt="">
        <div class="name">${campeones.name}</div>
        <div class="name">"${campeones.title}"</div>
        <div class="difficulty">"${campeones.info.difficulty}"</div>
      </div>`
    }
  }

  if (result.innerHTML == '') {
    result.innerHTML +=
      `<div class="legends">
      <img class="img-container" src="./imagenes/notFound.gif" alt="">
      <div class="name">Not Found</div>
    </div>`
  }
}

searchInput.addEventListener('keyup', buscador)