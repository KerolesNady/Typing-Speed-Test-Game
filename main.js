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
  "Playing",
];

// Setting Levels
let Levels = {
  Easy: 6,
  Normal: 4,
  Hard: 2,
};

// Catch Selectors
let lvlSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let radiosBtn = document.querySelectorAll(".form-check input");
let startBtn = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let time = document.querySelector(".time span");
let scoreGet = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");

// Default Level
let defaultLevels;
let defaultSeconds;
let value;

if (window.localStorage.getItem("defaultLevels")) {
  value = window.localStorage.getItem("defaultLevels");
  defaultLevels = value;
  defaultSeconds = Levels[defaultLevels];
} else {
  defaultLevels = "Easy";
  defaultSeconds = Levels[defaultLevels];
  window.localStorage.setItem("defaultLevels", defaultLevels);
}

let va = window.localStorage.getItem("defaultLevels");
for (var i = 0; i < radiosBtn.length; i++) {
  if (radiosBtn[i].value === va) {
    radiosBtn[i].checked = true;
  }
}
radiosBtn.forEach((radio) => {
  radio.addEventListener("click", function () {
    value = radio.value;
    window.localStorage.setItem("defaultLevels", value);
    lvlSpan.innerHTML = value;
    secondsSpan.innerHTML = Levels[value];
    time.innerHTML = Levels[value];
  });
});

// Setting Level Name + Seconds + Score
lvlSpan.innerHTML = defaultLevels;
secondsSpan.innerHTML = defaultSeconds;
time.innerHTML = defaultSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

//start game
startBtn.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  setTimeout(genWords,3000);
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let indexOfWord = words.indexOf(randomWord);
  words.splice(indexOfWord, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  time.innerHTML = defaultSeconds;
  let start = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        scoreGet.innerHTML++;
        let totalScore = scoreGet.innerHTML;
        window.localStorage.setItem("score", totalScore);
        input.value = "";
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finish.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finish.appendChild(span);
      }
    }
  }, 1000);
}
