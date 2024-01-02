let button = document.querySelector(".btn")

button.addEventListener("click", (e)=>{
    window.location.href="index.html"
})

let correctWord = document.querySelector(".correct-word")
correctWord.innerHTML += `<span> ${localStorage.getItem("randomWord")}</span>`;