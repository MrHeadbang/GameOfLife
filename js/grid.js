var slider = document.getElementById("grid-size-slider");

var SIZE = slider.value;
const LINEWIDTH = 0.5;
var CELLSIZE = Math.floor($(document).width() / SIZE);
const canvas = document.querySelector('.game-grid');
const ctx = canvas.getContext('2d');

canvas.width = $(document).width();
canvas.height = $(document).height() - 102;

var MATRIX = createMatrix();

function drawVerticalLine(x) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = LINEWIDTH;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
}
function drawHorizontalLine(y) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = LINEWIDTH;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
}


function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let column = 0; column < $(document).width(); column += CELLSIZE) {
        if (column == 0) {
            continue;
        }
        drawVerticalLine(column);
    }
    for (let row = 0; row < $(document).height(); row += CELLSIZE) {
        if (row == 0 || row < ($(document).height - CELLSIZE)) {
            continue;
        }
        drawHorizontalLine(row);
    }
}
function createMatrix() {
    let rows = Math.floor($(document).height() / CELLSIZE);
    let columns = Math.floor($(document).width() / CELLSIZE);
    var MATRIX = new Array(rows);
    for (let i = 0; i < MATRIX.length; i++) {
        MATRIX[i] = new Array(columns);
    }

    for (let r = 0; r < MATRIX.length; r++) {
        for (let c = 0; c < MATRIX[r].length; c++) {
            MATRIX[r][c] = 0;
        }
    }

    return MATRIX;
}
var mouseXold = 0;
var mouseYold = 0;
function cursor(mouseX, mouseY) {
    let x = mouseX - (mouseX % CELLSIZE);
    let y = mouseY - (mouseY % CELLSIZE);
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,255,1)';
    ctx.fillRect(x + 2 * LINEWIDTH, y + 2 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH);


    if (mouseX != mouseXold || mouseY != mouseYold)
        setTimeout(function() { 
            ctx.fillStyle = '#000000';
            ctx.fillRect(x + 2 * LINEWIDTH, y + 2 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH);
        }, 2);
        mouseXold = mouseX;
        mouseYold = mouseY;
}



function updateMatrix(mouseX, mouseY) {
    let x = Math.floor(mouseX / (CELLSIZE + LINEWIDTH));
    let y = Math.floor(mouseY / (CELLSIZE + LINEWIDTH)); 
    MATRIX[y][x] = 1;
    console.log(y, x);
}


function drawPixel(mouseX, mouseY) {
    let x = mouseX - (mouseX % (CELLSIZE));
    let y = mouseY - (mouseY % (CELLSIZE));
    updateMatrix(mouseX, mouseY, CELLSIZE);
    matrixToGrid(MATRIX, canvas);
}



drawGrid();

let start = null
let end = null
let move = null
let isHold = false
var timeout;


document.addEventListener('mousedown', e => {
    isHold = true
    start = e
})
document.addEventListener('mouseup', e => {
    isHold = false
    end = e
})
document.addEventListener('mousemove', e => {
    if (isHold) {
        move = e;
        drawPixel(e.pageX, e.pageY);
    }
})

function matrixToGrid() {
    
    for (let h = 0; h < MATRIX.length; h++) {
        for (let w = 0; w < MATRIX[0].length; w++) {
            let cell = MATRIX[h][w];
            if (cell == 1)
                ctx.fillStyle = '#ffffff';
            else
                ctx.fillStyle = '#000000';

            let mouseX = w * (CELLSIZE + LINEWIDTH);
            let mouseY = h * (CELLSIZE + LINEWIDTH);
            let x = mouseX - (mouseX % CELLSIZE);
            let y = mouseY - (mouseY % CELLSIZE);

            ctx.fillRect(x + 2 * LINEWIDTH, y + 2 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH, CELLSIZE - 4 * LINEWIDTH); 
        }
    }
}


var timer = null
function startGame(MATRIX_P) {
    timer = setTimeout(function() {
        var next = NEXT_MATRIX(MATRIX_P);
        MATRIX = next;
        matrixToGrid(next);
        
        startGame(next);
    }, 100);
}

var switcher = 0;
$('.start-button').click(function(e) {
    
    if (!switcher) {
        $('.start-button span').text("Stop");
        startGame(MATRIX);
        switcher = 1;
    } else if (switcher) {
        $('.start-button span').text("Start");
        clearTimeout(timer);
        switcher = 0;
    }

});


slider.onchange = function(event){
    SIZE = slider.value;
    console.log(SIZE);
    CELLSIZE = Math.floor($(document).width() / SIZE);
    drawGrid();
    MATRIX = createMatrix();
}