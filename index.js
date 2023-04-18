'use strict'; 

//selecting elements::
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew= document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');


let playing, currentScore, scores, activePlayer;

const init = function(){
    //Setting the scores to 0
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    //To check if we are playing or not.
    playing = true;
    
    //Setting the current score to 0:: 
    currentScore = 0;
    
    //Final Score::
    scores = [0,0];
    
    //Active Player:: 
    activePlayer = 0;

    //Hiding the dice initially::
    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

//Calling the init funtion as soon we reload::
init();


//Creating a function to implement the logic of switch player::
const switchPlayer = function () {

    //The player who was laready playing, his score will be set to 0 once he gets 1 in the dice::
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //Switch Player: We will change the value of active player between 0 and 1
    activePlayer = activePlayer === 0 ? 1 : 0;

    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;


    //Toggle the active class between the players::
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}





//Generating a ranodom dice roll function::
btnRoll.addEventListener('click', function(){

    if(playing){    

        //Generate a random no between 1-6:: 
        const dice = Math.trunc(Math.random() * 6)+1;
        // console.log(dice);


        //Display the dice roll::
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;



        //Check is the roll is 1: If true then switch the player::
        if(dice !== 1){
        //add the dice no to currentScore variable::
        currentScore = currentScore + dice;
        
        //Getting the id of player 0 and 1 dynamically:
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
        switchPlayer();
        }
    }

});




//Hold Button Functionality::
btnHold.addEventListener('click', function(){

    if(playing){

        //The score must be updated with the current score::
        scores[activePlayer] = scores[activePlayer] + currentScore;
    
        //Displaying the hold score::
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    
        //Checking if the held score (top one) is >=100. If true then no switching player. That Player will win the game:
        if(scores[activePlayer] >= 20){
    
            //we can't play the gave anymore if we satisfy the score::
            playing = false;

            //We also want to hide the dice:
            diceEl.classList.add('hidden');
            
            //We want to assign a player--winner class:
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            //Switching the player:: and setting the active player's current score to 0
            switchPlayer();
        }
        
    }
});


//Resetting the game::
btnNew.addEventListener('click',init);