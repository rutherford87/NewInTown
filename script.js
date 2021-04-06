//Selectors

//EventListeners

fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state=TX&page=1&city=Austin&reviews_count=30&zip_code=78734", {
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

renderPropCards();