// var switcher = document.querySelector("#switcher");
// var changeColor = function (event) {
//   document.body.className = (event.target.className);
// }
// switcher.addEventListener("click", changeColor);
//
// Client Specs
//
// When "Start" is clicked, the text "Stop Watch" should be replaced by "Time elapsed: 0", and the count should increment every second.
// When "Reset" is clicked, the text should return to "Stop Watch"
// When "Pause" is clicked, the text should say "Time elapsed: 1", but stop incrementing.

// Directions
//
// Spend 10 minutes looking at JavaScript Timers, then check out the specific documentation for setInterval and clearInterval.
// Take It Step By Step
// This is a tough assignment, so don't stress over meeting all the requirements. Just take it step by step and try to meet the benchmarks below in order.
//
// Create Javascript selectors that target each of the timer buttons.
// Create click handlers (empty, for now) for each of the timer buttons.
// Instantiate seconds and timerId variables for your timer. The latter will make more sense after reading up on setInterval().
// Create an updateTime() function that increments the seconds counter and inserts that value into the <h1> element with id="timer".
// Inside your click handler for the start button...
// Replace "Stop Watch" in the HTML with the content of the seconds variable.
// Use setInterval() to increment the timer by 1 every second.
// Inside your click handler for the pause button...
// Stop -- but do not reset! -- the timer using clearInterval().
// Once again, inside your click handler for the start button...
// Make sure the timer starts back up when you hit the "Start" button after hitting "Pause".
// Inside your click handler for the reset button...
// Stop the timer using clearInterval().
// Reset the timer.
// Replace the time in your HTML with the original "Stop Watch" text.
// Bonus
//
// Reformat your timer so that everything in your timers.js file -- variables and functions -- are part of a global object. It would look something like...
//
//   // Start of .js file
//
//   var timer = {
//     // All your code goes in here...
//   }

// var resetButton = document.querySelector("#reset");
// var startButton = document.querySelector("#start");
// var pauseButton = document.querySelector("#pause");
// var timerH1 = document.querySelector("#timer");
// var seconds = 0;
// var timerId = null;
//
// var updateTime = function(){
//   seconds++;
//   timerH1.textContent = "Time elapsed: " + seconds;
// };
//
// var startListener = startButton.addEventListener("click", function () {
//   if (timerId===null) {
//     timerId = setInterval(updateTime, 1000);
//   }
// });
//
// var pauseListener = pauseButton.addEventListener("click", function () {
//   var pauseClickHandler = function(){
//     clearInterval(timerId);
//     timerId = null;
//
//   };
// });
//
// var resetListener = resetButton.addEventListener("click", function () {
//   var resetClickHandler = function(){
//     seconds = 0;
//     clearInterval(timerId);
//     timerH1.textContent = "Stop Watch";
//     timerId = null;
//   };
// });

var timer = {
  resetButton : document.querySelector("#reset"),
  startButton : document.querySelector("#start"),
  pauseButton : document.querySelector("#pause"),
  timerH1 : document.querySelector("#timer"),
  seconds : 0,
  timerId : null,

  updateTime : function(){
    this.seconds++;
    this.timerH1.textContent = "Time elapsed: " + this.seconds;
  },

  startListener : function() {
    timer.startButton.addEventListener("click", function () {
      if (timerId===null) {
        timer.timerId = setInterval(this.updateTime.bind(this), 1000);
      }
    });
  }.bind(this),
  pauseListener : function() {
    this.pauseButton.addEventListener("click", function () {
      var pauseClickHandler = function(){
        clearInterval(this.timerId);
        this.timerId = null;
      };
    });
  }.bind(this),
  resetListener : function () {
    this.resetButton.addEventListener("click", function () {
      var resetClickHandler = function(){
        this.seconds = 0;
        clearInterval(this.timerId);
        this.timerH1.textContent = "Stop Watch";
        this.timerId = null;
      };
    });
  }.bind(this),
};

timer.startListener();
timer.pauseListener();
timer.resetListener();
