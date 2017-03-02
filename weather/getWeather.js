function getWeatherFunc()
{
    var  zip = $('#input-zipcode').val().trim();
    
    if(zip === "" )
    {
        $('#output-para').text('Please enter valid US zipcode.');
    }
    else
    {
        $('#output-para').text('Loading...');
        
        //Example : http://api.wunderground.com/api/a242d5267833f7b8/conditions/q/92128.json
        // 'a242d5267833f7b8' is my private api key from wunderground.com
        
        var api_url = "http://api.wunderground.com/api/a242d5267833f7b8/conditions/q/"+ zip +".json";
        console.log('Value of query url : ' + api_url );
        
        $.ajax({
            type: "GET",
            url: api_url,
            dataType: "jsonp",
            success: function(data){
                    var display_location_full = data.current_observation.display_location.full;
                    var observation_location_full = data.current_observation.observation_location.full;
                    var current_weather = data.current_observation.weather;
                    var temperature_string = data.current_observation.temperature_string;
                    var icon_url = data.current_observation.icon_url;
                    
                    $('#output-para').html('<b>Current weather conditions for ' + display_location_full + ' ' + zip );
                    
                    $('#output-para').append('<br>Observation location : '+ observation_location_full);
                    $('#output-para').append('<br>Current weather : '+ current_weather);
                    $('#output-para').append('<br>Current temperature : '+ temperature_string);
                    $('#output-para').append("<br><br><img src='"+icon_url+"'/>");
                }
        });
        
        //http://api.wunderground.com/api/a242d5267833f7b8/conditions/q/CA/San_Francisco.json

    }
    
    $('#input-zipcode').val('');
}



$('#getWeather-button').click( function() {
    getWeatherFunc();
    });