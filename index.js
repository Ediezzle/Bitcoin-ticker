//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
//used to get requests from external APIs
var request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

//route to home page
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


//function to handle the post requests from the form
app.post('/', function(req, res) {

  //capturing user inputs using bodyParser
  var crypto = req.body.crypto;
  var currency = req.body.currencies;
  var amount = req.body.amount;

  //bitcoin api usage
  // https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD

  //url without the pair of values
  var baseUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

  //final url which will dynamically change based on chosen pairs
  //var finalUrl = baseUrl + crypto + currency;

  //object to capture more url values -- check npm request documentation
  var options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    methods: 'GET',
    qs: {
      from: crypto,
      to: currency,
      amount: amount
    }
  };

  //request format
  //request('apiUrl', function (error, response, body) {
  //  console.log('error:', error); // Print the error if one occurred
  //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //  console.log('body:', body); // Print the HTML for the Google homepage.
  //});

  request(options, function(error, response, body) {
    //#region FOR CHECKING PRICE

    //getting the JSON data and parsing it into a JavaScript Object
    //var data = JSON.parse(body);

    //taking the actual key that we want
    //  var price = data.last;

    //timestamp
    //  var currentDate = data.display_timestamp;

    //logging to the console
    //console.log(price);

    //if you want to send many data to the browser
    //res.write("<p>The current date is " + currentDate + "</p>");
    //writing data to the user
    //  res.write("<h1>The current price of " + crypto + " is " + price + " " + currency + "</h1>"); // Create a text node with an H1 element

    //  res.send();

    //#endregion

    //#region FOR CONVERTING currencies

    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    //console.log(price);
    res.write("<p>"  + amount + " " + crypto + " price on " + currentDate + " is equivalent to " + price + " "+ currency + "</p>")
    res.send();
    //#endregion
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
