<<<<<<< HEAD

var placesApi = function () {
    var requestUrl = ("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.2672,-97.7431&radius=5&type=restaurant&keyword=restaurant&key=AIzaSyCI0Z7dnH7JAv8YR5DeljkZVehZUKH3gx8", {
        "mode": "no-cors",
    });
  
    fetch(requestUrl)
      .then(function (response) {
        // return response.json();
      })
      .then(function (data) {
        console.log(data);
        // for (var i = 0; i < data.length; i++) {
        //   var userName = document.createElement('h3');
        //   var issueTitle = document.createElement('p');
        //   userName.textContent = data[i].user.login;
        //   issueTitle.textContent = data[i].title;
        //   issueContainer.append(userName);
        //   issueContainer.append(issueTitle);
        // }
      });
    }

placesApi();
=======
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

>>>>>>> 3f3a057f1dc4fd00f7803b847cafeb829636a271
