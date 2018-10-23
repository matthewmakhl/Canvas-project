class DrawingUndo extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal; // only modify the real canvas 
    }

    undo(){ 
            if(ImgS.undoList.length > 1){ // excuate the undo buttom if img storing  > 1 , 1 as the blank canvas
            var listchange = ImgS.undoList.pop(); // eliminate the last img inside undolist array
            this.store(listchange); // excuate to store the eliminated img to redolist
            var img = document.createElement('img');
            img.setAttribute('src', ImgS.undoList[ImgS.undoList.length - 1]);//store the last img after elinmating undolist array
            img.onload = function () {
            contextReal.clearRect(0, 0, 2000, 2000); //clear the whole canvas
            contextReal.drawImage(img, 0, 0, 2000, 2000, 0, 0, 2000, 2000); // draw the newest last img on the canvas
            }
            img.onload();
        }
    }


    store(listchange){
        ImgS.redoList.push(listchange);
    }
}