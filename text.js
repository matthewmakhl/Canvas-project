class TypeText extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.typedText ='';
        this.typing = 0;
        this.secondCounter = 0;
    }
    
    onMouseDown(coord,event){
        if (this.typing==1) {
            this.type(this.contextReal)
        }
        this.origX = coord[0];
        this.origY = coord[1];
        this.typing = 1;
        this.typedText = '';
    }
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    onType(e){
        var keycode = parseInt(e.which); //delete or backspace
        if (this.typing==1) {
            if (keycode == 46 || keycode == 8) {
                event.preventDefault(); //prevent back navigation from backspace
                this.typedText = this.typedText.slice(0,this.typedText.length-1);
                this.typedText = this.typedText.replace('║','');
                this.type(contextDraft);
            } else {
                this.typedText += String.fromCharCode(keycode);
                this.type(contextDraft);
            }
        }
    }

    type(DR){
        contextDraft.clearRect(0,0,5000,5000);
        DR.font = '30px Arial';
        DR.fillText(this.typedText,this.origX,this.origY);
    }

    blinkText(){
        this.secondCounter++;
        if (this.secondCounter%2 == 1) {
            this.typedText += '║';
            this.type(this.contextDraft);
        } else {
            this.typedText = this.typedText.replace('║','');
            this.type(this.contextDraft);
        }
    }
}