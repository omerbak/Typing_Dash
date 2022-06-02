/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

  //Setting Levels
const lvls ={
    "Easy": 6,
    "Normal": 4,
    "Hard": 3
};



// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let levelOption = document.querySelector(".level")
let levelLabel = document.querySelector(".level-label");
let ready = document.querySelector(".ready");
let readyCounter = document.querySelector(".ready .counter");

console.log(levelLabel);
/* Toggle dark light mode function */
let game = document.querySelector(".game");
let title = document.querySelector(".title");
let checkbox = document.querySelector(".checkbox");

//function apply dark mode and save it to local storage
let applyDark = () =>{
    game.classList.toggle("dark-mode-game")
    title.classList.toggle("dark-mode-title")
    
    // save dark mode to local storage
    let darkMode = localStorage.getItem("dark-mode");
    if(darkMode == "on"){
        localStorage.setItem("dark-mode", "off");
    } else{
        localStorage.setItem("dark-mode", "on");
    }
    
}
// check if the value of dark-mod in the local storage is on
let darkMode = localStorage.getItem("dark-mode");
if(darkMode == "on"){
    game.classList.toggle("dark-mode-game")
    title.classList.toggle("dark-mode-title")
    checkbox.checked = true;
}


checkbox.addEventListener("change", (e) => {
   applyDark();
   
})

/* console.log(playAgain); */
//Default Level 
let defaultLevelName = levelOption.value;  
let defaultLevelSeconds = lvls[defaultLevelName];


//Setting Level name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//update level name and seconds on selection
levelOption.onchange = function(){
 defaultLevelName = levelOption.value;  
 defaultLevelSeconds = lvls[defaultLevelName];

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;
}
//Disable Paste Event
input.onpaste = function(){
    return false;
}

// Start Game
startButton.onclick = function(){
    //Start the ready counter
    ready.style.display = "block";
    let readyCount = setInterval(() => {
        readyCounter.innerHTML--;
        if(readyCounter.innerHTML == 0){
            ready.style.display = "none"; 
            clearInterval(readyCount);
        }
    }, 1000)
    //remove start button and level selection
    levelOption.remove();
    levelLabel.remove();
    this.remove();
    input.focus();
    theWord.style.display = "block"; 
    upcomingWords.style.display = "flex";
    //Generate Word Function
    setTimeout(() => {
        genWord();
    }, 3000)
    
}

function genWord(){
    //Get random word form array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    
    // Get word index
    let wordIndex = words.indexOf(randomWord);
    // Remove Word from array
    words.splice(wordIndex, 1);
    //Show the random word 
    theWord.innerHTML = randomWord;
    // Empty upcoming words
    upcomingWords.innerHTML = '';
    // Generate Upcoming words
    for(let word of words){
        //Create div element
        let div = document.createElement("div");
        let text = document.createTextNode(word);
        div.appendChild(text);
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay();
}

function startPlay(){
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML == 0 ){
            clearInterval(start);
            //compare Words
            if(theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()){
                //Empty input field
                input.value = "";
                //Increase score
                scoreGot.innerHTML++;
                if(words.length > 0){
                    // Call genWord()
                    genWord();
                } else{
                let span = document.createElement("span");
                span.className = "good";
                let spanText = document.createTextNode("Congrats, you are very fast typer");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
                //Remove Upcoming words Box
                theWord.style.display ="none"
                input.style.display ="none"

                finishMessage.style.display = "flex"
                upcomingWords.remove();
                }
            } else{
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                let btn = document.createElement("button");
                btn.setAttribute("class", "playAgain");
                btn.textContent = "Play Again";
                span.appendChild(btn);
                finishMessage.appendChild(span);
                input.style.display ="none"
                theWord.style.display ="none"
                finishMessage.style.display = "flex"
               
            }
        }
    }, 1000)
}

//reload the page when play again button is clicked
document.addEventListener("click", (e) => {
    if(e.target.className == "playAgain"){
        location.reload();
    }
})


