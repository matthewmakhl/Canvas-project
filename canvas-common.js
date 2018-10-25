let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction = {};
let dragging = false;
let selected = {
    main: 0,
    PENCIL: 0,
    STRAIGHTLINE: 0,
    RECTANGLE: 0,
    DRAG: 0,
    CIRCLE: 0,
    SELECTION: 0,
    PEANUT: 0,
    POLYGON: 0,
    TYPE: 0,
    ZOOMIN: 0,
    ZOOMOUT: 0,
    NULL: 0,
    UNDO: 0,
    REDO: 0,
    WIDTHUP: 0,
    WIDTHDOWN: 0
}
let mouseFunction = ['#canvas-draft', '#canvas-move'];
let dragLocation = [-1000, -1500];
var valuedetect = document.getElementById("valuebox").value;

let ImgS = {
    undoList: [], //initialize the blank undolist ((william))
    redoList: [] //initialize the blank redolist ((william))
};
$(function () {
    ImgS.undoList.push(canvasReal.toDataURL());

}); // for every time of page ready, the imagine will be stored into the undolist first

for (let i in mouseFunction) {
    $(mouseFunction[i]).mousedown(function (e) {
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseDown([mouseX, mouseY], e);
            dragging = true;
        }
    });

    $(mouseFunction[i]).mousemove(function (e) {
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            if (dragging) {
                currentFunction.onDragging([mouseX, mouseY], e);
            }
            currentFunction.onMouseMove([mouseX, mouseY], e);
        }
    });

    $(mouseFunction[i]).mouseup(function (e) {
        if (selected.main) {
            dragging = false;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseUp([mouseX, mouseY], e);
        }
        ImgS.undoList.push(canvasReal.toDataURL());
        ImgS.redoList = [];
    });

    $(mouseFunction[i]).mouseleave(function (e) {
        if (selected.main) {
            dragging = false;
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseLeave([mouseX, mouseY], e);
        }
    });

    $(mouseFunction[i]).mouseenter(function (e) {
        if (selected.main) {
            let mouseX = e.offsetX;
            let mouseY = e.offsetY;
            currentFunction.onMouseEnter([mouseX, mouseY], e);
        }
    });

}

$(document).keypress(function (e) {
    if (selected.main && selected.TYPE) {
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        currentFunction.onType([mouseX, mouseY], e);
    }
});

class PaintFunction {
    constructor() { }
    onMouseDown() { }
    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }
}

// ==================================
// Select tools
// ==================================

