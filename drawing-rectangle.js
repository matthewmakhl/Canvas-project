class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.dragging = 0;
        this.shifting = 0;
        this.finishDrawing = 0;
    }
    
    onMouseDown(coord,event){
        this.contextReal.fillStyle = document.getElementById("color").value;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = document.getElementById("color").value;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        if (this.shifting==1){
            if ((this.origX - coord[0])*(this.origY - coord[1]) < 0) {  // determine which coordinate the mouse is in compared to origX and origY
                if (Math.abs(this.origX - coord[0]) > Math.abs(this.origY - coord[1])) { // determine whether length or width is larger
                    coord[0] = this.origX - coord[1] + this.origY
                } else {
                    coord[1] = this.origY - coord[0] + this.origX
                }
            } else {
                if (Math.abs(this.origX - coord[0]) > Math.abs(this.origY - coord[1])) { // determine whether length or width is larger
                    coord[0] = this.origX + coord[1] - this.origY
                } else {
                    coord[1] = this.origY + coord[0] - this.origX
                }
            }
        }
        if (selected.FILL==0) {
            this.drawBox(this.contextDraft,this.origX,this.origY,coord[0],coord[1]);
        } else {
            this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);
        }
    }
    onPressDown(coord,e){
        var keycode = parseInt(e.which);
        if ((keycode == 16)) {
            this.shifting = 1;
        }
    }
    onPressUp(coord,e){
        var keycode = parseInt(e.which);
        if ((keycode == 16)) {
            this.shifting = 0;
        }
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        if (this.shifting==1){
            if ((this.origX - coord[0])*(this.origY - coord[1]) < 0) {  // determine which coordinate the mouse is in compared to origX and origY
                if (Math.abs(this.origX - coord[0]) > Math.abs(this.origY - coord[1])) { // determine whether length or width is larger
                    coord[0] = this.origX - coord[1] + this.origY
                } else {
                    coord[1] = this.origY - coord[0] + this.origX
                }
            } else {
                if (Math.abs(this.origX - coord[0]) > Math.abs(this.origY - coord[1])) { // determine whether length or width is larger
                    coord[0] = this.origX + coord[1] - this.origY
                } else {
                    coord[1] = this.origY + coord[0] - this.origX
                }
            }
        }
        if (selected.FILL==0) {
            this.drawBox(this.contextReal,this.origX,this.origY,coord[0],coord[1]);
        } else {
            this.contextReal.fillRect(this.origX,this.origY,coord[0]- this.origX, coord[1] - this.origY)
        }
    }
    onMouseLeave(){}
    onMouseEnter(){}

    drawBox(ctx,x1,y1,x2,y2){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        ctx.strokeStyle = document.getElementById("color").value;
        this.drawLine(ctx,x1,y1,x2,y1);
        this.drawLine(ctx,x1,y1,x1,y2);
        this.drawLine(ctx,x2,y1,x2,y2);
        this.drawLine(ctx,x1,y2,x2,y2);
    }

    drawLine(ctx,x1,y1,x2,y2){
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

