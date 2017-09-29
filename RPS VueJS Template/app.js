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

        if(computer == 1){
            this.ties++;
            this.gameCount++;
            this.log.unshift({
                msg:"COMPUTER CHOSE ROCK | YOU HAVE TIED!",
                playertie: true
            });

        }else if(computer == 2){
            this.computerWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE PAPER | PAPER BEATS ROCK | COMPUTER WINS!",
                playerwin: false
            });

        }else{
            this.userWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE SCISSORS | ROCK BEATS SCISSORS | PLAYER WINS!",
                playerwin: true
            });
        }

        this.checkWins();
    },
    paper: function(){
        
        var computer = Math.floor((Math.random() * 3) + 1);

        if(computer == 1){
            this.userWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE ROCK | PAPER BEATS ROCK | PLAYER WINS!",
                playerwin: true
            });

        }else if(computer == 2){
            this.ties++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE PAPER | YOU HAVE TIED!",
                playertie: true
            });

        }else{
            this.computerWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE SCISSORS | SCISSORS BEATS PAPER | COMPUTER WINS!",
                playerwin: false
            });
        }

        this.checkWins();

    },
    scissors: function(){

        var logMsg = "";

        var computer = Math.floor((Math.random() * 3) + 1);

        if(computer == 1){
            this.computerWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE ROCK | ROCK BEATS SCISSORS | COMPUTER WINS!",
                playerwin: false
            });

        }else if(computer == 2){
            this.userWins++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE PAPER | SCISSORS BEATS ROCK | PLAYER WINS!",
                playerwin: true
            });

        }else{
            this.ties++;
            this.gameCount++;

            this.log.unshift({
                msg:"COMPUTER CHOSE SCISSORS | YOU HAVE TIED!",
                playertie: true
            });

        }

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