let pic = null;
let loadButton;
function setup(){

    createCanvas(500,500);
    loadButton = createButton("Upload image");
    loadButton.mousePressed(load);
    colorMode(HSB,100,100,100);
}

function load(){
    console.log("load")
    createFileInput(getImage);
}

function getImage(im){
    console.log("getImage")
    if(im.type==='image'){
        pic = createImg(im.data,"not loaded");
        pic.hide();
    }
}

function draw(){
    if(pic){
        image(pic,0,0,500,500);
    }
    else{
        background(100)
    }
}