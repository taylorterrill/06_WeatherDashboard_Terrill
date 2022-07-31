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
        var uviQueryStr = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${key}`;

        $.ajax({
            url: uviQueryStr,
            method: "GET"
        }).then(function(uviResponse) {
            
            var uvi = uviResponse.value;
            // variable holds <p> tag for UVI
            var uviP = $(`
            <p>UV Index:
                <span id="uv-index-color" class="px-2 py-2 rounded">${uvi}</span> 
            </p>`
            );

            $('#city-details').append(uviP);

            futureCondition(lat, lon);

            // applies color based on uv index conditions
            if (uvi >= 0 && uvi <=2) {
                $('#uv-index-color').css('background-color', "#3EA72D").css("color", "white");
            }else if (uvi >= 3 && uvi <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            }else if (uvi >= 6 && uvi <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            }else if (uvi >= 8 && uvi <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            }else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white");
            };
        });
    });
}


function futureCondition(lat, lon) {
    var futureStr = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${key}`;
    

}