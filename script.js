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

$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=Austin&apikey=FCGvVCePHKa7Wz7YvGXHr3IxxVy506VZ",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });
































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
var dateSelect = document.querySelector(".date-input").value;

   modal.classList.remove('is-active');
   localStorage.setItem("date", JSON.stringify(dateSelect));
   localStorage.setItem("genre", JSON.stringify(genreSelect));

})

