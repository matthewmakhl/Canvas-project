var zoomfactor = 2;
// var scale = 1.0;
// var scaleMultiplier = 0.9;

class Zooming extends PaintFunction {
    constructor(zoom,contextReal) {
        super();
        this.zoom = zoom;
        this.contextReal = contextReal;
        this.scale = 1.0
        this.scaleMultiplier = 0.9;
    }
    
    onMouseDown(coord, e) {
        if (this.zoom == 'zoomin') {
            this.scale /= this.scaleMultiplier;
            this.zoomingdraw(this.scale);
        } else if (this.zoom == 'zoomout') {
            this.scale *= this.scaleMultiplier;
            this.zoomingdraw(this.scale);
        } else if (this.zoom == 'null') {
            this.scale = 1;
            this.zoomingdraw(this.scale);
            console.log(this.scale);
        }

    }

    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() { }

    onMouseEnter() {}

    zoomingdraw(scale) {
        var img = document.createElement('img');
        img.setAttribute('src', ImgS.undoList[ImgS.undoList.length - 1]);//store the last img after elinmating undolist array
        console.log(ImgS.undoList);
        img.onload = function () {
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            contextReal.save();
            contextReal.scale(scale, scale);
            contextReal.setTransform(scale, 0, 0, scale, -(scale - 1) * canvasReal.width / 2, -(scale - 1) * canvasReal.height / 2);
            contextReal.drawImage(img, 0, 0); // draw the newest last img on the canvas
            contextReal.restore();
        }
        // img.onload();// >>>>>>>>>>>>>>>>>>>>>>> *** why when I add the .onload() method, the drawing will not be refreshed, meant normal setting now
    }
}



