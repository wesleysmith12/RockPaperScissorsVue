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
    log: []
  },
  methods: {
    test: function(){
      //alert("hello world");
    },
    startNew: function(){

        document.getElementById('startbtn').style.display = 'none';
        document.getElementById('gamebtns').style.display = 'block';

        //alert("Test");
    },
    rock: function(){
        var computer = Math.floor((Math.random() * 3) + 1);

        var logMsg = "";

        if(computer == 1){
            this.ties++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE ROCK | YOU HAVE TIED!";
        }else if(computer == 2){
            this.computerWins++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE PAPER | PAPER BEATS ROCK | COMPUTER WINS!";
        }else{
            this.userWins++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE SCISSORS | ROCK BEATS SCISSORS | PLAYER WINS!";
        }

        this.log.push(logMsg);

        this.checkWins();
    },
    paper: function(){

        var logMsg = "";

        var computer = Math.floor((Math.random() * 3) + 1);

        if(computer == 1){
            this.userWins++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE ROCK | PAPER BEATS ROCK | PLAYER WINS!";
        }else if(computer == 2){
            this.ties++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE PAPER | YOU HAVE TIED!";
        }else{
            this.computerWins++;
            this.gameCount++;
            logMsg = "COMPUTER CHOSE SCISSORS | SCISSORS BEATS PAPER | COMPUTER WINS!";
        }

        this.log.push(logMsg);

        this.checkWins();

    },
    scissors: function(){

        var logMsg = "";

        var computer = Math.floor((Math.random() * 3) + 1);

        if(computer == 1){
            logMsg = "COMPUTER CHOSE ROCK | ROCK BEATS SCISSORS | COMPUTER WINS!";
            this.computerWins++;
            this.gameCount++;
        }else if(computer == 2){
            logMsg = "COMPUTER CHOSE PAPER | SCISSORS BEATS ROCK | PLAYER WINS!";
            this.userWins++;
            this.gameCount++;
        }else{
            logMsg = "COMPUTER CHOSE SCISSORS | YOU HAVE TIED!";
            this.ties++;
            this.gameCount++;
        }

        this.log.push(logMsg);

        //alert("user: paper Scissors: " + computer);

        this.checkWins();

    },
    restart: function(){

        this.computerWins = 0;
        this.userWins = 0;

        document.getElementById('startbtn').style.display = 'block';
        document.getElementById('gamebtns').style.display = 'none';
    },
    checkWins: function(){
        if(this.computerWins == 10 || this.userWins == 10){
            alert("Computer Wins: " + this.computerWins + " User Wins: " + this.userWins);
            this.computerWins = 0;
            this.userWins = 0;
        }
    }
  }
});