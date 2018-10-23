

class DrawingPeanut extends PaintFunction {
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.source1 = document.getElementById('source1');
        this.source2 = document.getElementById('source2');

        console.log('insidePeanut')
        console.log(this.source)
        
    }
        
    onMouseDown(coord){
        console.log('down');
        this.contextReal.drawImage(this.source2,coord[0],coord[1], 500, 300)
        this.contextReal.drawImage(this.source1, 100, 100,200,200,coord[0] -200,coord[1]+300, 300, 300)


    }
    onDragging(coord){



    }

    onMouseMove(coord){

    }
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }
}
