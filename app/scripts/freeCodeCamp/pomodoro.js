var Pomodoro = (function(){

	// Settings
	var session_len = 25;
  	var break_len = 5;
  	var clock_min = session_len;
  	var clock_sec = 0;
  	var isStop = true;
  	var interval;

  	// Cache DOM
  	var $al = $(".inner");
	var $clock_time = $al.find(".clock-time");
	var $clock_text = $al.find(".clock-text");
	var $middle = $al.find(".middle");
	var $el = $(".button-container");
	var $ctrl = $el.find(".ctrl");
	var $break_time = $el.find(".break-time");
	var $break_plus = $el.find(".break-plus");
	var $break_min = $el.find(".break-min");
	var $session_time = $el.find(".session-time");
	var $session_plus = $el.find(".session-plus");
	var $session_min = $el.find(".session-min");

	// Bind Events
	$ctrl.on("click", startStop);
	$break_min.on("click", breakMin);
	$break_plus.on("click", breakPlus);
	$session_min.on("click", sessionMin);
	$session_plus.on("click", sessionPlus);

	function startClock(){
		if(clock_min !== 0 && clock_sec === 0) {
	      	clock_sec = 59;
	      	clock_min = clock_min - 1;
	      	updateTime();
	    }
	    else if (clock_min === 0 && clock_sec === 0) {
	      	if($(".clock-text").text() === "Session") {
	        	$(".clock-text").text("Break");
	        	clock_min = break_len;
	        	updateTime();
	        	playAlarm();
	      	}
	      	else {
	        	isStop = true;
	        	updateCtrlButton();
	        	$(".clock-text").text("Session");
	        	clock_min = session_len;
	        	updateTime();
	        	clearInterval(interval);
	        	pauseTicking();
	      	}
	    }
	   	else {
	      	clock_sec = clock_sec - 1;
	      	updateTime();
	    }
	}

	function startStop(){
		isStop = !isStop;
	    updateCtrlButton();
	    if(!isStop) {
	      	interval = setInterval(startClock, 1000);
	      	playTicking();
	    }
	    else {
	      	isStop = true;
	      	updateCtrlButton();
	     	$(".clock-text").text("Session");
	      	clock_min = session_len;
	      	clock_sec = 0;
	      	updateTime();
	      	$(".middle").css("background" , "linear-gradient(to bottom, rgba(255,255,255,1) 100%, rgba(254,51,50,1) 0%, rgba(254,51,50,1) 0%)");
	      	clearInterval(interval);
	      	pauseTicking();
	   	}
	}

	function updateTime(){
		var min = clock_min;
    	var sec = clock_sec;
    
    	if(min < 10){
      		min = "0" + min;
    	}
    	if(sec < 10){
      		sec = "0" + sec;
    	}
    	$(".clock-time").text(min + ":" + sec);
	}

	function breakMin(){
		if(isStop && break_len > 1) {
	      	break_len = break_len - 1;
	      	$(".break-time").text(break_len);
	    }
	}

	function breakPlus(){
		if(isStop) {
	      	break_len = break_len + 1;
	      	$(".break-time").text(break_len);
	    }
	}

	function sessionMin(){
		if(isStop && session_len > 1) {
	      	session_len = session_len - 1;
	      	clock_min = session_len;
	      	updateTime();
	      	$(".session-time").text(session_len);
	    }
	}

	function sessionPlus(){
		if(isStop) {
	      	session_len = session_len + 1;
	      	clock_min = session_len;
	      	updateTime();
	      	$(".session-time").text(session_len);
	    }
	}

	function updateCtrlButton(){
		if(isStop) {
	      	$(".ctrl").removeClass("btn-danger");
	      	$(".ctrl").addClass("btn-success");
	      	$(".ctrl").text("Start");
	    }
	    else {
	      	$(".ctrl").removeClass("btn-success");
	      	$(".ctrl").addClass("btn-danger");
	      	$(".ctrl").text("Stop");
	    }
	}

	function fillCircle(){
		var total_sec = ($(".clock-text").text() === "Session") ? session_len * 60 : break_len * 60;
	    var current_sec = (clock_min) * 60 + clock_sec;
	    var percentage = (current_sec/total_sec) * 100;
	    $(".middle").css("background" , "linear-gradient(to bottom, rgba(255,255,255,1) "+percentage+"%, rgba(254,51,50,1) 0%, rgba(254,51,50,1) 0%)");
	}

	function playTicking(){
		var ticking = document.getElementById("ticking");
	    ticking.play();
	}

	function pauseTicking(){
		var ticking = document.getElementById("ticking");
	    ticking.pause();
	    ticking.currentTime = 0;
	}

	function playAlarm(){
		var alarm = document.getElementById("alarm");
	    alarm.play();
	}

})()