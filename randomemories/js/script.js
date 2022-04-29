let $lineItem      = document.querySelectorAll('.main-screen .container .main-screen-film-line .main-screen-item');
let $button        = document.querySelector('.header');
let $mainTip       = document.querySelector('.main-screen .main-tip');
let currentSlide   = -1;
let beforeMemory   = 0;

$button.addEventListener('click', function() {
    $mainTip.style.left = -150 + '%';
    if(currentSlide == -1) {
        setTimeout(randomSlide, 500)
    } else {
        randomSlide();
    }
});

function randomSlide() {
    do {
        currentSlide = getRandomInt(8);
    } while(beforeMemory == currentSlide);
    beforeMemory = currentSlide;
    for(let i = 0; i < 8; i++) {
        $lineItem[i].style = 'display: none';
    }
    $lineItem[currentSlide].style = 'display: block';
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};
  