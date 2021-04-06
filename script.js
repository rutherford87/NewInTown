//Selectors

//EventListeners

//Function
fetch("https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed?state=CA&page=1&city=Los%20Angeles&reviews_count=30&zip_code=91342", {
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
    })
.catch(err => {
	console.error(err);
});

