
let loadButton;
let revButton;
let inp;
let board;
let picker;
function setup(){

    createCanvas(500,500);

    board = new Board();
    picker = new PickColor(width/2,height+10,100);

    inp = createInput("Image url");
    inp.position(0,height-20)

    loadButton = createButton("Load image");
    loadButton.mousePressed(load);
    loadButton.position(0,height);

    revButton = createButton("Reverse color");
    revButton.mousePressed(rev);
    revButton.position(loadButton.width,height)


    
}

function rev(){
    board.rev();
}

function mousePressed(){
    if(!board.bw) return;
    let c = picker.getColor();
    
    board.fillColor(round(mouseX/width*board.pic.width),round(mouseY/height*board.pic.height),c[0],c[1],c[2]);
    
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
        background(255)
    }
    picker.display();
}