const menuToggle = document.querySelector(".kesatuan-hamburger-menu input");
const nav = document.querySelector(".ul-navbar");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("slide");
});

var content = document.querySelector(".body");
var cpr = document.querySelector(".cpr").innerHTML;
if (cpr != "@Danny Satria") {
  content.style.display = "none";
}
