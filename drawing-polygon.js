class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.contextDraft.strokeStyle = '#bbbbbb';
        // this.contextDraft.fillStyle = 'white';
        this.contextDraft.lineJoin = 'round';
        this.contextDraft.lineWidth = 5;
        this.contextReal.strokeStyle = '#bbbbbb';
        this.contextReal.fillStyle = '#aaaaaa';
        this.contextReal.lineJoin = 'round';
        this.contextReal.lineWidth = 5;
        this.polygonCoord = [];
        this.down = false;
        this.ifFinish = false;
        this.isdisplay = {finish:$('#finish').css('display','block'),lineDash:$('#lineDash').css('display','block'),lineSolid:$('#lineSolid').css('display','block'),isdisplay:$('#display').css('display','block')}
        this.line = $('#lineDash').click(function(e){
                        console.log('click')
                        currentFunction.contextReal.setLineDash([5,5])
                    })
        this.dash = $('#lineSolid').click(function(e){
                        console.log('click')
                        currentFunction.contextReal.setLineDash([])
                    })
    }

    onMouseDown(coord,event){

        this.origX = coord[0];
        this.origY = coord[1];
        this.polygonCoord.push({upX: this.origX,upY:this.origY})
        this.down = true;
        if(this.polygonCoord.length > 1){
        for (var x=1; x<this.polygonCoord.length;x++){
            this.contextReal.beginPath();
            this.contextReal.moveTo(this.polygonCoord[x-1].upX,this.polygonCoord[x-1].upY);
            this.contextReal.lineTo(this.polygonCoord[x].upX,this.polygonCoord[x].upY);
            this.contextReal.stroke();
            }
        }
        this.finish();

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
                // this.contextDraft.fill();
            }
    };

    onMouseUp(coord, event){
    };

    onMouseLeave(){};
    onMouseEnter(){};

    finish(){
        if(currentFunction.ifFinish == false){


            $('#finish').click(function(e){
                currentFunction.down=false;
                if(currentFunction.polygonCoord.length > 0){
                    currentFunction.finishPolygon(currentFunction.contextReal,currentFunction.polygonCoord);
                    currentFunction.contextDraft.clearRect(0,0,canvasReal.width,canvasReal.height);
                    currentFunction.polygonCoord = [];
                    // console.log(currentFunction.polygonCoord)
                } else return currentFunction.ifFinish = true;
            })


        }
    }

    finishPolygon(ctx, array){
        ctx.moveTo(array[0].upX,array[0].upY)
        for (var i=1;i<array.length;i++){
            ctx.lineTo(array[i].upX,array[i].upY);
        }
        ctx.fill();
    }
    

}
