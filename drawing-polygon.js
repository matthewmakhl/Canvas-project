class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        // this.contextDraft.strokeStyle = '#bbbbbb'; //william modify 
        // this.contextDraft.fillStyle = 'white'; //william modify 
        this.contextDraft.lineJoin = 'round';
        this.contextDraft.lineWidth = 5;
        // this.contextReal.strokeStyle = '#bbbbbb'; //william modify
        // this.contextReal.fillStyle = '#aaaaaa'; //william modify
        this.contextReal.lineJoin = 'round';
        this.contextReal.lineWidth = 5;
        this.polygonCoord = [];
        this.down = false;

        this.finish = $('#finish').click(function(e){
            //terminate mousemove
            currentFunction.down=false;
            if(currentFunction.polygonCoord.length > 0){
                currentFunction.finishPolygon(currentFunction.contextReal,currentFunction.polygonCoord);
                currentFunction.contextDraft.clearRect(0,0,canvasReal.width,canvasReal.height);
                //clear polygonCoord  
                currentFunction.polygonCoord = [];
            }
        })
    }

    onMouseDown(coord,event){

        this.origX = coord[0];
        this.origY = coord[1];
        this.polygonCoord.push({upX: this.origX,upY:this.origY})
        this.down = true;
        this.isDash(this.contextReal);
        if(this.polygonCoord.length > 1){
        for (var x=1; x<this.polygonCoord.length;x++){
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.polygonCoord[x-1].upX,this.polygonCoord[x-1].upY);
            this.contextReal.lineTo(this.polygonCoord[x].upX,this.polygonCoord[x].upY);
            this.contextReal.stroke();
            }
        }
        this.contextReal.fillStyle = document.getElementById("color").value; //william modify
        this.contextDraft.fillStyle = document.getElementById("color").value; // william modify
        this.contextReal.strokeStyle = document.getElementById("color").value; //william modify
        this.contextDraft.strokeStyle = document.getElementById("color").value; // william modify

    }
    onDragging(coord,event){
    }

    onMouseMove(coord, event){
        this.moveX = coord[0];
        this.moveY = coord[1];
        this.contextDraft.clearRect(0,0,canvasReal.width,canvasReal.height);
            if (this.down == true) {
                this.contextDraft.beginPath();
                this.contextDraft.moveTo(this.origX,this.origY);
                this.contextDraft.lineTo(coord[0], coord[1]);
                this.contextDraft.stroke();

                for (var x=0;x<this.polygonCoord.length;x++){
                    this.contextDraft.lineTo(this.polygonCoord[x].upX,this.polygonCoord[x].upY)                
                }
            }
    };

    onMouseUp(coord, event){
    };

    onMouseLeave(){};
    onMouseEnter(){};
    //set dash line
    isDash(ctx){
        if (selected.DASH==1){
            ctx.setLineDash([5,5])
        } else {
            ctx.setLineDash([])
        }
    }
    finishPolygon(ctx, array){
        ctx.moveTo(array[0].upX,array[0].upY)
        for (var i=1;i<array.length;i++){
            ctx.lineTo(array[i].upX,array[i].upY);
        }
        


        if (selected.FILL==0){
            ctx.beginPath();
            ctx.moveTo(array[array.length-1].upX,array[array.length-1].upY);
            ctx.lineTo(array[0].upX,array[0].upY);
            ctx.closePath();
            ctx.stroke();  
        } else {
            ctx.fill();
        }
    }
    
 

}
