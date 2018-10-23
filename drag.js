class DragTool extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    
    onMouseDown(coord,event){
        this.origX = coord[0] - dragLocation[0];
        this.origY = coord[1] - dragLocation[1];
    }
    onDragging(coord,event){
        this.drag(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(coord){
        dragLocation[0] = coord[0] - this.origX;
        dragLocation[1] = coord[1] - this.origY;
        $('#canvas-move').css('left',dragLocation[0]);
        $('#canvas-move').css('top',dragLocation[1]); 
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
