let pic = null;
let loadButton;
let inp;
let bw = false;
function setup(){

    createCanvas(500,500);
    inp = createInput("Image url");
    inp.position(0,height-20)
    loadButton = createButton("Load image");
    loadButton.mousePressed(load);
    loadButton.position(0,height);

    colorMode(HSB,100,100,100);
}

function load(){
    let path = inp.value();
    pic = loadImage(path+"");
}



function blackAndWhite(){
    pic.loadPixels();
    for(let i = 0; i < 4*pic.width*pic.height; i+=4){
        let sum = 0;

        for(let j = 0; j < 3; j++){
            sum+=pic.pixels[i+j];
            
        }
        let val;
        if(sum/3<255/2){
            val = 0;
        }
        else{
            val=255;
        }
        for(let j = 0; j < 3; j++){
            pic.pixels[i+j]=val;
            
        }
    }
    pic.updatePixels();

}
//makes the black pixels white and the white pixels black, only valid before coloring starts
function rev(){
    pic.loadPixels();
    for(let i = 0; i < 4*pic.width*pic.height; i+=4){
        let sum = 0;

        for(let j = 0; j < 3; j++){
            sum+=pic.pixels[i+j];
            
        }
        let val;
        if(sum/3<255/2){
            val = 255;
        }
        else{
            val=0;
        }
        for(let j = 0; j < 3; j++){
            pic.pixels[i+j]=val;
            
        }
    }
    pic.updatePixels();
}

function draw(){
    
    if(pic){
        if(!bw && pic.width>1){
            blackAndWhite();
            rev();
            bw = true;
        }
        image(pic,0,0,width,height);
    }
    else{
        background(100)
    }
}