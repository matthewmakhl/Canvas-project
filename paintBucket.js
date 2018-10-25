class PaintBucket extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.pixelStack = [];
        this.imgData;
        this.curColor = {};
        this.startPOS;
        this.startR;
        this.startG;
        this.startG;
    }

    onMouseDown(coord) {
        this.HEXtoRGB()
        this.imgData = this.context.getImageData(0, 0, canvasReal.width, canvasReal.height)
        this.startPOS = (coord[1] * canvasReal.width + coord[0]) * 4;
        this.startR = this.imgData.data[this.startPOS];
        this.startG = this.imgData.data[this.startPOS + 1];
        this.startB = this.imgData.data[this.startPOS + 2];
        this.floodFill(coord)
        //put filled image
        this.context.putImageData(this.imgData, 0, 0);
    }
    onDragging(coord) {}

    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
    floodFill(coord) {
        var newPos,
            x,
            y,
            pixelPos,
            reachLeft,
            reachRight

        this.pixelStack.push(coord)

        while (this.pixelStack.length) {
            newPos = this.pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            //get current pixel position
            pixelPos = (y * canvasReal.width + x) * 4;

            //go up as long as the color matches and are inside the canvas
            while (y >= 0 && this.matchStartColor(pixelPos)) {
                y -= 1;
                pixelPos -= canvasReal.width * 4;
            }
            pixelPos += canvasReal.width * 4;
            y += 1;
            reachLeft = false;
            reachRight = false;

            //go down as long as the color matches in inside the canvas
            while (y <= canvasReal.height - 1 && this.matchStartColor(pixelPos)) {
                y += 1;
                this.colorPixel(pixelPos);

                //check left pixel
                if (x > 0) {
                    if (this.matchStartColor(pixelPos - 4)) {

                        if (!reachLeft) {
                            //add pixel to stack
                            this.pixelStack.push([x - 1, y])
                            //prevent adding pixel that will eventually handled by the downward march of the pixel we just add
                            reachLeft = true;
                        }

                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                // check right pixel
                if (x < canvasReal.width - 1) {
                    if (this.matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            //add pixel to stack
                            this.pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }

                }
                pixelPos += canvasReal.width * 4;
            }

        }

    }
    //check curPixel equal to starPixel
    matchStartColor(pixelPos) {
        var r = this.imgData.data[pixelPos];
        var g = this.imgData.data[pixelPos + 1];
        var b = this.imgData.data[pixelPos + 2];
        return (r === this.startR && g === this.startG && b === this.startB);
    }
    //fill current color
    colorPixel(pixelPos) {
        this.imgData.data[pixelPos] = this.curColor.r;
        this.imgData.data[pixelPos + 1] = this.curColor.g;
        this.imgData.data[pixelPos + 2] = this.curColor.b;
        this.imgData.data[pixelPos + 3] = 255;
    }
    //convert hex to rgb color
    HEXtoRGB() {
        var hex = document.getElementById("color").value;
        if (hex.charAt(0) === '#') {
            hex = hex.substr(1);
        }
        if ((hex.length < 2) || (hex.length > 6)) {
            return false;
        }
        var values = hex.split(''),
            r,
            g,
            b;
        if (hex.length === 6) {
            r = parseInt(values[0].toString() + values[1].toString(), 16);
            g = parseInt(values[2].toString() + values[3].toString(), 16);
            b = parseInt(values[4].toString() + values[5].toString(), 16);
        } else {
            return false;
        }
        return this.curColor = {
            r,
            g,
            b
        }
    }
}