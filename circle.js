
class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(this.contextDraft,coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.draw(this.contextReal,coord[0],coord[1]);
    }
    onMouseLeave(){}
    onMouseEnter(){}

    draw(DR,x,y){
        contextDraft.clearRect(0,0,5000,5000);
        DR.beginPath();
        DR.arc((this.origX+x)/2,(this.origY+y)/2,(Math.sqrt(Math.pow(this.origX-x,2) + Math.pow(this.origY-y,2)))/2,0,2*Math.PI);
        DR.stroke();
    }
}


// let canvasD = document.getElementById('canvas-draft');
// let contextD = canvasD.getContext('2d');
// let canvasR = document.getElementById('canvas-real');
// let contextR = canvasR.getContext('2d');
// contextD.strokeStyle = "#df4b26";
// contextR.strokeStyle = "#df4b26";
// contextD.lineJoin = "round";
// contextR.lineJoin = "round";
// contextD.lineWidth = 3;
// contextR.lineWidth = 3;
// let x1, y1;

// dragging = false;

//     $('#tool-bar #CIRCLE').click(function(){
//         if (selected.CIRCLE==0){
//             selected.CIRCLE=1;
//             unselectOther('CIRCLE');
//             $('#CIRCLE').addClass('active');
//         }else{
//             selected.CIRCLE=0;
//             $('#CIRCLE').removeClass('active');
//         };
//     })

//     $('#canvas-draft').mousedown(function(e){
//         if (selected.CIRCLE==1) {
//             x1 = e.offsetX;
//             y1 = e.offsetY;
//             dragging = true;
//         }
//     });
//     $('#canvas-draft').mousemove(function(e){
//         if (selected.CIRCLE==1){
//             if (dragging == true) {
//                 draw(contextD,e.offsetX,e.offsetY);        
//             }
//         }
//     });
//     $('#canvas-draft').mouseup(function(e){
//         if (selected.CIRCLE==1) {
//             dragging = false;
//             draw(contextR,e.offsetX,e.offsetY);
//         }
//     });
//     $('#canvas-draft').mouseleave(function(e){
//         if (selected.CIRCLE==1){
//             dragging = false;
//             contextD.clearRect(0,0,5000,5000);
//         }
//     });

//     function draw(DR,x,y){
        
//         contextD.clearRect(0,0,5000,5000);
//         DR.beginPath();
//         DR.arc((x1+x)/2,(y1+y)/2,(Math.sqrt(Math.pow(x1-x,2) + Math.pow(y1-y,2)))/2,0,2*Math.PI);
//         DR.stroke();
//     }

