// Define CONSTANTS
var CLK_INTERVAL = 1000; // duration between each clockTicks (ms)

var WORK_TIME = 25 * 60; // default WORK duration (sec)
var REST_TIME = 5 * 60; // default REST duration (sec)

var WORK_SET = 25 * 60; // default WORK duration to adjust (sec)
var REST_SET = 5 * 60; // default REST duration to adjust (sec)

var INITIAL_STATE = 0; // INITIAL state
var WORKING_STATE = 1; // WORKING state
var RESTING_STATE = 2; // RESTING state
var PAUSE_WORK_STATE = -1; // PAUSED  state (while WORKING)
var PAUSE_REST_STATE = -2; // PAUSED  state (while RESTING)
var ALARM_WORK_STATE = -3; // ALARM   state (WORKING DONE)
var ALARM_REST_STATE = -4; // ALARM   state (RESTING DONE)

// Initialize audio files & object
var wav = 'http://www.oringz.com/oringz-uploads/sounds-800-classic-ringer.mp3';
var audio = new Audio(wav);
audio.loop = true;

// Declare variables
var time = 0;
var state = INITIAL_STATE;

$("#clock").click(start());

//*********************************************************************
$("document").ready(function() {

  state = INITIAL_STATE;
  time = WORK_TIME; // Reset Timer
  changeTime(0, 1);
  changeTime(0, 2);
  update();

})

//*********************************************************************
// Updates objects displayed on webpage
//*********************************************************************
function update() {
  $("#time").text(formatTime(time, 1));

  if (state == 0) {
    $("#status").text("POMODORO CLOCK");
    $("body").css("background-color", "#048BA8");
  } else if (state == 1) {
    $("#status").text("WORKING");
    $("body").css("background-color", "#048BA8");
  } else if (state == 2) {
    $("#status").text("RESTING");
    $("body").css("background-color", "#78C932");
  } else if (state < -2) {
    $("#status").text("ALARM!!!");
    $("body").css("background-color", "#FFBF00");
  } else {
    $("#status").text("PAUSED!");
  }
}

//*********************************************************************
// Binded to main BUTTON
//*********************************************************************
function start() {

  // INITIAL state ( 0 )
  if (state == INITIAL_STATE) {

    state = WORKING_STATE;
    time = WORK_TIME;
    update();
    setTimeout(clockTick, CLK_INTERVAL); // Calls clockTick() after CLK_INTERVAL amount of time 

  }
  // ALARM states ( -3 or -4 )
  else if (state < -2) {

    audio.pause(); // Stops & resets the AUDIO LOOP    
    audio.currentTime = 0;
    $("#clock").removeClass("hvr-buzz").addClass("hvr-grow"); // Stops image from shaking

    if (state == ALARM_WORK_STATE) { // Configure values to exit from ALARM State
      state = RESTING_STATE;
      time = REST_TIME;
      update();
    } else {
      state = WORKING_STATE; // Configure values to exit from ALARM State
      time = WORK_TIME;
      update();
    }

    setTimeout(clockTick, CLK_INTERVAL); // Calls clockTick() after CLK_INTERVAL amount of time 

  }
  // WORKING/RESTING state ( +/- 1 or 2 )
  else {

    // Prevent glitching when user spams button right b4 timer reaches 0
    if (time <= 1)
      return;

    state *= -1; // Multiply by -1 to toggle between PAUSE & UNPAUSE states
    update(); // Update objects displayed on webpage

    if (state > 0) // Clock ticks only when state number is POSITIVE
      setTimeout(clockTick, CLK_INTERVAL); // Calls clockTick() after CLK_INTERVAL amount of time    

  }
}

//*********************************************************************
// Function being called every clock tick
//*********************************************************************
function clockTick() {

  if ((time > 0) && (state > 0)) { // Clock ticks only when state number is POSITIVE
    time--; // Decrements the clock
    update();

    if (time > 0)
      setTimeout(clockTick, CLK_INTERVAL); // Calls clockTick() after CLK_INTERVAL amount of time    
  }

  if (time <= 0) {
    state *= -1 // Change to ALARM state (some fancy algoritm)
    state -= 2 // (some fancy algoritm)
    update();
    audio.play(); // Play ALARM tone
    $("#clock").removeClass("hvr-grow").addClass("hvr-buzz"); // Make image shake
    return;
  }

}

//*********************************************************************
// Converts the time (in seconds) into MM:SS format
//*********************************************************************
function formatTime(time) {

  var minutes = Math.floor(time / 60);
  var seconds = time - (minutes * 60);

  if (seconds.toString().length == 1) {
    seconds = "0" + seconds;
  }

  return (minutes + ":" + seconds)
}

//*********************************************************************
// Changes the WORK & REST duration of the CLOCK
//*********************************************************************
function changeTime(changeValue, OpCode) {

  // Setting OpCode as 1 means that we're adjusting the WORK duration
  if (OpCode == 1) {

    // Only change the duration if it's going to be within 0:00 to 60:00
    if ((WORK_SET + changeValue > 0) && (WORK_SET + changeValue < 3600)) {

      WORK_SET += (changeValue * 60); // Adjust duration based on CHANGEVALUE
      $("#Set_WORK").text(WORK_SET / 60); // Display new value on the adjust button (in mins)
      WORK_TIME = WORK_SET; // Update time with the adjusted value

      if ((state == 1) || (state == -1) || (state == 0)) // IF we're in INITIAL_STATE/WORKING_STATE/PAUSE_WORK_STATE state
        time = WORK_TIME; // Update the current time
      update();
    }
  }
  // Setting OpCode as 2 means that we're adjusting the REST duration (Pretty much the same as above)
  else {
    if ((REST_SET + changeValue > 0) && (REST_SET + changeValue < 3600)) {
      REST_SET += (changeValue * 60);
      $("#Set_REST").text(REST_SET / 60);
      REST_TIME = REST_SET;
      if ((state == 2) || (state == 2))
        time = REST_TIME;
      update();
    }
  }
}