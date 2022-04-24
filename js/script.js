let $modalButton  = document.querySelector('.modal-container .modal-btn');
let $modalOverlay = document.querySelector('.modal-container .overlay');

let modalHidden   = -120;
let modalDisplay  = 0;

$modalButton.addEventListener('click', function () {
    $modalOverlay.style.top = modalDisplay;
});

$modalOverlay.addEventListener('click', function () {
    $modalOverlay.style.top = modalHidden + '%';
});