
let loadButton;
let revButton;
let inp;
let board;
function setup(){

    createCanvas(500,500);

    board = new Board();
    
    inp = createInput("Image url");
    inp.position(0,height-20)

    loadButton = createButton("Load image");
    loadButton.mousePressed(load);
    loadButton.position(0,height);

    revButton = createButton("Reverse color");
    revButton.mousePressed(board.rev);
    revButton.position(loadButton.width,height)


    colorMode(HSB,100,100,100);
    
}

function mousePressed(){
    if(!board.bw) return;
    
    board.fillColor(round(mouseX/width*board.pic.width),round(mouseY/height*board.pic.height),100,100,100);
    
}



function load(){
    let path = inp.value();
    board.pic = createImage(1,1);
    board.pic = loadImage(path+"");
    board.bw = false;
    board.startedColoring = false;
}




 

function draw(){
    
    if(board.pic){
        board.display();
    }
    else{
        background(100)
    }
}