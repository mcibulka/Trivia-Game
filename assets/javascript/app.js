window.onload = function() {
    $( "#start" ).click( timer.start );
    $( "#answers" ).click( game.checkAnswer );
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
        [ "Battle Pus", "Little Lion", "Ser Pounce", "Prince Fuzz Wuzz" ],
        [ "Ice", "Oathkeeper", "Widow’s Wail", "Northguard" ],
        [ "Tyrion Lannister", "King Joffrey", "Jaime Lannister", "Bronn" ],
        [ "Pride in Drawing Blood First", "Knowledge of Poisons", "Attacks at Night", "Ruby-Coloured Armour" ],
        [ "Valyrian Steel", "Blue Ice", "Dragonglass", "Obsidian" ],
        [ "Three", "Five", "Two", "Four" ]
    ],
    
    answers: [
        "Sand",
        "Battle Pus",
        "Ice",
        "Bronn",
        "Knowledge of Poisons",
        "Dragonglass",
        "Four"
    ],

    explanation: [
        "So unstable that even strong sunlight can set it ablaze, Wildfire is an extremely volatile substance that can only be extinguished with copious amounts of sand.",
        "In Season 4, Ser Pounce is introduced. Its appearance caused something of a stir on the Internet, with fans demanding Ser Pounce be featured in future episodes. According to one writer that likely won't happen, \"I will say that cat was a nightmare to work with.\"",
        "Ice was the official sword of the Lord of Winterfell, forged from Valyrian steel and handed down over the ages. At the end of Season 1, it was melted down to forge two new swords – Oathkeeper and Widow's Wail.",
        "After a signal from Tyrion, Bronn shoots a flaming arrow into a floating trap of wildfire around Stannis Baratheon's fleet. The explosion that follows destroys dozens of ships and effectively wins the battle for King Joffrey.",
        "Oberyn Martell is skilled not only in combat, but also in the use of deadly potions. In the battle against Ser Gregor Clegane that ultimately cost him his life, Martell managed to severely wound 'The Mountain' with a spear tip coated in poisonous Manticore venom.",
        "In Season 6, it's revealed that the Children of the Forest created the White Walkers during a war with the First Men. During a vision, Bran sees one of the children force a Dragonglass dagger into the chest of a captive First Man. He then transforms into the Night King.",
        "At the beginning of \"The Battle of the Bastards,\" Ramsay Bolton tells Rickon Stark to run across the battlefield towards Jon Snow. In a cruel twist, Ramsay then begins shooting arrows at him. Despite Rickon's best efforts, the fourth arrow finds its mark and ends his life."
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

        $( "#answers" ).empty();
        var $ul = $( "<ul>" ).addClass( "list-group" );

        for( var i = 0 ; i < setLen ; i++ ) {
            var $div = $( "<div>" ).addClass( "list-group-item choice" );
            $div.attr( "data-answer", currSet[i] );
            
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
    },


    nextQuestion: function() {
        game.currQuestion++;

        if( game.currQuestion < game.questions.length ) {
            game.loadQuestion();
            timer.start();
        }
        else {
            console.log( "END" );
        }
    },


    checkAnswer: function() {
        var answer = $(this).attr("data-answer");
        console.log(this);
    }
};


// The timer object keeps track of remaining time in each round
var timer = {
    remaining: 10,


    count: function() {
        timer.remaining--;
        $( "#time-remaining " ).text( "Time Remaining: " + timer.remaining );

        if( timer.remaining === 0 ) {
            timer.timesUp();
        }
    },


    start: function() {
        $( "#start" ).hide();
        $( "#time" ).empty();

        var $timeRem = $( "<h4>" ).attr( "id", "time-remaining" ).text( "Time Remaining: 10" );
        $( "#time" ).append( $timeRem );

        if (!running) {
            intervalId = setInterval( timer.count, 1000 );
            running = true;

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
        timer.remaining = 10;

        var $timeUp = $( "<h4>" ).text( "Time's up!" );
        $( "#time" ).append( $timeUp );

        game.displayAnswer();
        setTimeout( game.nextQuestion, 10000 );
    },
};


