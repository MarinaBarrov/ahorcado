let randomWord;
let lives = 6;
let wrongChars = new Set();

window.addEventListener("load", (e) => {
  fetchWord().then((response) => {
    randomWord = response.normalize("NFC");
    renderWordPlaceHolder(randomWord);
});
});

window.addEventListener("keypress", (e) => {
    let keyPress = e.key;
    if (!randomWord.includes(keyPress)) {
        subtractLive();
        addIncorrectChar(keyPress);
  }
  renderKeyPress(keyPress);
});

/*
 * Funciones
 */

function addIncorrectChar(keyPress) {
  wrongChars.add(keyPress);
  let missedChar = document.querySelector(".missed-chars");
  missedChar.innerHTML = "";
  wrongChars.forEach((char) => {
    missedChar.innerHTML += `<span>${char}</span>`;
  });
}

async function fetchWord() {
  return await fetch("https://clientes.api.greenborn.com.ar/public-random-word")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network reponse was not ok");
      }
      return response.json();
    })
    .then((data) => data[0])
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function renderWordPlaceHolder(word) {
  let wordContainer = document.querySelector(".word-container");
  for (let char of word) {
    wordContainer.innerHTML += '<div class="character"><span></span></div>';
  }
}

function renderKeyPress(char) {
  let characters = document.querySelectorAll(".character");
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] == char) {
      characters[i].querySelector("span").innerText = char;
    }
  }
}

function subtractLive() {
  lives--;
  if (lives > 0) {
    let hearts = document.querySelectorAll(".heart");

    Array.from(hearts)
      .slice(lives)
      .forEach((element) => {
        element.classList.remove("fa-solid");
        element.classList.add("fa-regular");
      });
  } else {
    window.localStorage.setItem("randomWord", randomWord)
    window.location.href="loser.html"
  }
}
