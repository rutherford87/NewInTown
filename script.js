fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyB8Jvy0dfcWAybRKZyYUBicgxyetrhSaLw", {
	"method": "GET",
    "mode": "no-cors",
})
.then(function (response) {
       return response.json()}).then(function (data) { 
            console.log(data)       
    
})
.catch(function (error) {
alert('Sorry! we\'r having trouble connecting to our servers. Try again soon');
});