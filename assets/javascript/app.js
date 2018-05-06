window.onload = function() {
    $( "#start" ).click( timer.start );
};


// Gobal Variables
var intervalId;
var running = false;


// The timer object keeps track of remaining time in each round
var timer = {
    remaining: 10,


    count: function() {
        timer.remaining--;

        var $timeRem = $( "#time-remaining " );
        $timeRem.text( "Time remaining: " + timer.remaining );

        if( timer.remaining === 0 ) {
            timer.timesUp();
        }
    },


    start: function() {
        if (!running) {
            intervalId = setInterval(timer.count, 1000);
            running = true;
            $( "#start" ).hide();
        }
    },


    stop: function() {
        clearInterval(intervalId);
        running = false;
    },


    timesUp: function() {
        clearInterval(intervalId);
        running = false;
        
        var $timeUp = $( "<h4>" );
        $timeUp.text( "Time's up!" );
        $( "#time" ).append( $timeUp );
    },
};

