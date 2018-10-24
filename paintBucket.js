class PaintBucket extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;
        this.pixelStack = [];
        this.colorLayer;
        this.curColor = {
            r: 203,
            g: 53,
            b: 148
        }           
    }
    
    onMouseDown(coord){
        this.colorLayer = this.context.getImageData(0, 0, canvasReal.width, canvasReal.height)

        console.log(this.colorLayer)
        this.pixelStack.push(coord)
        console.log(this.pixelStack)
        while(this.pixelStack.length)
        {
            var newPos, x, y, pixelPos, reachLeft, reachRight;
            newPos = this.pixelStack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = (y*canvasReal.width + x) *4;
            while (y-- >= 0 && this.matchStartColor(pixelPos)){
                pixelPos = canvasReal.width * 4;
            }
            pixelPos += canvasReal.width * 4;
            ++y;
            reachLeft = false;
            reachRight = false;
            while(y++ < canvasReal.height-1 && this.matchStartColor(pixelPos))
            {
                colorPixel(pixelPos);

                if(x > 0)
                {
                if(matchStartColor(pixelPos - 4))
                {
                    if(!reachLeft){
                    this.pixelStack.push([x - 1, y]);
                    reachLeft = true;
                    }
                }
                else if(reachLeft)
                {
                    reachLeft = false;
                }
                }
                
                if(x < canvasReal.width-1)
                {
                if(this.matchStartColor(pixelPos + 4))
                {
                    if(!reachRight)
                    {
                    pixelStack.push([x + 1, y]);
                    reachRight = true;
                    }
                }
                else if(reachRight)
                {
                    reachRight = false;
                }
                }
                        
                pixelPos += canvasReal.width * 4;
            }
        }
        this.context.putImageData(this.colorLayer, 0, 0);
            

    }
    onDragging(coord){
        this.draw(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

  
    matchStartColor(pixelPos, startR, startG, startB)
    {
      var r = this.colorLayer.data[pixelPos];	
      var g = this.colorLayer.data[pixelPos+1];	
      var b = this.colorLayer.data[pixelPos+2];
    
      return (r == startR && g == startG && b == startB);
    }
    
    colorPixel(pixelPos)
    {
      this.colorLayer.data[pixelPos] = this.curColor.r;
      this.colorLayer.data[pixelPos+1] = this.curColor.g;
      this.colorLayer.data[pixelPos+2] = this.curColor.b;
      this.colorLayer.data[pixelPos+3] = 255;
    }
}