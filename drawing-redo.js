class DrawingRedo extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;  // only modify the real canvas 
    }

    redo(){
            if(ImgS.redoList.length){ // excuate the redo buttom if img storing  > 0 
            var redolistchange = ImgS.redoList.pop(); // eliminate the last img inside undolist array
            this.store(redolistchange); // excuate to store the eliminated img to undolist
            var img = document.createElement('img');
            img.setAttribute('src', ImgS.undoList[ImgS.undoList.length - 1]);//store the last img after elinmating redolist array 
            img.onload = function () {
            contextReal.clearRect(0, 0, 2000, 2000); //clear the whole canvas
            contextReal.drawImage(img, 0, 0, 2000, 2000, 0, 0, 2000, 2000); // draw the newest last img on the canvas
            }
            img.onload();
        }
    }
    

    store(redolistchange){
        ImgS.undoList.push(redolistchange);
    }
}