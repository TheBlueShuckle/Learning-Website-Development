// Chessboard, without pieces (just the board)
var tileSize = 50;
var c0;
var c1;

function setup() {
    createCanvas(400, 400);
    c0 = color("white");
    c1 = color("black");
}

function draw() {
    background(220);
    drawGrid();
}

function drawGrid(){
    for (var y = 0; y < 8; y++){
        var rowStartColor; // if y is even, the first color of a row is white, else it is black
    
        if(isEven(y)){
            rowStartColor = c0;
        }
        
        else{
            rowStartColor = c1;
        }
        
        for (var x = 0; x < 8; x++){
            drawTile(x, y, rowStartColor);
            rowStartColor = switchColor(rowStartColor);
        }
    }
}

function drawTile(x, y, tileColor){  
    fill(tileColor);
    rect(tileSize * x, tileSize * y, tileSize, tileSize);
}

function isEven(value){
    return value % 2 === 0;
}

function switchColor(currentColor){
    if(currentColor === c0){
        return c1;
    }
    
    return c0;
}