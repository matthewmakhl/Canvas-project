

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
        this.contextReal.drawImage(this.source2,coord[0],coord[1], 80, 50)
        this.contextReal.drawImage(this.source1, 50, 50,20,20,coord[0] -20,coord[1]+30, 30, 30)


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
