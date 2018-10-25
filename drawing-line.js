class DrawingLine extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown(coord){

        this.context.strokeStyle = document.getElementById("color").value;
        this.context.lineJoin = "round";
        this.context.lineWidth = document.getElementById("valuebox").value;
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.isDash(this.context);

        this.draw(coord[0],coord[1]);
    }
    onDragging(coord){
        
        this.draw(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.moveTo(x,y);
        this.context.closePath();
        this.context.stroke();    
    }

    isDash(ctx){
        if (selected.DASH==1){
            ctx.setLineDash([5,5])
        } else {
            ctx.setLineDash([])
        }
    }
}