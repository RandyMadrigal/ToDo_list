const divMessage = document.getElementById("message");
const btnClose = document.getElementById("btnClose");

btnClose.addEventListener("click", function () {
  divMessage.classList.add("invisible");
});

function closeTime() {
  if (!divMessage.classList.contains("invisible")) {
    setTimeout(() => {
      divMessage.classList.add("invisible");
    }, 2500);
  }
}

closeTime();
