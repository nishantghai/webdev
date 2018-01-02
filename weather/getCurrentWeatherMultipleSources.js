/*
This is the javascript file to query multiple weather webservice APIs and update html in weather_main.html
*/



function getWeatherFromAccuweather( zip ){
    console.log("Getting weather from Accuweather for zip code: " + zip);
    $('#output-para-accuweather').text("Getting weather from Accuweather for zip code: " + zip);

    /*
        First query the location key from zip-code
        http://dataservice.accuweather.com/locations/v1/postalcodes/US/search.json?apikey=S4fbM7IRIto4xbUxO2XPjkLqKVBLjw1P&language=en-us&q=92128
    */

    var location_url = "http://dataservice.accuweather.com/locations/v1/postalcodes/US/search.json?apikey=S4fbM7IRIto4xbUxO2XPjkLqKVBLjw1P&language=en-us&q=" + zip ;
    console.log("Accuweather location url : " + location_url );

    $('#output-para-accuweather').html("<br><b>Weather from Accuweather");
    $.ajax({
        type: "GET",
        url: location_url,
        dataType: "jsonp",
        success: function(location_data){
            console.log("Accuweather success in quewrying location API");

            if( typeof location_data[0] != 'undefined'){
                var location_key = location_data[0].Key;
                var city = location_data[0].LocalizedName;
                var state = location_data[0].AdministrativeArea.ID;

                console.log("Accuweather : For " + city + ", " + state + " location key is : " + location_key );

                /*
                    using the location key query the current conditions
                    http://dataservice.accuweather.com/currentconditions/v1/38498_PC.json?apikey=S4fbM7IRIto4xbUxO2XPjkLqKVBLjw1P
                */

                var api_url = "http://dataservice.accuweather.com/currentconditions/v1/"+ location_key +".json?apikey=S4fbM7IRIto4xbUxO2XPjkLqKVBLjw1P";
                console.log("Accuweather currentconditions url : " + api_url );
                
                $.ajax({
                    type: "GET",
                    url: api_url,
                    dataType: "jsonp",
                    success: function(data){
                        console.log("Accuweather weather conditions: " + data[0].WeatherText);
                        console.log("Accuweather temperature " + data[0].Temperature.Metric.Value + " C.");
                        console.log("Accuweather temperature " + data[0].Temperature.Imperial.Value + " F.");
                        
                        $('#output-para-accuweather').append("<br>Location: " + zip + " , " + city + ", " + state );
                        $('#output-para-accuweather').append("<br>Weather conditions: " + data[0].WeatherText );
                        $('#output-para-accuweather').append("<br>Temperature: " + data[0].Temperature.Imperial.Value + " F (" + data[0].Temperature.Metric.Value +" C)")
                    },
                    error: function(data){
                            console.log("Accuweather : error in AJAX communication with webservice to get weather conditions.");
                            $('#output-para-accuweather').append("<br><b>Error</b> in communication with Accuweather webservice.");
                    }
                });
            }
            else{
                console.log("Accuweather : No location data received.");
                $('#output-para-accuweather').append("<br><b>Error</b> no location data received.");
            }

        },
        error: function(location_data){
            console.log("Accuweather : error in AJAX communication with webservice to get location key.");
            $('#output-para-accuweather').append("<br><b>Error</b> in communication with Accuweather webservice.");
        }
    });
}


