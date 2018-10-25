class DrawingPeanut extends PaintFunction {
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.nutImage = new Image();
        this.nutImage.src = `./images/nut1.png`;
        this.nutImage.src = `./images/nut2.png`;
        this.nutImage.src = `./images/nut3.png`;
        this.nutImage.src = `./images/nut4.png`;
        this.nutImage.src = `./images/nut5.png`;
        this.nutImage.src = `./images/nut6.png`;
        this.nutImage.src = `./images/nut7.png`;
        this.nutImage.src = `./images/nut8.png`;
        this.nutImage.src = `./images/nut9.png`;
    }
        
    onMouseDown(coord){}
    onDragging(coord,e){
        this.drawPeanut(e);
    }
    onMouseMove(coord){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    drawPeanut(e) {
        this.nutImage.src = `./images/nut${this.getRandomInt(1, 9)}.png`;
        contextReal.save();
        contextReal.translate(e.offsetX, e.offsetY);
        contextReal.beginPath();
        contextReal.rotate(Math.PI / 180 * this.getRandomInt(0, 360));
        contextReal.scale(this.getRandomInt(2, 3) / 5, this.getRandomInt(2, 3) / 5);
        contextReal.drawImage(this.nutImage,0,0);
        contextReal.restore();
    }
}
