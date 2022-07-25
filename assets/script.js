var key = "c099ae675a44a1b9455b2c8046eef852";
var today = moment().format('L');
var searchHistoryLi = [];

var queryStr = `https://api.openweathermap.org/data/2.5/weather?q=saltlakecity&units=imperial&appid=${key}`

console.log(queryStr);