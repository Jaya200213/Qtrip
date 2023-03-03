import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  const p=new URLSearchParams(search);
  return p.get("adventure");
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try{
    let p= await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    return await p.json();
  }
  catch(err)
  {
    return null;
  }
  
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  document.getElementById("adventure-name").append(adventure.name);
  document.getElementById("adventure-subtitle").append(adventure.subtitle);
  for(let i=0;i<adventure.images.length;i++)
  {
    var c=document.createElement("div");
    var img=document.createElement("img");
    img.setAttribute("class","activity-card-image")
    img.src=adventure.images[i];
    c.append(img);
    document.getElementById("photo-gallery").append(c);
  }
  document.getElementById("adventure-content").append(adventure.content);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  let k=document.getElementById("photo-gallery");
  k.innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
images.map((key,index)=>{
  let div=document.createElement("div");
  div.className=`carousel-item ${index===0?'active':''}`;
  div.innerHTML=`
    <img src=${key} class="activity-card-image pb-3"/>
  `;
  document.getElementById("carousel-inner").appendChild(div);
});
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  if(adventure["available"])
  {
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"];
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  document.getElementById("reservation-cost").innerHTML=adventure["costPerHead"]*persons;
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  const q=document.getElementById("myForm");
  q.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let data={
      name:q.elements["name"].value,
      date:new Date(q.elements["date"].value),
      person:q.elements["person"].value,
      adventure:adventure["id"]
    }
    console.log(data);
    try{
      const w=`${config.backendEndpoint}/reservations/new`;
      const res= await fetch(w,{
        method:"POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        });
      alert("Success!");
      window.location.reload();
    }
    catch(error){
      console.log("error");
      alert("Failed!");
    }
  });

  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  if(adventure["reserved"]==true)
  {
    document.getElementById("reserved-banner").style.display="block";
  }
  else
  {
    document.getElementById("reserved-banner").style.display="none";
  }
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
