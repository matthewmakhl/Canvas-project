class DragTool extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.xd = -1000;
        this.yd = -1000;
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0] - this.xd;
        this.origY = coord[1] - this.yd;
    }
    onDragging(coord,event){
        this.drag(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.xd = coord[0] - this.origX;
        this.yd = coord[1] - this.origY;
        $('#canvas-move').css('left',this.xd);
        $('#canvas-move').css('top',this.yd); 
    }
    onMouseLeave(){}
    onMouseEnter(){}

    drag(x,y){
        $('#canvas-real').css('left',x - this.origX);
        $('#canvas-draft').css('left',x - this.origX);
        $('#canvas-real').css('top',y - this.origY);
        $('#canvas-draft').css('top',y - this.origY);
    }
}

// let xd = -2500;
// let yd = -2500;
// dragging = false;

// $('#tool-bar #DRAG').click(function(){
//     if (selected.DRAG==0){
//         selected.DRAG=1;
//         unselectOther('DRAG');
//         $('#DRAG').addClass('active');
//         $('#canvas-move').css('z-index','5');
//         $('#canvas-move').css('cursor','all-scroll');
//     }else{
//         selected.DRAG=0;
//         $('#DRAG').removeClass('active');
//         $('#canvas-move').css('z-index','-1');
//         $('#canvas-move').css('cursor','default');
//     };
// })

// $('#canvas-move').mousedown(function(e){
//     if (selected.DRAG==1) {
//         x1 = e.offsetX - xd;
//         y1 = e.offsetY - yd;
//         dragging = true;
//     }
// });
// $('#canvas-move').mousemove(function(e){
//     if (selected.DRAG==1){
//         if (dragging == true) {
//             drag(e.offsetX,e.offsetY);
//         }
//     }
// });
// $('#canvas-move').mouseup(function(e){
//     if (selected.DRAG==1) {
//         dragging = false;
//         xd = -x1 + e.offsetX;
//         yd = -y1 + e.offsetY;
//         $('#canvas-move').css('left',xd);
//         $('#canvas-move').css('top',yd);  
//     }
// });
// $('#canvas-move').mouseleave(function(e){
//     if (selected.DRAG==1){
//         dragging = false;
//     }
// });

// function drag(x,y){
//     $('#canvas-real').css('left',-x1 + x);
//     $('#canvas-draft').css('left',-x1 + x);
//     $('#canvas-real').css('top',-y1 + y);
//     $('#canvas-draft').css('top',-y1 + y);
// }

