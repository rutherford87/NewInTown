
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