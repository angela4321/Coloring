class PickColor{
    constructor(x,y,h){
        this.x=x;
        this.y=y;
        this.rSlider = createSlider(0,255,100);
        this.gSlider = createSlider(0,255,100);
        this.bSlider = createSlider(0,255,100);

        this.rSlider.position(x,y);
        this.gSlider.position(x,y+h/3);
        this.bSlider.position(x,y+2*h/3);
    }

    getColor(){
        return [this.rSlider.value(),this.gSlider.value(),this.bSlider.value()];
    }

    display(){
        let c = this.getColor();
        fill(c[0],c[1],c[2]);
        rect(0,0,10,10);
    }

}