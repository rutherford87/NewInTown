//Selectors
var submitBtn = document.querySelector('#submitBtn');

//EventListeners

//Functions


//Mashvisor API call for short term rentals
//create function for fetch for on click 
var inputCity = 'Austin'
var inputState = 'TX'
fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state="+inputState+"&page=1&city="+inputCity+"&reviews_count=30", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "1cb58a581amsh305daaa9cdf8116p1a0875jsn351d7f82b4e7",
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

});

function renderPropCards (data){
    //loop through top 3 rentals


    for(i=0; i<3; i++){
$('#propCardCont').append(`
<div class="card-content"id='propCard1'>
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src=${data.content.list[i].thumbnail_url} alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">${data.content.list[i].name}</p>
                    <p class="subtitle is-6">Rate per Night (USD) ${data.content.list[i].price}</p>
                    </div>
                  </div>
                  <div class="content">
${data.content.list[i].description.substring(0,150)}...
</div>  
<a href=${data.content.list[i].map_image_url}>See Map</a> 

                  
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
		<div class="media">
		  <div class="media-left">
			<figure class="image is-48x48">
			  <img src="${eventSearch._embedded.events[i].images[1].url}" alt="Placeholder image">
			</figure>
		  </div>
		  <div class="media-content">
			<p class="title is-4">${eventSearch._embedded.events[i].name}</p>
			<p class="subtitle is-6">@johnsmith</p>
		  </div>
		</div>
		<div class="content">
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		  Phasellus nec iaculis mauris. <a>@bulmaio</a>.
		  <a href="#">#css</a> <a href="#">#responsive</a>
		  <br>
		  <time datetime="2016-1-1">11:09 PM - ${eventSearch._embedded.events[i].dates.start.localDate}</time>
		</div>
	  </div>
		`)
	}
  }

  var getEvents = function () {
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&startDateTime=2021-07-20T14:00:00Z&latlong=30.2672,-97.7431&radius=10&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ';
    
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
getEvents()


































// Modal

var selectProperty = document.querySelector(".card-content");
const modalBg = document.querySelector('.modal-background');
const modal = document.querySelector('.modal');
var eventSearch = document.querySelector('#searchEvent');


selectProperty.addEventListener('click', () => {
   modal.classList.add('is-active')
})

modalBg.addEventListener('click', () => {
   modal.classList.remove('is-active')
})

eventSearch.addEventListener('click', () => {
var genreSelect = document.querySelector(".select-genre").value;
var dateStartSelect = document.querySelector(".date-start-input").value;
var dateEndSelect = document.querySelector(".date-end-input").value;

   modal.classList.remove('is-active');
   localStorage.setItem("startDate", JSON.stringify(dateStartSelect));
   localStorage.setItem("endDate", JSON.stringify(dateEndSelect));
   localStorage.setItem("genre", JSON.stringify(genreSelect));

})

