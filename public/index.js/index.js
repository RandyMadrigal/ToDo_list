const divMessage = document.getElementById("message");
const btnClose = document.getElementById("btnClose");

btnClose.addEventListener("click", function () {
  divMessage.classList.add("invisible");
});
