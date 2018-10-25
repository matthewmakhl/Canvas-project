class PaintBucket extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
        this.pixelStack = [];
        this.imgData;
        this.curColor = {
            r: 191,
            g: 63,
            b: 63
        };
    }

    onMouseDown(coord) {

        this.imgData = this.context.getImageData(0, 0, canvasReal.width, canvasReal.height)
        // console.log(this.imgData.data)
        this.floodFill(coord)
        this.context.putImageData(this.imgData, 0, 0);

        // console.log(this.imgData.data)
        // console.log(this.context)



    }
    onDragging(coord) {}

    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
    floodFill(coord){
        var newPos,
            x,
            y,
            pixelPos,
            reachLeft,
            reachRight


        this.pixelStack.push(coord)
        // console.log(this.pixelStack[0])
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


                if (x > 0) {
                    // console.log(this.matchStartColor(pixelPos - 4))

                    // if (this.matchStartColor(pixelPos - 4)) {
                        
                    //     if (!reachLeft) {
                    //         //add pixel to stack
                    //         this.pixelStack.push([x - 1, y])
                    //         //prevent adding pixel that will eventually handled by the downward march of the pixel we just add
                    //         reachLeft = true;
                    //     }

                    // } else if (reachLeft) {
                    //     reachLeft = false;
                    // }
                }

                // look at right
                if (x < canvasReal.width - 1) {
                    if (this.matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            //add pixel to stack
                            this.pixelStack.push(x + 1, y);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }

                }
                pixelPos += canvasReal.width * 4;
            }

        }
        console.log(this.imgData)

    }
    //check curPixel equal to starPixel
    matchStartColor(pixelPos, startR, startG, startB) {
        startR = 0
        startG = 0
        startB = 0

        var r = this.imgData.data[pixelPos];
        var g = this.imgData.data[pixelPos + 1];
        var b = this.imgData.data[pixelPos + 2];
        //   console.log(r,g,b)
        //   console.log(startR, startG, startB)
        //   console.log((r == startR && g == startG && b == startB));

        return (r === startR && g === startG && b === startB);

    }

    colorPixel(pixelPos) {
        
        this.imgData.data[pixelPos] = this.curColor.r;
        this.imgData.data[pixelPos + 1] = this.curColor.g;
        this.imgData.data[pixelPos + 2] = this.curColor.b;
        this.imgData.data[pixelPos + 3] = 255;
        //   console.log('fill')
        //   console.log(this.imgData.data[pixelPos],this.imgData.data[pixelPos + 1],this.imgData.data[pixelPos +2],this.imgData.data[pixelPos+3])

    }
}