//***************ELEMENTS****************//
const $toggleThemeBtn  = document.querySelector(".btn-toggle-theme");
const $themeLink       = document.querySelector("#theme-link");
const $mainSection     = document.querySelector(".main-quote-section");

//**********DEFAULT STYLESHEET**********//
window.addEventListener('load', function() {
    if (window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches) 
            changeToDarkTheme();  
    else
      changeToLightTheme(); 
});

//**********TOGGLE STYLESHEETS***********//
$toggleThemeBtn.addEventListener('click', function() {
  ($themeLink.getAttribute("href") === "css/light-theme.css") ?
    changeToDarkTheme() : changeToLightTheme();
});

function changeToLightTheme() {
  $themeLink.href = "css/light-theme.css";
  $mainSection.style.background = "url('../img/light-bg" + randomIntegerNumber(1, 3) + ".jpg') center center/cover no-repeat";
} 

function changeToDarkTheme() {
  $themeLink.href = "css/dark-theme.css";
  $mainSection.style.background = "url('../img/dark-bg" + randomIntegerNumber(1, 3) + ".jpg') center center/cover no-repeat";
} 

function randomIntegerNumber(min, max) {
  let randomInteger = min+Math.random()*(max+1-min);
  return Math.floor(randomInteger);
}