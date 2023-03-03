import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log("http://65.2.76.152:8082/cities");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  try{
    let data = await fetch("http://65.2.76.152:8082/cities");
    let df=data.json();
    return df;
  }
  catch(err){
    return null;
  }
  // else{
  //   return null data.response;
  // }
  
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  let ele=document.createElement("div");
  ele.className='col-lg-3 col-sm-6 p-3';
  ele.innerHTML=`<a href="pages/adventures/?city=${id}" id='${id}'>
  <div class='tile'>
    <img src="${image}"></img>
    <div class='tile-text'>
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </div>
  </a>`
  
  document.getElementById("data").appendChild(ele);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}

export { init, fetchCities, addCityToDOM };
