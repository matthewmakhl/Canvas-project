
class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.dragging = 0;
        this.shifting = 0;
        this.finishDrawing = 0;
        this.medX;
        this.medY;
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
        this.medX = coord[0];
        this.medY = coord[1];
        if (this.shifting==0){
            this.drawEllipse(this.contextDraft,coord[0],coord[1]);
        }
    }
    onPressDown(coord,e){
        var keycode = parseInt(e.which);
        if ((keycode == 16)) {
            this.shifting = 1;
            if (this.finishDrawing==1){
                this.drawCircle(this.contextReal,this.medX,this.medY);
                this.finishDrawing = 0;
            }
        }
        if ((keycode == 16)&&(dragging == 1)) {
            if (this.finishDrawing==1){
                this.drawCircle(this.contextReal,this.medX,this.medY);
                this.finishDrawing = 0;
                console.log('finish');
            } else {
                this.drawCircle(this.contextDraft,this.medX,this.medY);
            }
        }
    }
    onPressUp(coord,e){
        var keycode = parseInt(e.which);
        this.shifting = 0;
        if ((keycode == 16)&&(dragging == 1)) {
            this.drawEllipse(this.contextDraft,this.medX,this.medY);
        }
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.dragging = 0;
        this.finishDrawing = 1;
        if (this.shifting==0){
            this.drawEllipse(this.contextReal,coord[0],coord[1]);
            this.finishDrawing = 0;
        }
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
        if (selected.FILL==1) {
            ctx.fillStyle = document.getElementById("color").value;
            ctx.fill();
        }
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