$(document).ready(function(){

  var Weather = (function(){
      var site = "https://api.wunderground.com/api/";
      var API_KEY = "ee040adfdaed58a4";
      var tenDay = "/geolookup/forecast10day/q/autoip"
      var format = ".json"
      var url = site + API_KEY + tenDay + format;

     $.ajax({
          type: 'GET',
          url: url,
          async: false,
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(weather) {
            var fiveDay = "";
            var forecast = weather.forecast.simpleforecast.forecastday;
            var location = weather.location;
            
            html = '<h1>' + location.city + ', ' + location.state + '</h1>';
            html += '<h2>' + forecast[0].high.fahrenheit + '&deg;' + 'F' + '</h2>';
            // html += '<ul><li>' + forecast[0].date.monthname + ' ' + forecast[0].date.day + ', ' + forecast[0].date.year + '</li>';
            html += '<ul><li>' + 'Last Updated: ' + forecast.date + '</li>';
            html += '<li class="currently">' + forecast[0].conditions + '</li>';
            html += '<li id="change">' + forecast[0].high.celsius + '&deg;C</li></ul>';
            
            for(var i = 1; i < 6; i++) {
              fiveDay += '<li><h6>' + forecast[i].date.weekday_short + '</h6>';
              fiveDay += '<img src=' + forecast[i].icon_url + ">";
              fiveDay += '<p>' + forecast[i].high.fahrenheit + '&deg;' + 'F' + ' | ' + forecast[i].low.fahrenheit + '&deg;' + 'F' + '<p></li>';
            }
        
            $("#weather").html(html);
            $("#five-day").html(fiveDay);
          },
          error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
          }
      });
     
  })();

});