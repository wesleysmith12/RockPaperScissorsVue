new Vue({
  el: '#app',
  data: {
    computerWins: 0,
    userWins: 0,
    ties: 0,
    gameCount: 0,
    width: 0,
    userGuess: "",
    computerGuess: "",
    log: [],
    computerMoves: [],
    userMoves: [],
    gameTime: 0,
    guessIndex: 100,
    computerThrowCount: 100,
    count: 0,
    highScoreRounds: -1,
    highScoreTime: -1,
    timeouts: [],
    gameStarted: false
  },
  methods: {
    startNew: function(){

        // show green completion bars
        this.gameStarted = true;

        // reset variables
        this.guessIndex = 0;
        this.computerThrowCount = 0;

        // user start time
        this.gameTime = new Date().getTime() / 1000;

        // hide start button and show buttons
        document.getElementById('startbtn').style.display = 'none';
        document.getElementById('gamebtns').style.display = 'block';

        //show div that displays computer generated choice
        document.getElementById('computerMoves').style.display = 'block';

        // generate computer throw
        this.generateThrow();

        //display throws
        this.getThrows();

    },
    generateThrow: function(){

        // generate random number for computer throw
        this.computerMoves.push(Math.floor((Math.random() * 3) + 1));

        // clear so user has to re-enter what computer generated
        this.userMoves = [];

        // add to total computer throws
        this.computerThrowCount++;

    },
    getThrows: function(){
        for(var i = 0; i < this.computerMoves.length; i++){

            // display throws at one second intervals
            this.timeouts.push(setTimeout(this.display, i*1000, this.computerMoves[i], i+1));
        }

    },
    display: function(computerThrow, throwNum){

        //display the computer's throws
        switch(computerThrow) {
            case 1:
                document.getElementById('image').src='rock.jpg';
                break;
            case 2:
                document.getElementById('image').src='paper.jpg';
                break;
            case 3:
                document.getElementById('image').src='scissors.jpg';
                break;
            default:
                alert("there was an error with the computer generated throw");
        }

        this.count = throwNum;

    },
    compareThrows: function(){

        this.guessIndex++;

        // compare user choices to computer choices
        for(var i = 0; i < this.userMoves.length; i++){

            if(this.userMoves[i] == 1){

                if(this.computerMoves[i] == 3){
                    //user selected correct option
                    if(this.userMoves.length == this.computerMoves.length){
                        this.timeouts.push(setTimeout(this.resetGuessIndex, 1000));
                        return;
                    }

                }else{
                    //user selected wrong option
                    this.gameTime = (new Date().getTime() / 1000) - this.gameTime;
                    //alert("wrong User Move: " + this.userMoves[this.userMoves.length-1] + " Computer Move: " + this.computerMoves[this.computerMoves.length-1]);
                    this.updateLog(2);
                    this.checkHighScore();
                    this.guessIndex = 0;
                    return;
                }
            }else if(this.userMoves[i] == 2){
                if(this.computerMoves[i] == 1){
                    //user selected correct option
                    if(this.userMoves.length == this.computerMoves.length){
                        this.timeouts.push(setTimeout(this.resetGuessIndex, 1000));
                        return;
                    }

                }else{
                    //user selected wrong option
                    this.gameTime = (new Date().getTime() / 1000) - this.gameTime;
                    //alert("wrong User Move: " + this.userMoves[this.userMoves.length-1] + " Computer Move: " + this.computerMoves[this.computerMoves.length-1]);
                    this.updateLog(2);
                    this.checkHighScore();
                    this.guessIndex = 0;
                    return;
                }
            }else{
                if(this.computerMoves[i] == 2){
                    //user selected correct option
                    if(this.userMoves.length == this.computerMoves.length){
                        this.timeouts.push(setTimeout(this.resetGuessIndex, 1000));
                        return;
                    }

                }else{
                    //user selected wrong option
                    this.gameTime = (new Date().getTime() / 1000) - this.gameTime;
                    //alert("wrong User Move: " + this.userMoves[this.userMoves.length-1] + " Comupter Move: " + this.computerMoves[this.computerMoves.length-1]);
                    this.updateLog(2);
                    this.checkHighScore();
                    this.guessIndex = 0;
                    return;
                }
            }

        }

    },
    resetGuessIndex: function(){
        this.guessIndex = 0;
        this.generateThrow();
        this.getThrows();
        this.updateLog(1);
    },
    updateLog: function(x){

        if(!this.gameStarted){

            this.log.unshift({
                msg:"GAME IS OVER | PRESS RESTART TO PLAY AGAIN",
                playerwin: false
            });

        }else if(x == 1){
            this.log.unshift({
                msg:"COMPLETED ROUND " + (this.computerMoves.length -1),
                playerwin: true
            });
        }else{

            this.gameStarted = false;

            this.log.unshift({
                msg:"GAME OVER | ROUNDS COMPLETED " + (this.computerThrowCount - 1),
                playerwin: false
            });
        }

    },
    rock: function(){

        // record user choice
        this.userMoves.push(1);

        this.compareThrows();

    },
    paper: function(){

        // record user choice
        this.userMoves.push(2);

        this.compareThrows();

    },
    scissors: function(){

        // record user choice
        this.userMoves.push(3);

        this.compareThrows();

    },
    restart: function(){

        // disable timeouts
        for (var i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
        // clear list
        this.timeouts = [];

        // calculate end time
        this.gameTime = new Date().getTime() / 1000;

        // reset variables
        this.computerWins = 0;
        this.userWins = 0;
        this.computerMoves = [];
        this.userMoves = [];
        this.gameTime = 0;
        this.userGuess = 0;
        this.count = 0;
        this.log = [];
        this.computerThrowCount = 0;
        this.gameStarted = false;

        // generate computer throw
        //this.generateThrow();

        //display throws
        //this.getThrows();

        document.getElementById('startbtn').style.display = 'block';
        document.getElementById('gamebtns').style.display = 'none';

        // hide computer generated throws div
        document.getElementById('computerMoves').style.display = 'none';
    },
    checkHighScore: function(){

        // dont record high scores if they don't pass the first round
        if(this.computerThrowCount == 1){
            return;
        }

        // check to see if there is a high score
        if(this.highScoreRounds > this.computerThrowCount || this.highScoreRounds == -1){
            if(this.gameTime < this.highScoreTime || this.highScoreTime == -1){
                this.highScoreRounds = this.computerThrowCount;
                this.highScoreTime = this.gameTime;

                // add to log
                this.log.unshift({
                    msg:"NEW HIGH SCORE | ROUNDS " + (this.highScoreRounds - 1) + " | TIME " + this.highScoreTime.toFixed(2),
                    playertie: true
                });

            }
        }
    }
  }
});