function getWeatherFromOpenWeatherMap( zip ){
    console.log("Getting weather from Open Weather Map for zip code: " + zip);
    $('#output-para-openweathermap').text("Getting weather from Open WeatherMap for zip code: " + zip);
    
    /*
    example url : https://api.openweathermap.org/data/2.5/weather?zip=92128,us&units=imperial&APPID=3ca9a7b827b7d7d512ee9784fe4af046
    */

    var api_url = "https://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us&units=imperial&APPID=3ca9a7b827b7d7d512ee9784fe4af046";
    console.log("Open WeatherMap api url : " + api_url);

    $('#output-para-openweathermap').html("<br><b>Weather from Open WeatherMap");

    $.ajax({
            type:"GET",
            url: api_url,
            dataType: "jsonp",
            success: function(data) {
                if( data.cod == 200 ){
                    console.log("Location : " + zip + " , " + data.name );
                    console.log("Current weather conditions : " + data.weather[0].description );
                    console.log("Current temperature : " + data.main.temp + " F." );
                    $('#output-para-openweathermap').append("<br>" + "Location : " + zip + " , " + data.name );
                    $('#output-para-openweathermap').append("<br>" + "Current weather conditions : " + data.weather[0].description );
                    $('#output-para-openweathermap').append("<br>" + "Current temperature : " + data.main.temp + " F."  );
                }
                else{
                    console.log("Open WeatherMap, error code: " + data.cod + " error message : " + data.message);
                    $('#output-para-openweathermap').append("<br>Open WeatherMap, error code: " + data.cod + " error message : " + data.message );
                }
            },
            error: function(data){
                console.log("Error in making AJAX call to Open WeatherMap");
                $('#output-para-openweathermap').append("<br><b>Error</b> in communication with Open WeatherMap webservice.");
            }
    });
}


function getWeatherFromWeatherUnderground( zip ){
    console.log("Getting weather from Weather Underground for zip code: " + zip);
    $('#output-para-wunderground').text("Getting weather from Weather Underground for zip code: " + zip);

    /*
    example url : http://api.wunderground.com/api/0052a76b721c5231/conditions/q/92128.json
    */
    var api_url = "http://api.wunderground.com/api/0052a76b721c5231/conditions/q/"+ zip +".json";
    console.log("Weather Underground api url : " + api_url);

    $('#output-para-wunderground').html("<br><b>Weather from Weather Underground");

    $.ajax({
            type: "GET",
            url: api_url,
            dataType: "jsonp",
            success: function(data){
                
                if( typeof data.response.error != 'undefined') {
                    console.log("Error received from Weather Underground webservice : " + data.response.error.description );
                    $('#output-para-wunderground').append("<br><b>Error:</b> " + data.response.error.description );
                }
                else{
                    console.log("Location : " + zip + " , " + data.current_observation.display_location.full );
                    console.log("Observation location : " + data.current_observation.observation_location.full );
                    console.log("Current weather conditions : " + data.current_observation.weather );
                    console.log("Current temperature : " + data.current_observation.temperature_string);

                    
                    $('#output-para-wunderground').append("<br>" + "Location : " + data.current_observation.display_location.zip + " , " + data.current_observation.display_location.full );
                    $('#output-para-wunderground').append("<br>" + "Observation location : " + data.current_observation.observation_location.full );
                    $('#output-para-wunderground').append("<br>" + "Current weather conditions : " + data.current_observation.weather );
                    $('#output-para-wunderground').append("<br>" + "Current temperature : " + data.current_observation.temperature_string );                    
                }
            },
            error: function(data){
                console.log("Error in making AJAX call to Weather Underground");
                $('#output-para-wunderground').append("<br><b>Error</b> in communication with Weather Underground webservice.");
            }
    });
}


function getWeatherFunc(){
    var zip = $('#input-zipcode').val().trim();
    console.log("user input zip code : " + zip);

    if( zip === "" ) {
        console.log("Empty zip code, please enter valid US zip code.")
        $('#output-para-common').text('Empty zip code, please enter valid US zip code.')
    }
    else{
        $('#output-para-common').html("<b>Weather for zip code <font color='blue'>" + zip + "</font> from following multiple services." )

        getWeatherFromAccuweather(zip);

        getWeatherFromOpenWeatherMap(zip);

        getWeatherFromWeatherUnderground(zip);
    }
}

$('#button-getCurrentWeather').click( function() {
    getWeatherFunc();
});
