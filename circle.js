
class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.circleType = 0;
        this.dragging = 0;
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextReal.strokeStyle = document.getElementById("color").value; //william modify
        this.contextDraft.strokeStyle = document.getElementById("color").value; // william modify
        this.contextReal.lineWidth = document.getElementById("valuebox").value; //william modify
        this.contextDraft.lineWidth = document.getElementById("valuebox").value; //william modify
        this.dragging = 1;
    }
    onDragging(coord,event){
        this.drawEllipse(this.contextDraft,coord[0],coord[1]);
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.dragging = 0;
        this.drawEllipse(this.contextReal,coord[0],coord[1]);
    }
    onMouseLeave(){}
    onMouseEnter(){}

    drawCircle(ctx,x,y){
        contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        ctx.beginPath();
        if (selected.FILL==1) {
            ctx.fillStyle = document.getElementById("color").value;
            ctx.fill();
        }
        ctx.arc((this.origX+x)/2,(this.origY+y)/2,(Math.sqrt(Math.pow(this.origX-x,2) + Math.pow(this.origY-y,2)))/2,0,2*Math.PI);
        ctx.stroke();
    }

    drawEllipse(ctx,x,y){
        contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        ctx.beginPath();

        if (this.origX > x) {
            if (this.origY > y) {
                ctx.ellipse((this.origX+x)/2,(this.origY+y)/2, (this.origX - x)/2, (this.origY - y)/2, 0, 0, 2 * Math.PI);
            } else {
                ctx.ellipse((this.origX+x)/2,(this.origY+y)/2, (this.origX - x)/2, (y - this.origY)/2, 0, 0, 2 * Math.PI);
            }
        } else {
            if (this.origY > y) {
                ctx.ellipse((this.origX+x)/2,(this.origY+y)/2, (x - this.origX)/2, (this.origY - y)/2, 0, 0, 2 * Math.PI);
            } else {
                ctx.ellipse((this.origX+x)/2,(this.origY+y)/2, (x - this.origX)/2, (y - this.origY)/2, 0, 0, 2 * Math.PI);
            }
        }

        if (selected.FILL==1) {
            ctx.fillStyle = document.getElementById("color").value;
            ctx.fill();
        }
        
        ctx.stroke();
    }
}