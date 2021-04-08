//Selectors
var submitBtn = document.querySelector('#submitBtn');
var lat;
var lng;
var inputCity;
var inputState;
//EventListeners

//Functions


// Mashvisor API call for short term rentals
// create function for fetch for on click 
function getRentals(){

fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state="+inputState+"&page=1&city="+inputCity+"&reviews_count=30", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dd0a6684a9msh406090745954020p1106b2jsne1e13cc9f5a3",
		"x-rapidapi-host": "mashvisor-api.p.rapidapi.com"
	}
})
.then(response => {
    return response.json();
	console.log(response);
})
.then(function (data){
    console.log(data)
    renderPropCards(data)
    })
.catch(err => {
	console.error(err);

})};

function renderPropCards (data){
    //loop through top 3 rentals


    for(i=0; i<3; i++){
$('#propCardCont').append(`
<div class="card-content delete-card" id='propCard1'>
                  <div class="card is-equal-height">
                    <div class="card-image">
                      <figure class="image is-200x200">
                       <img src=${data.content.list[i].thumbnail_url} alt="Placeholder image">
                      </figure>
                      </div>
                      <div class="media-content mx-2 my-2">
                      <p class="title is-4 px-2 py-2">${data.content.list[i].name}</p>
                      <p class="subtitle is-6 px-1">Rate per Night (USD) ${data.content.list[i].price}</p>
                      <div class="content px-1 py-1">
                      ${data.content.list[i].description.substring(0,150)}...
                      </div> 
                      <footer class="card-footer">   
                          <a class="card-footer-item" href=${data.content.list[i].map_image_url}>See Map</a> 
                          <input class="button item card-footer-item" id="searchEventNear" type="submit" value="Search Events Nearby!" data-lat=${data.content.list[i].lat} data-lng=${data.content.list[i].lng}>              
                          </div>
                      </footer>
                    </div>
                  </div>
                  
`)
    }
}

// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=Austin&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ",
//     async:true,
//     dataType: "json",
//     success: function(json) {
//                 console.log(json);
//                 // Parse the response.
//                 // Do other things.
//              },
//     error: function(xhr, status, err) {
//                 // This time, we do not end up here!
//              }
//   });

  var displayEvents = function(eventSearch) {
	$('#event-container').children().remove()
	for (var i = 0; i < 3; i++){
		$('#event-container').append(`
    <div class="card-content">
                  <div class="card is-equal-height">
                    <div class="card-image">
                      <figure class="image is-200x200">
                       <img src=${eventSearch._embedded.events[i].images[1].url} alt="Event image">
                      </figure>
                      </div>
                      <div class="media-content mx-2 my-2">
                      <p class="title is-4 px-2 py-2">${eventSearch._embedded.events[i].name}</p>
                      <p class="subtitle is-6 px-1">Are we Using?(USD)</p>
                      <div class="content px-1 py-1">
                      
                      </div> 
                      <footer class="card-footer">   
                      <time datetime="2016-1-1">11:09 PM - ${eventSearch._embedded.events[i].dates.start.localDate}</time>
                      </footer>
                    </div>
                  </div>
		`)
	}
  }

  //   template literal for date, move modal above this function
  var getEvents = function () {
    $('#title3').css("display", "block");
    // var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationName=rock&latlong=30.2672,-97.7431&radius=100&localStartEndDateTime=2021-04-08T14:00:00,2021-08-01T14:00:00&sort=distance,date,asc&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ';
	var genreSelect = localStorage.getItem("genre");
	var dateStartSelect= localStorage.getItem("startDate");
	var dateEndSelect= localStorage.getItem('endDate')
	var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationName=${genreSelect}&latlong=${lat},${lng}&radius=5&localStartEndDateTime=${dateStartSelect}T14:00:00,${dateEndSelect}T14:00:00&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ`;

	

 




    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            console.log(data);
            displayEvents(data);        
            });
        } else {
            $('#event-container').append(`<div class='weatherbox main-text'>'Error: '${response.statusText}</div>`);
        };
    })
	.catch(function (error) {
    alert('Sorry! we\'r having trouble connecting to our servers. Try again soon');
    });
};
// getEvents()


































// Modal

// var selectProperty = document.querySelector("#searchEventNear");
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
var eventSearch = document.querySelector('#searchEvent');

$(document).on('click','#searchEventNear',function(){
  
  
  //  $(this).nextSibling('.delete-card').remove();
   modal.classList.add('is-active');
   lat = $(this).attr("data-lat");
   lng = $(this).attr("data-lng");
   console.log(lat);
   console.log(lng);
  //  Remove sibling cards not clicked on
  $(this).parent().siblings('.delete-card').remove();
  // var titleChange = document.querySelector(".changeTitle");
  // titleChange.textContent("Your Chosen Property");

});


modalBg.addEventListener('click', () => {
   modal.classList.remove('is-active')
})

eventSearch.addEventListener('click', () => {
var genreSelect = document.querySelector(".select-genre").value;
var dateStartSelect = document.querySelector(".date-start-input").value;
var dateEndSelect = document.querySelector(".date-end-input").value;

   modal.classList.remove('is-active');
   localStorage.setItem("startDate", dateStartSelect);
   localStorage.setItem("endDate", dateEndSelect);
   localStorage.setItem("genre", genreSelect);

  getEvents();

})

submitBtn.addEventListener('click', function(){
  $('#event-container').children().remove();
  $('#propCardCont').children().remove();
  $('#title1').css("display", "none");
  $('#title2').css("display", "block");
  inputCityIni = document.querySelector("#inputCity").value.toLowerCase();
  inputCity =inputCityIni.charAt(0).toUpperCase()+inputCityIni.slice(1);
  inputState = document.querySelector("#inputState").value.toUpperCase();
  if (inputState.length!==2){
  alert("Please input state as two-letter state code")
  inputState.reset();
  return;
  }
  console.log(inputState);
  console.log(inputCity);
  getRentals();
})
