//Selectors
var submitBtn = document.querySelector('#submitBtn');
var lat;
var lng;
var inputCity;
var inputState;

//Functions

// Mashvisor API call for short term rentals
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
})
.then(function (data){
    renderPropCards(data)
    })
.catch(err => {
  alert('Sorry! we\'r having trouble connecting to our servers. Try again soon');
})};


function renderPropCards (data){
//loop through top 3 rentals
// Error box to show if rentals did not populate
if (data.content.list == 0){
  $('#propCont').append(`
  <div class="card-content">
    <div>There are no rentals in your selected city and state. Try searching a new area!</div>
  </div>
    `)
}else{
for (var i = 0; i < 3; i++){
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
}};}

  var displayEvents = function(eventSearch) {
//loop through top 3 Events
// Error box to show if Events did not populate
	$('#event-container').children().remove()
	if (eventSearch.page.totalElements == 0){
    $('#event-container').append(`
    <div class="card-content">
      <div>There are no events in your selected dates</div>
    </div>
      `)
  }else{
  for (var i = 0; i < 3; i++){
		$('#event-container').append(`
    <div class="card-content is-equal-height">
    <div class="card column">
      <div class="card-image">
          <figure class="image is-200x200">
            <img class="is-fixed" src="${eventSearch._embedded.events[i].images[2].url}" alt="Placeholder image">
          </figure>
          </div>
          <div class="media-content">
          <p class="title is-4">${eventSearch._embedded.events[i].name}</p>
          <p class="subtitle is-6"><a href="${eventSearch._embedded.events[i].url}">Get Tickets</a></p>
          </div>
        
          <div class="content">
          <p>Ticket Price :$${eventSearch._embedded.events[i].priceRanges[0].min} - $${eventSearch._embedded.events[i].priceRanges[0].max} (USD)</p>
          <p>Venue: ${eventSearch._embedded.events[i]._embedded.venues[0].name}.</p>
          <p><a href='${eventSearch._embedded.events[i]._embedded.venues[0].url}'>more info</a></p>
          <br>
          <time datetime="2016-1-1">${moment(eventSearch._embedded.events[i].dates.start.localDate,'YYYY-MM-DD').format('MM-DD-YYYY')}</time>
        </div>
      </div>
    </div>
		`)
	}
  }}

//   template literal for date
  var getEvents = function () {
    $('#title3').css("display", "block");
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
            $('#event-container').append(`<div>Error: ${response.statusText}</div>`);
        };
    })
	.catch(function (error) {
    alert('Sorry! we\'r having trouble connecting to our servers. Try again soon');
    });
};

//function to correct two word city names to capital case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Modal

const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
var eventSearch = document.querySelector('#searchEvent');

//Event listeners

$(document).on('click','#searchEventNear',function(){
  
   modal.classList.add('is-active');
   lat = $(this).attr("data-lat");
   lng = $(this).attr("data-lng");
   var startDate = localStorage.getItem("startDate")|| ""
   var endDate = localStorage.getItem("endDate")|| ""
   $('.date-start-input').val(startDate)
   $('.date-end-input').val(endDate)
  //  Remove sibling cards not clicked on
  $(this).parent().siblings('.delete-card').remove();
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
   //call funtion getEvents with above values
  getEvents();
})

submitBtn.addEventListener('click', function(){ 
  $('#event-container').children().remove();
  $('#propCardCont').children().remove();
  $('#title1').css("display", "none");
  $('#title2').css("display", "block");
  $('#title3').css("display",'none');
  inputCityIni = document.querySelector("#inputCity").value;
  inputCity =toTitleCase(inputCityIni);
  inputState = document.querySelector("#inputState").value.toUpperCase();
  if (inputState.length!==2){
  alert("Please input state as two-letter state code")
  inputState.reset();
  return;
  }
  //call function to get retals with the values above
  getRentals();
});
