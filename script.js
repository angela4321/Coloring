let pic = null; 
let loadButton;
let revButton;
let inp;
let bw = false;
let startedColoring = false;
let num = 0;
function setup(){

    createCanvas(500,500);
    inp = createInput("Image url");
    inp.position(0,height-20)

    loadButton = createButton("Load image");
    loadButton.mousePressed(load);
    loadButton.position(0,height);

    revButton = createButton("Reverse color");
    revButton.mousePressed(rev);
    revButton.position(loadButton.width,height)

    

    colorMode(HSB,100,100,100);
    
}

function mousePressed(){
    if(!bw) return;
    pic.loadPixels();
    
    fillColor(round(mouseX/width*pic.width),round(mouseY/height*pic.height),100,100,100);
    fill(0);
    pic.updatePixels();
}

function fillColor(x,y,r,g,b){
    let visited = [];
    for(let i = 0; i < pic.width*pic.height; i++){
        visited.push(false);
    }
    let ind = 4*(x+y*pic.width);
    console.log(pic.width+" "+pic.pixels[ind]+ " "+pic.pixels[ind+1])
    if(pic.pixels[ind]===0 && pic.pixels[ind+1]===0 && pic.pixels[ind+2]===0) return;
            
    let stack = [];
    let dx = [1,-1,0,0];
    let dy = [0,0,-1,1];
    stack.push([x,y]);
    
    while(stack.length>0){
        let cur = stack.pop();
        ind = (cur[0]+cur[1]*pic.width)*4;
        pic.pixels[ind] = r;
        pic.pixels[ind+1] = g;
        pic.pixels[ind+2] = b
        for(let i = 0; i < 4; i++){
            let nx = cur[0]+dx[i];
            let ny = cur[1]+dy[i];
            let nInd = 4*(nx+ny*pic.width)
            
            if(nx<0 || ny<0 || nx>=pic.width || ny>=pic.height) continue;
            if(pic.pixels[nInd]===0 && pic.pixels[nInd+1]===0 && pic.pixels[nInd+2]===0) continue;
            if(visited[nInd/4]) continue;
            visited[nInd/4] = true;
            stack.push([nx,ny]);
        }
    }
}


function load(){
    let path = inp.value();
    pic = createImage(1,1);
    pic = loadImage(path+"");
    bw = false;
    startedColoring = false;
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
    if(startedColoring){
        return;
    }
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
        if(bw) {
            image(pic,0,0,width,height);
        }
    }
    else{
        background(100)
    }
}