$(`#tool-bar #PENCIL`).click(function () {
    if (selected.PENCIL == 0) {
        unselectOther('PENCIL');
        selected.main = 1;
        selected.PENCIL = 1;
        $(`#PENCIL`).addClass('active');
        currentFunction = new DrawingLine(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.PENCIL = 0;
        $(`#PENCIL`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #RECTANGLE`).click(function () {
    if (selected.RECTANGLE == 0) {
        unselectOther('RECTANGLE');
        selected.main = 1;
        selected.RECTANGLE = 1;
        $(`#RECTANGLE`).addClass('active');
        currentFunction = new DrawingRectangle(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.RECTANGLE = 0;
        $(`#RECTANGLE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #STRAIGHTLINE`).click(function () {
    if (selected.STRAIGHTLINE == 0) {
        unselectOther('STRAIGHTLINE');
        selected.main = 1;
        selected.STRAIGHTLINE = 1;
        $(`#STRAIGHTLINE`).addClass('active');
        currentFunction = new DrawingStraightLine(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.STRAIGHTLINE = 0;
        $(`#STRAIGHTLINE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #CIRCLE`).click(function () {
    if (selected.CIRCLE == 0) {
        unselectOther('CIRCLE');
        selected.main = 1;
        selected.CIRCLE = 1;
        $(`#CIRCLE`).addClass('active');
        currentFunction = new DrawingCircle(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.CIRCLE = 0;
        $(`#CIRCLE`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #DRAG`).click(function () {
    if (selected.DRAG == 0) {
        unselectOther('DRAG');
        selected.main = 1;
        selected.DRAG = 1;
        $(`#DRAG`).addClass('active');
        currentFunction = new DragTool(contextReal, contextDraft);
        $('#canvas-move').css('z-index', '5');
        $('#canvas-move').css('cursor', 'all-scroll');
    } else {
        selected.main = 0;
        selected.DRAG = 0;
        $(`#DRAG`).removeClass('active');
        currentFunction = {};
        $('#canvas-move').css('z-index', '-1');
        $('#canvas-move').css('cursor', 'default');
    };
})

$(`#tool-bar #POLYGON`).click(function () {
    if (selected.POLYGON == 0) {
        unselectOther('POLYGON');
        selected.main = 1;
        selected.POLYGON = 1;
        $(`#POLYGON`).addClass('active');
        currentFunction = new DrawingPolygon(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.POLYGON = 0;
        $(`#POLYGON`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #SELECTION`).click(function () {
    if (selected.SELECTION == 0) {
        unselectOther('SELECTION');
        selected.main = 1;
        selected.SELECTION = 1;
        $(`#SELECTION`).addClass('active');
        currentFunction = new Selection(canvasReal, canvasDraft, contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.SELECTION = 0;
        $(`#SELECTION`).removeClass('active');
        currentFunction.drawCapture(currentFunction.contextReal, currentFunction.origX, currentFunction.origY);
        currentFunction = {};
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    };
})

$(`#tool-bar #PEANUT`).click(function () {
    if (selected.PEANUT == 0) {
        unselectOther('PEANUT');
        selected.main = 1;
        selected.PEANUT = 1;
        $(`#PEANUT`).addClass('active');
        currentFunction = new DrawingPeanut(contextReal, contextDraft);
    } else {
        selected.main = 0;
        selected.PEANUT = 0;
        $(`#PEANUT`).removeClass('active');
        currentFunction = {};
    };
})

$(`#tool-bar #CLEAR`).mousedown(function () {
    unselectOther('CLEAR');
    $(`#CLEAR`).addClass('active');
})

$(`#tool-bar #CLEAR`).mouseup(function () {
    $(`#CLEAR`).removeClass('active');
    contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
})

$(`#tool-bar #CLEAR`).mouseleave(function () {
    $(`#CLEAR`).removeClass('active');
});

$(`#tool-bar #TYPE`).click(function () {
    if (selected.TYPE == 0) {
        unselectOther('TYPE');
        selected.main = 1;
        selected.TYPE = 1;
        $(`#TYPE`).addClass('active');
        $('#canvas-draft').css('cursor', 'text');
        $('body').css('cursor', 'text');
        currentFunction = new TypeText(contextReal, contextDraft);
    } else {
        currentFunction.typedText = currentFunction.typedText.replace('║', '');
        currentFunction.type(contextReal);
        selected.main = 0;
        selected.TYPE = 0;
        $(`#TYPE`).removeClass('active');
        currentFunction = {};
        $('#canvas-draft').css('cursor', 'default');
        $('body').css('cursor', 'default');
    };
})

$(`.header-section #ZOOMIN`).click(function () {
    if (selected.ZOOMIN == 0) {
        unselectOther('ZOOMIN');
        selected.main = 1;
        selected.ZOOMIN = 1;
        $(`#ZOOMIN`).addClass('active');
        $('.frame').css({ "cursor": "zoom-in" })
        currentFunction = new Zooming('zoomin', contextReal);
    } else {
        selected.main = 0;
        selected.ZOOMIN = 0;
        $(`#ZOOMIN`).removeClass('active');
        $('.frame').css({ "cursor": "default" })
        currentFunction = {};
    };
})

$(`.header-section #ZOOMOUT`).click(function () {
    if (selected.ZOOMOUT == 0) {
        unselectOther('ZOOMOUT');
        selected.main = 1;
        selected.ZOOMOUT = 1;
        $(`#ZOOMOUT`).addClass('active');
        $('.frame').css({ "cursor": "zoom-out" })
        currentFunction = new Zooming('zoomout', contextReal);
    } else {
        selected.main = 0;
        selected.ZOOMOUT = 0;
        $(`#ZOOMOUT`).removeClass('active');
        $('.frame').css({ "cursor": "default" })
        currentFunction = {};
    };
})



$(`.header-section #UNDO`).mousedown(function () {
    unselectOther('UNDO');
    $(`#UNDO`).addClass('active');
})

$(`.header-section #UNDO`).mouseup(function () {
    $(`#UNDO`).removeClass('active');
    currentFunction = new DrawingUndo(contextReal);
    currentFunction.undo();
    console.log(ImgS);
})

$(`.header-section #REDO`).mousedown(function () {
    unselectOther('REDO');
    $(`#REDO`).addClass('active');
})

$(`.header-section #REDO`).mouseup(function () {
    $(`#REDO`).removeClass('active');
    currentFunction = new DrawingRedo(contextReal);
    currentFunction.redo();
})

$(`#header-tool-bar #WIDTHUP`).mousedown(function () {
    unselectOther('WIDTHUP');
    $(`#WIDTHUP`).addClass('active');
})

$(`#header-tool-bar #WIDTHUP`).mouseup(function () {
    $(`#WIDTHUP`).removeClass('active');
    valuedetect++; //for every #drawing-up clicking, valuedetect will increase 1 
    document.getElementById("valuebox").value = valuedetect; //show value change on the input screen
})

$(`#header-tool-bar #WIDTHDOWN`).mousedown(function () {
    unselectOther('WIDTHDOWN');
    $(`#WIDTHDOWN`).addClass('active');
})

$(`#header-tool-bar #WIDTHDOWN`).mouseup(function () {
    $(`#WIDTHDOWN`).removeClass('active');
    valuedetect--; //for every #drawing-up clicking, valuedetect will increase 1 
    document.getElementById("valuebox").value = valuedetect; //show value change on the input screen
})

setInterval(
    function () {
        if (currentFunction != {}) {
            if (currentFunction.constructor.name == 'TypeText') {
                currentFunction.blinkText();
            }
        }
    }, 500
);

// ==================================
// unselect other active tools when selecting
// ==================================

function unselectOther(id) {
    for (let i in selected) {
        if ((i != 'main') && (selected[i] != 0)) {
            $(`#tool-bar #${i}`).trigger('click');
            $(`.header-section #${i}`).trigger('click');
        }
        if (i == 'DRAG') {
            $('#canvas-move').css('z-index', '-1');
            $('#canvas-move').css('cursor', 'default');
        }
    }
}