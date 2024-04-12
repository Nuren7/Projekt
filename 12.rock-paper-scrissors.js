/*JSON - Javascript object notation 
Här använder jag JSON för att skicka data mellan två olika språk
JSON.parse()- gör omvandlar string till en objekt
.getItem() -  tar ut värden ut från LocalStorage 

DOM - Document object model
Document är en built-in objekt som representerar hemsidan
.innerHTML -  kontrollerar alla HTML inne i body
.querySelector -  låter oss ta en element från hemsidan och låter oss lägga in det i javaScript
*/

//Jag använder mig av or i denna fall för att ge score en standard värde
//Score objekt
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElem();

//Den här varibeln kollar om vi inte auto spelar
let isAutoPlaying = false
//setInterval() ger id som vi sparar i denna variabeln 
let intervalId

/*
setInterval() - tar emot två parameter, en funktion och en timer i ms
I funktion kallar jag på playGame() 
*/
function autoPlay() {
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      //Här så lägger jag playerMover in i pickComputerMove för att det är helt random. En funktion som redan har skapats innan. Samtidigt kallar jag på funktionen så båda sidorna får helt random drag
      const playerMove = pickComputerMove()
      //Vi kallar på playGame() med parameter playerMove
      playGame(playerMove)
    }, 1000)
    isAutoPlaying = true
  } else  {
    //clearInterval stoppar en interval och här stoppar vi den id som vi har deklarerat från början
    clearInterval(intervalId)
    isAutoPlaying = false
  }
}
/*.addEventListener - låter oss köra kod när vi interagerar med en element. Den gör samma sak som onClick=""
Den tar två parameter. En av de är vilken typ av interaktion koden ska lyssna efter 
Detta har jag använt mig av för att inte blanda ihop olika koder
den andra är vilken funktion vi ska köra
*/

//Här väljer vi vilken element vi vill andvända .addEventListener
document.querySelector('.js-rock-button')
//kollar efter click interaktion med den utvalda elementet
.addEventListener('click',() => {
  //efter den har känt av den interaktionen så kommer den köra denna kod
  playGame('rock')
})
document.querySelector('.js-paper-button')
.addEventListener('click',() => {
  playGame('paper')
})
document.querySelector('.js-scissors-button')
.addEventListener('click',() => {
  playGame('scissors')
})
document.querySelector('.js-reset-score')
.addEventListener('click',() =>{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElem()
})
document.querySelector('.js-auto-play')
.addEventListener('click', () => {
  autoPlay()
})

//'keydown' är en annan typ av interaktion, den lyssnar efter tangent slag.
//Event - är en objekt som representerar en event 
document.body.addEventListener('keydown', (event) => {
  //event.key kollar vilken tangent var slagen
  if (event.key === 'r'){
    playGame('rock')
  } else if (event.key === 'p') {
    playGame('paper')
  } else if(event.key === 's') {
    playGame('scissors')
  }
})

//Min drag jämfört med Datans och tillägg till score objekt
function playGame(playerMove) {
  const computerMove = pickComputerMove()

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    } else if (computerMove === 'paper') {
      result = 'You win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }   

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You Lose';
    }
    
  } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You lose';
    } else if (computerMove === 'scissors') {
      result = 'You win';
  }
}

    if (result === 'You win') {
      score.wins += 1;
    } else if (result === 'You lose'){
      score.losses += 1;
    } else if (result === 'Tie') {
      score.ties += 1;
    }

    /*LocalStorage.setItem() är en method som sparar värden in i objekten localstorage.
    
    setItem() tar två argument, en är ett namn för tillgång till localStorage, den andra är den värden man vill spara in i localStorage

    För att localStorage bara tar info som string så har jag använt mig av JSON.stringify som omvandlar JS objekten till en string som sedan sparar allt i localStorage
    */

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElem();
    
    //Här uppddaterar jag .js-result elementen
    document.querySelector('.js-result').
      innerHTML = result;

    //Här uppdaterar jag .js-move elementen 
    document.querySelector('.js-move').
      innerHTML = `You:
      <img src="/Images/${playerMove}-emoji.png" class="move-icon">
      <img src="/Images/${computerMove}-emoji.png" class="move-icon">
      Computer`
  }

    //Här uppdaterar jag .js-score elementen
    function updateScoreElem(){
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
    }

//Datans drag
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';
  //Om randomNumber är lika med eller större än 0 och mindre än 1/3 = Rock
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove= 'rock';
    //Om randomNumber är lika med eller större 1/3 och mindre än 2/3
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
    //Om randomNumber är lika med eller större 2/3 och mindre än 1
  } else if (randomNumber >= 2 / 3 && randomNumber < 1){
    computerMove ='scissors';
  }

  return computerMove;
}

