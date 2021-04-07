//Selectors
var submitBtn = document.querySelector('#submitBtn');
var lat;
var lng;
//EventListeners

//Functions


// Mashvisor API call for short term rentals
// create function for fetch for on click 
// var inputCity = 'Austin'
// var inputState = 'TX'
// fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state="+inputState+"&page=1&city="+inputCity+"&reviews_count=30", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "1cb58a581amsh305daaa9cdf8116p1a0875jsn351d7f82b4e7",
// 		"x-rapidapi-host": "mashvisor-api.p.rapidapi.com"
// 	}
// })
// .then(response => {
//     return response.json();
// 	console.log(response);
// })
// .then(function (data){
//     console.log(data)
//     renderPropCards(data)
//     })
// .catch(err => {
// 	console.error(err);

// });

// function renderPropCards (data){
//     //loop through top 3 rentals


//     for(i=0; i<3; i++){
// $('#propCardCont').append(`
// <div class="card-content" id='propCard1'>
//                   <div class="media">
//                     <div class="media-left">
//                       <figure class="image is-48x48">
//                         <img src=${data.content.list[i].thumbnail_url} alt="Placeholder image">
//                       </figure>
//                     </div>
//                     <div class="media-content">
//                       <p class="title is-4">${data.content.list[i].name}</p>
//                     <p class="subtitle is-6">Rate per Night (USD) ${data.content.list[i].price}</p>
//                     </div>
//                   </div>
//                   <div class="content">
// ${data.content.list[i].description.substring(0,150)}...
// </div>  
// <a href=${data.content.list[i].map_image_url}>See Map</a> 
// <input class="button" id="searchEventNear" type="submit" value="Search Events Nearby!" data-lat=${data.content.list[i].lat} data-lng=${data.content.list[i].lng}>
                  
//                 </div>
// `)
//     }
// }


  var displayEvents = function(eventSearch) {
	$('#event-container').children().remove()
	for (var i = 0; i < 3; i++){
		$('#event-container').append(`
		<div class="card-content">
		<div class="media">
		  <div class="media-left">
			<figure class="image is-48x48">
			  <img src="${eventSearch._embedded.events[i].images[1].url}" alt="Placeholder image">
			</figure>
		  </div>
		  <div class="media-content">
			<p class="title is-4">${eventSearch._embedded.events[i].name}</p>
			<p class="subtitle is-6"><a href="${eventSearch._embedded.events[i].url}">Get Tickets</a></p>
		  </div>
		</div>
		<div class="content">
		  Venue: ${eventSearch._embedded.events[i]._embedded.venues[0].name}.
		  <p><a href='${eventSearch._embedded.events[i]._embedded.venues[0].url}'>more info</a></p>
		  <p><a href="#">#css</a> <a href="#">#responsive</a></p>
		  <br>
		  <time datetime="2016-1-1">${eventSearch._embedded.events[i].dates.start.localDate}</time>
		</div>
	  </div>
		`)
	}
  }

//   template literal for date, move modal above this function
//  before API, need to get local storage & convert to moment format required for URL parameters.
//Date must be in YYYY-MM-DD T HH:MM:SS
  var getEvents = function () {
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationName=rock&latlong=30.2672,-97.7431&radius=100&localStartEndDateTime=2021-04-08T14:00:00,2021-08-01T14:00:00&sort=distance,date,asc&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ';
	// var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationName=${genreSelect}&latlong=${lat},${lng}&radius=5&localStartEndDateTime=${dateStartSelect},${dateEndSelect}&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ`;

	
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
    alert('Sorry! we\'r having trouble finding tickets. Try again soon');
    });
};
getEvents()


































// Modal

// var selectProperty = document.querySelector("#searchEventNear");
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
var eventSearch = document.querySelector('#searchEvent');

$(document).on('click','#searchEventNear',function(){
   modal.classList.add('is-active');
   lat = $(this).attr("data-lat");
   lng = $(this).attr("data-lng");
   console.log(lat);
   console.log(lng);
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

})

