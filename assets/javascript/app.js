window.onload = function() {
    $( "#start" ).click( timer.start );
};


// Gobal Variables
var intervalId;
var running = false;



var game = {
    currQuestion: 0,


    questions: [ 
        "What is the only thing that can put out volatile Wildfire?",
        "What is the name of King Tommen's favorite cat?",
        "What was the name of Ned Stark's great sword?",
        "Who shoots the flaming arrow that subsequently destroys Stannis' fleet in Blackwater Bay?",
        "Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:",
        "The Night King was created using a dagger made of:",
        "How many arrows does Ramsay Bolton let loose at Rickon Stark?"
    ],
    
    answerSets: [
        [ "Sand", "Water", "Dragon's Blood", "Sunlight" ],
        [ "Battle Pus", "Little Lion", "Ser Pounce", "Prince Fuzz Wuzz" ]
    ],
    
    answers: [
        "Sand",
        "Battle Pus" 
    ],

    explanation: [
        "So unstable that even strong sunlight can set it ablaze, Wildfire is an extremely volatile substance that can only be extinguished with copious amounts of sand.",
    ],


    displayAnswer: function() {
        $( "#explanation" ).show();
        $( "#answer" ).css( "border", "1.5pt solid green" );
    },


    loadQuestion: function() {
        $( "#question" ).text( this.questions[ this.currQuestion ] );

        // assign to variable for easier readability
        var currSet = this.answerSets[ this.currQuestion ];
        var setLen = this.answerSets[ this.currQuestion ].length;   // get the number of answers in the answer set

        var answerIndex = currSet.indexOf( this.answers[this.currQuestion] );   // find answer to add explanation

        var $ul = $( "<ul>" ).addClass( "list-group" );

        for( var i = 0 ; i < setLen ; i++ ) {
            var $div = $( "<div>" ).addClass( "list-group-item" );
            var $h4 = $( "<h4>" ).text( currSet[i] );
            $div.append( $h4 );

            if( i === answerIndex ) {
                var $p = $( "<p>" ).attr( "id", "explanation" ).text( this.explanation[this.currQuestion] ).hide();
                $div.attr( "id", "answer" );
                $div.append( $p );
            }

            $ul.append( $div );
        }

        $( "#answers" ).append( $ul );
    }
};




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
            intervalId = setInterval( timer.count, 1000 );
            running = true;

            $( "#start" ).hide();
            game.loadQuestion();
        }
    },


    stop: function() {
        clearInterval( intervalId );
        running = false;
    },


    timesUp: function() {
        clearInterval( intervalId );
        running = false;
        
        var $timeUp = $( "<h4>" );
        $timeUp.text( "Time's up!" );
        $( "#time" ).append( $timeUp );

        game.displayAnswer();
    },
};

