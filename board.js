class Board{
    constructor(){
        this.pic = null
        this.bw = false;
        this.startedColoring = false;
    }

    blackAndWhite(){
        this.pic.loadPixels();
        for(let i = 0; i < 4*this.pic.width*this.pic.height; i+=4){
            let sum = 0;
    
            for(let j = 0; j < 3; j++){
                sum+=this.pic.pixels[i+j];
                
            }
            let val;
            if(sum/3<255/2){
                val = 0;
            }
            else{
                val=255;
            }
            for(let j = 0; j < 3; j++){
                this.pic.pixels[i+j]=val;
                
            }
        }
        this.pic.updatePixels();
    
    }

    fillColor(x,y,r,g,b){
        this.startedColoring = true;
        this.pic.loadPixels();
        let visited = [];
        for(let i = 0; i < this.pic.width*this.pic.height; i++){
            visited.push(false);
        }
        let ind = 4*(x+y*this.pic.width);
        if(this.pic.pixels[ind]===0 && this.pic.pixels[ind+1]===0 && this.pic.pixels[ind+2]===0) return;
                
        let stack = [];
        let dx = [1,-1,0,0];
        let dy = [0,0,-1,1];
        stack.push([x,y]);
        
        while(stack.length>0){
            let cur = stack.pop();
            ind = (cur[0]+cur[1]*this.pic.width)*4;
            this.pic.pixels[ind] = r;
            this.pic.pixels[ind+1] = g;
            this.pic.pixels[ind+2] = b
            for(let i = 0; i < 4; i++){
                let nx = cur[0]+dx[i];
                let ny = cur[1]+dy[i];
                let nInd = 4*(nx+ny*this.pic.width)
                
                if(nx<0 || ny<0 || nx>=this.pic.width || ny>=this.pic.height) continue;
                if(this.pic.pixels[nInd]===0 && this.pic.pixels[nInd+1]===0 && this.pic.pixels[nInd+2]===0) continue;
                if(visited[nInd/4]) continue;
                visited[nInd/4] = true;
                stack.push([nx,ny]);
            }
        }
        this.pic.updatePixels();
    }
    

    //makes the black pixels white and the white pixels black, only valid before coloring starts
    rev(){
        if(this.startedColoring){
           return;
        }
        this.pic.loadPixels();
        for(let i = 0; i < 4*this.pic.width*this.pic.height; i+=4){
            let sum = 0;

            for(let j = 0; j < 3; j++){
                sum+=this.pic.pixels[i+j];
            
            }
            let val;
            if(sum/3<255/2){
                val = 255;
            }
            else{
                val=0;
            }
            for(let j = 0; j < 3; j++){
                this.pic.pixels[i+j]=val;
            
            }
        }
        this.pic.updatePixels();
    }

    display(){
        if(!this.bw && this.pic.width>1){
            this.blackAndWhite();
            this.bw = true;
        }
        if(this.bw) {
            image(this.pic,0,0,width,height);
        }
    }

}