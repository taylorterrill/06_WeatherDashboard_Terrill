var key = "c099ae675a44a1b9455b2c8046eef852";
var today = moment().format('L');
var searchHistoryLi = [];

function currentCondition(city) {
    var queryStr = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

    $.ajax({
        url: queryStr,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        $('#weather-content').css('display', 'block');
        $('#city-details').empty();

        var iconCode = cityWeatherResponse.weather[0].icon;
        var iconStr = `https://openweathermap.org/img/w/${iconCode}.png`
        
        
        // variable holds the searched city's name, temperature, weather, wind speed today; as well as the weather icon.
        var currentCity = $(`
        <h2 id="currentCity">
            ${cityWeatherResponse.name} ${today} <img src="${iconStr}" alt="${cityWeatherResponse.weather[0].description}" />
        </h2>
        <p>Temperature: ${cityWeatherResponse.main.temp} °F</p>
        <p>Humidity: ${cityWeatherResponse.main.humidity}\%</p>
        <p>Wind Speed: ${cityWeatherResponse.wind.speed} MPH</p>
        `);

        $('city-details').append(currentCity);

        // gets and displays UV index of searched city

        var lat = cityWeatherResponse.coord.lat;
        var lon = cityWeatherResponse.coord.lon;
        var uviQueryStr =  


    })
}