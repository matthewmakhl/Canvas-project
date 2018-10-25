var scale = 1.0;
var count = 100;

class Zooming extends PaintFunction {
    constructor(zoom, contextReal) {
        super();
        this.zoom = zoom;
        this.scale = scale;
        this.contextReal = contextReal;
        this.scaleMultiplier = 0.9;
    }

    onMouseDown(coord, e) {
        if (this.zoom == 'zoomin') {
            this.scale /= this.scaleMultiplier;
            this.zoomingdraw(this.scale);
            currentFunction.scale = this.scale; 
            this.count(1/0.9);
        } else if (this.zoom == 'zoomout') {
            this.scale *= this.scaleMultiplier;
            this.zoomingdraw(this.scale);
            currentFunction.scale = this.scale; 
            this.count(0.9);
            // } else if (this.zoom == 'null') {
            //     this.scale = 1 / this.scale;
            //     this.zoomingdraw(this.scale);
            //     console.log(this.scale);
            // }
        }
    }

    onDragging() { }
    onMouseMove() { }
    onMouseUp() { }
    onMouseLeave() { }

    onMouseEnter() { }

    zoomingdraw(scale) {
        console.log(currentFunction.scale);
        var img = document.createElement('img');
        img.setAttribute('src', ImgS.undoList[ImgS.undoList.length - 1]);//store the last img after elinmating undolist array
        img.onload = function () {
            contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
            contextReal.save();
            contextReal.scale(scale, scale);
            contextReal.setTransform(scale, 0, 0, scale, -(scale - 1) * canvasReal.width / 2, -(scale - 1) * canvasReal.height / 2);
            contextReal.drawImage(img, 0, 0); // draw the newest last img on the canvas
            contextReal.restore();
        }
    }

    count(num){
        count = count * num;
        document.getElementById("zoomvalue").value = Math.floor(count) + '%'
    }
}

