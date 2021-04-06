//Selectors

//EventListeners

//Function
// fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state=CA&page=1&city=Los%20Angeles&reviews_count=30&zip_code=91342", {
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
//     })
// .catch(err => {
// 	console.error(err);
// });
// url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&startDateTime=" + 2021-07-20T14:00:00Z + "&latlong=" + latitude + longitude + "&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ",
// startDateTime=2021-07-20T14:00:00Z&endDateTime=2021-07-28T14:00:00Z&

// $.ajax({
//     type:"GET",
//     url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&startDateTime=2021-07-20T14:00:00Z&latlong=30.2672,-97.7431&radius=10&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ",
//     async:true,
//     dataType: "json",
//     success: function(eventSearch) {
//                 console.log(eventSearch);
//                 displayEvents(eventSearch)
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