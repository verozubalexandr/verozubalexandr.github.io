const $area = document.querySelector('.area');
const $allWindow = document.querySelector('html');
const $addBtn = document.querySelector('.btn-add');
const $removeBtn = document.querySelector('.btn-remove');
const $clearAllBtn = document.querySelector('.clear-all');

let action = false;
let move = false;
let $selectedBox = null;
let selectedBoxIndex = null;
let boxes = [];

let areaWidth = $area.offsetWidth;
let areaHeight = $area.offsetHeight;
let boxWidth = 0;
let boxHeight = 0;

let startCoords = {
    x: 0,
    y: 0
}
let distance = {
    x: 0,
    y: 0
}




if (JSON.parse(localStorage.getItem("boxes")) !== null) {
    reDraw();
}

function boxGenerator() {
    reDraw();
}

function boxController(x, y) {
    $selectedBox.style.left = x + 'px';
    $selectedBox.style.top = y + 'px';
}




$area.addEventListener('keyup', function (e) {
    boxes[e.target.getAttribute('data-index')].text = document.querySelectorAll('textarea')[e.target.getAttribute('data-index')].value;
    localStorage.setItem('boxes', JSON.stringify(boxes));
});

$area.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('box')) {
        move = false;
        boxWidth = document.querySelector('.box').offsetWidth;
        boxHeight = document.querySelector('.box').offsetHeight;
        action = true;
        $selectedBox = e.target;
        selectedBoxIndex = e.target.getAttribute('data-index');
        startCoords.x = e.pageX;
        startCoords.y = e.pageY;
        addAnimation();
        setTimeout(clearAnimation, 500);
    }
});

$allWindow.addEventListener('mouseup', function (e) {
    action = false;
    if (move == true && boxes.length !== 0) {
        boxes[selectedBoxIndex].x = distance.x;
        boxes[selectedBoxIndex].y = distance.y;
        localStorage.setItem("boxes", JSON.stringify(boxes));
    }
});

$area.addEventListener('mousemove', function (e) {
    if (action) {
        move = true;
        resizeArea();
        console.log(e.pageX + "; " + e.pageY);
        distance.x = boxes[selectedBoxIndex].x + (e.pageX - startCoords.x);
        distance.y = boxes[selectedBoxIndex].y + (e.pageY - startCoords.y);

        if (distance.x <= 0) distance.x = 0;
        if (distance.x >= (areaWidth - boxWidth)) distance.x = areaWidth - boxWidth;

        if (distance.y <= 0) distance.y = 0;
        if (distance.y >= (areaHeight - boxHeight)) distance.y = areaHeight - boxHeight;
        console.log(distance.x + "; " + distance.y);
        boxController(distance.x, distance.y);
    }
});




$addBtn.addEventListener('click', function () {
    boxes.push({
        x: 12,
        y: 12,
        text: ''
    });
    localStorage.setItem("boxes", JSON.stringify(boxes));
    boxGenerator();
});

$removeBtn.addEventListener('click', function () {
    boxes.splice(selectedBoxIndex, 1);
    localStorage.setItem("boxes", JSON.stringify(boxes));
    reDraw();
});

$clearAllBtn.addEventListener('click', function () {
    boxes = [];
    localStorage.setItem("boxes", JSON.stringify(boxes));
    reDraw();
});




function reDraw() {
    let template = '';
    boxes = JSON.parse(localStorage.getItem("boxes"));
    for (let i = 0; i < boxes.length; i++) {
        template += '<div class="box" style="left: ' + boxes[i].x + 'px; top: ' + boxes[i].y + 'px;" data-index="' + i + '">' + '<textarea class="box-text" data-index="' + i + '" placeholder="Write here...">' + boxes[i].text + '</textarea></div>';
    }
    $area.innerHTML = template;
}

function resizeArea() {
    areaWidth = $area.offsetWidth;
    areaHeight = $area.offsetHeight;
}

function addAnimation() {
    $selectedBox.style = '-webkit-animation-name: selected; animation-name: selected; -moz-animation-name: selected; -webkit-animation-duration: .5s; animation-duration: .5s; -moz-animation-duration: .5s; left: ' + boxes[selectedBoxIndex].x + 'px; top: ' + boxes[selectedBoxIndex].y + 'px;"';
}

function clearAnimation() {
    if (boxes.length !== 0) {
        $selectedBox.style = 'left: ' + boxes[selectedBoxIndex].x + 'px; top: ' + boxes[selectedBoxIndex].y + 'px;"';
    }
}