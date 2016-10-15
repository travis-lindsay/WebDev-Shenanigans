//Ideas from https://gist.github.com/electricg/4372563
//Class function for the stopwatch variable
var	timerClass = function() {
		//The classes private variables
		var	startTime	= 0;	// Time of start

		var	rightNow = function() {
				return (new Date().getTime()); 
			}; 
 
		// Public methods
		this.startTimer = function() {
				startTime	= rightNow();
			};

		// Reset
		this.reset = function() {
				startTime = 0;
			};

		// Duration
		this.time = function() {
				return (startTime ? rightNow() - startTime : 0); 
			};
	};
//Global variables and such
var x = new timerClass();
var time;
var clocktimer;

function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );

	newTime = pad(m, 2) + ':' + pad(s, 2);
	return newTime;
}

function showTimer() {
	time = document.getElementById('time');
	update();
}

function update() {
	time.innerHTML = formatTime(x.time());
}

function startTimer() {
    //Sets the update function to run every 1000milliseconds
    //Or every second...Then calls the startTimer function
	clocktimer = setInterval("update()", 1000);
	x.startTimer();
}

/*function stop() {
	x.stop();
	clearInterval(clocktimer);
}*/
function pause() {
    //this stops the interval at which the clock is updating
    clearInterval(clocktimer);
}

function reset() {
    clearInterval(clocktimer);
	x.reset();
	update();
}