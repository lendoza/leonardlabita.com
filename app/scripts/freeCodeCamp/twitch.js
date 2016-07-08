$(document).ready(function(){
	
	(function(){
    var streams = ["FreeCodeCamp", "DevWars", "MedryBW", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"]

    var createStreamerList = function(streams){
    	var streamerItem;
    	var streamerList = '';
    	for (var i = 0; i < streams.length; i++) {
          streamerItem = '<li id="' + streams[i] + '" class="streamer-block"><a href="http://twitch.tv/' + streams[i] + '"><ul class="streamer-info clearfix"><li id="' + streams[i] + '-image" class="user-image"><img width="50px" height="50px" src="http://placehold.it/50x50" /></li><li id="' + streams[i] + '-name" class="user-name"></li><li id="' + streams[i] + '-status" class="user-status"><span class="glyphicon glyphicon-remove"></span></li><li id="' + streams[i] + '-description" class="user-description"></li></ul></a></li>';
          streamerList += streamerItem;
          }
        $('#streamerList').append(streamerList);
    };

    var injectStreamerData = function(streams){
    	var streamerId, channelsURL, streamsURL;
    	for (var i = 0; i < streams.length; i++) {
        		(function(i) {
          		streamerId = streams[i];
          		channelsURL = 'https://api.twitch.tv/kraken/channels/' + streamerId + '?callback=?';
          		streamsURL = 'https://api.twitch.tv/kraken/streams/' + streamerId + '?callback=?';
          
          	$.getJSON(channelsURL, function(channelResults) {        
            		$('#' + streams[i] + '-name').html(channelResults.display_name);
            	if (channelResults.logo !== null) {
            		$('#' + streams[i] + '-image img').attr("src", channelResults.logo);
            	}

            	if (channelResults.status !== null) {
              	if (channelResults.status.length > 36) {
              	var clippedStatus = channelResults.status.slice(0,34) + '...';
              	$('#' + streams[i] + '-description').html(clippedStatus).hide();
              }
            } 
          });

          $.getJSON(streamsURL, function(streamResults) {
            if (streamResults.stream !== null) {
              $('#' + streams[i] + '-status span').removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok');
              $('#' + streams[i] + '-description').show();
            }
          });

        	})(i);
      }
    };

    var tabSwitcher = function(){

    	$('#tabAll').click(function(){
    		$('#tabOnline, #tabOffline').removeClass('arrow');
    		$(this).addClass('arrow');
    		$('.streamer-block').show();
    	});

    	$('#tabOnline').click(function(){
    		$('#tabAll, #tabOffline').removeClass('arrow');
    		$(this).addClass('arrow');
    		$('streamer-block').show();
    		$('.glyphicon-remove').parents(".streamer-block").hide();

    	});

    	$('#tabOffline').click(function(){
    		$('#tabOnline, #tabAll').removeClass('arrow');
    		$(this).addClass('arrow');
    		$('.streamer-block').show();
    		$('.glyphicon-ok').parents(".streamer-block").hide();
    	});

    };

    var searchBar = function() {
      	$('#search').keyup(function(){
         		var valThis = $(this).val().toLowerCase();
          	if(valThis == ""){
              	$('#streamerList > li').show();           
          	} 
          	else {
              	$('#streamerList > li').each(function(){
                  	var text = $(this).attr('id').toLowerCase();
                  	(text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
          		});
         		};
      	});
    	};

	createStreamerList(streams);
	injectStreamerData(streams);
	tabSwitcher();
	searchBar();

  })()
	
});