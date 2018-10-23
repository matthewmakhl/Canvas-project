class Selection extends PaintFunction{
    constructor(canvasReal,canvasDraft,contextReal,contextDraft){
        super();
        this.canvasReal = canvasReal;
        this.canvasDraft = canvasDraft;
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.selectionBox = 0;
        this.capSelection_canvas;
        this.capSelection_ctx;
        this.capSelection_img;
        this.origX2;
        this.origY2;
        this.endX;
        this.endY;
        this.testImage = new Image();
    }
    
    onMouseDown(coord,event){
        if (this.selectionBox == 0) {
            this.origX = coord[0];
            this.origY = coord[1];
        } else if (
            (coord[0] <= this.endX) &&
            (coord[0] >= this.origX) &&
            (coord[1] <= this.endY) &&
            (coord[1] >= this.origY)
            ) {
            this.origX2 = coord[0];
            this.origY2 = coord[1];
        } else {
            this.selectionBox = 0;
            this.drawCapture(this.contextReal,this.origX,this.origY)
            contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.origX = coord[0];
            this.origY = coord[1];
        }
    }
    onDragging(coord,event){
        if (this.selectionBox == 0) {
            this.drawSelectionBox(this.origX,this.origY,coord[0],coord[1]);
        } else if (this.selectionBox == 1) {
            contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.drawSelectionBox(
                this.origX + coord[0] - this.origX2,
                this.origY + coord[1] - this.origY2,
                this.endX + coord[0] - this.origX2,
                this.endY + coord[1] - this.origY2
            );
            this.drawCapture(
                this.contextDraft,
                this.origX + coord[0] - this.origX2,
                this.origY + coord[1] - this.origY2
            )
        }
    }

    onMouseMove(coord){
        if (
            (this.selectionBox==1)&&
            (coord[0] <= this.endX) &&
            (coord[0] >= this.origX) &&
            (coord[1] <= this.endY) &&
            (coord[1] >= this.origY)
                ) {
            $('#canvas-draft').css('cursor','all-scroll');
            $('body').css('cursor', 'all-scroll');
        } else {
            $('#canvas-draft').css('cursor','default');
            $('body').css('cursor', 'default');
        }
    }
    
    onMouseUp(coord){
        if (this.selectionBox == 0){
            coord = this.adjustxy(coord[0],coord[1]);
            this.captureSelection(coord[0],coord[1]);
            this.drawSelectionBox(this.origX,this.origY,coord[0],coord[1]);
            this.contextReal.clearRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);
            this.selectionBox = 1;
            this.endX = coord[0];
            this.endY = coord[1];
        } else if (this.selectionBox == 1) {
            contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.drawSelectionBox(
                this.origX + coord[0] - this.origX2,
                this.origY + coord[1] - this.origY2,
                this.endX + coord[0] - this.origX2,
                this.endY + coord[1] - this.origY2
            );
            this.drawCapture(
                this.contextDraft,
                this.origX + coord[0] - this.origX2,
                this.origY + coord[1] - this.origY2
            )
            this.origX = this.origX + coord[0] - this.origX2;
            this.origY = this.origY + coord[1] - this.origY2;
            this.endX = this.endX + coord[0] - this.origX2;
            this.endY = this.endY + coord[1] - this.origY2;
        } else {
            this.selectionBox = 0;
        }
    }
    onMouseLeave(){}
    onMouseEnter(coord){
        if (
            (this.selectionBox==1)&&
            (coord[0] <= this.endX) &&
            (coord[0] >= this.origX) &&
            (coord[1] <= this.endY) &&
            (coord[1] >= this.origY)
                ) {
            $('#canvas-draft').css('cursor','all-scroll');
            $('body').css('cursor', 'all-scroll');
        } else {
            $('#canvas-draft').css('cursor','default');
            $('body').css('cursor', 'default');
        }
    }

    drawSelectionBox(x1,y1,x2,y2){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawLine(x1,y1,x2,y1);
        this.drawLine(x1,y1,x1,y2);
        this.drawLine(x2,y1,x2,y2);
        this.drawLine(x1,y2,x2,y2);
    }

    drawLine(x1,y1,x2,y2){
        this.contextDraft.strokeStyle = "#888";
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = 2;
        this.contextDraft.beginPath();
        this.contextDraft.setLineDash([5,15]);
        this.contextDraft.moveTo(x1,y1);
        this.contextDraft.lineTo(x2,y2);
        this.contextDraft.closePath();
        this.contextDraft.stroke();
        this.contextDraft.setLineDash([]);
    }

    captureSelection(x,y){
        this.capSelection_canvas = document.createElement('canvas');
        this.capSelection_canvas.style.display = 'none';
        document.body.appendChild(this.capSelection_canvas);
        this.capSelection_canvas.width = x - this.origX;
        this.capSelection_canvas.height = y - this.origY;

        this.capSelection_ctx = this.capSelection_canvas.getContext('2d');
        this.capSelection_ctx.drawImage(
            this.canvasReal, 
            this.origX,//Start Clipping
            this.origY,//Start Clipping
            x - this.origX,//Clipping Width
            y - this.origY,//Clipping Height
            0,//Place X
            0,//Place Y
            this.capSelection_canvas.width,//Place Width
            this.capSelection_canvas.height//Place Height
        );

        this.capSelection_data = this.capSelection_canvas.toDataURL();
        this.testImage.src = this.capSelection_data;
        this.drawCapture(this.contextDraft,this.origX,this.origY);
    }
    
    drawCapture(ctx,x,y){
        // let img = document.createElement('img');
        // img.setAttribute('src', this.capSelection_data);
        let xx = x;
        let yy = y;
        ctx.drawImage(this.testImage, xx, yy);
        // this.testImage.onload = function(){
        // }
    }

    adjustxy(x,y){
        let medX, medY;
        if (x < this.origX) {
            medX = x;
            x = this.origX
            this.origX = medX;
        };
        if (y < this.origY) {
            medY = y;
            y = this.origY
            this.origY = medY;
        };
        return [x,y];
    }
}