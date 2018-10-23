let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;
let selected = {
    main: 0,
    PENCIL: 0,
    STRAIGHTLINE: 0,
    RECTANGLE: 0,
    DRAG: 0,
    CIRCLE: 0,
    POLYGON: 0
}
let mouseFunction = ['#canvas-draft','#canvas-move']

for (let i in mouseFunction) {
    $(mouseFunction[i]).mousedown(function(e){
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseDown([mouseX,mouseY],e);
            dragging = true;
        }
    });
    
    $(mouseFunction[i]).mousemove(function(e){
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            if(dragging){
                currentFunction.onDragging([mouseX,mouseY],e);
            }
            currentFunction.onMouseMove([mouseX,mouseY],e);
        }
    });
    
    $(mouseFunction[i]).mouseup(function(e){
        if (selected.main) {
            dragging = false;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseUp([mouseX,mouseY],e);
        }
    });
    
    $(mouseFunction[i]).mouseleave(function(e){
        if (selected.main) {
            dragging = false;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseLeave([mouseX,mouseY],e);
        }
    });
    
    $(mouseFunction[i]).mouseenter(function(e){
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseEnter([mouseX,mouseY],e);
        }
    });

    $(mouseFunction[i]).dblclick(function(e){
        if (selected.main) {
        dragging = false;
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        currentFunction.onDobleClick([mouseX,mouseY],e);
        }
    });
    
}

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    onDobleClick(){}

} 

// ==================================
// Select tools
// ==================================

$(`#tool-bar #PENCIL`).click(function(){
    if (selected.PENCIL==0){
        unselectOther('PENCIL');
        selected.main=1;
        selected.PENCIL=1;
        $(`#PENCIL`).addClass('active');
        currentFunction = new DrawingLine(contextReal,contextDraft);
    }else{
        selected.main=0;
        selected.PENCIL=0;
        $(`#PENCIL`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #RECTANGLE`).click(function(){
    if (selected.RECTANGLE==0){
        unselectOther('RECTANGLE');
        selected.main=1;
        selected.RECTANGLE=1;
        $(`#RECTANGLE`).addClass('active');
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    }else{
        selected.main=0;
        selected.RECTANGLE=0;
        $(`#RECTANGLE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #STRAIGHTLINE`).click(function(){
    if (selected.STRAIGHTLINE==0){
        unselectOther('STRAIGHTLINE');
        selected.main=1;
        selected.STRAIGHTLINE=1;
        $(`#STRAIGHTLINE`).addClass('active');
        currentFunction = new DrawingStraightLine(contextReal,contextDraft);
    }else{
        selected.main=0;
        selected.STRAIGHTLINE=0;
        $(`#STRAIGHTLINE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #CIRCLE`).click(function(){
    if (selected.CIRCLE==0){
        unselectOther('CIRCLE');
        selected.main=1;
        selected.CIRCLE=1;
        $(`#CIRCLE`).addClass('active');
        currentFunction = new DrawingCircle(contextReal,contextDraft);
    }else{
        selected.main=0;
        selected.CIRCLE=0;
        $(`#CIRCLE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #DRAG`).click(function(){
    if (selected.DRAG==0){
        unselectOther('DRAG');
        selected.main=1;
        selected.DRAG=1;
        $(`#DRAG`).addClass('active');
        currentFunction = new DragTool(contextReal,contextDraft);
        $('#canvas-move').css('z-index','5');
        $('#canvas-move').css('cursor','all-scroll');
        
    }else{
        selected.main=0;
        selected.DRAG=0;
        $(`#DRAG`).removeClass('active');
        currentFunction = {};
        $('#canvas-move').css('z-index','-1');
        $('#canvas-move').css('cursor','default');
    };
})

    $(`#tool-bar #POLYGON`).click(function(){
        if (selected.POLYGON==0){
            unselectOther('POLYGON');
            selected.main=1;
            selected.POLYGON=1;
            $(`#POLYGON`).addClass('active');

            $('#display').css('display','block');
            currentFunction = new DrawingPolygon(contextReal,contextDraft);

        }else{
            selected.main=0;
            selected.POLYGON=0;
            console.log('unselect')
            $(`#POLYGON`).removeClass('active');

            $('#display').css('display','none');
            currentFunction = {};
        };
    })
    


    $('#PEANUT').click(function(e){
        selected.main=1;
        console.log('peanut');
        console.log(contextReal,contextDraft)
        currentFunction= new DrawingPeanut(contextReal,contextDraft);
    })

// ==================================
// unselect other active tools when selecting
// ==================================

function unselectOther(id){
    for (let i in selected) {
        if ((i != 'main')&&(selected[i]!=0)){
            $(`#tool-bar #${i}`).trigger('click');
        }
        if (i == 'DRAG') {
            $('#canvas-move').css('z-index','-1');
            $('#canvas-move').css('cursor','default');
        }
    }
}
