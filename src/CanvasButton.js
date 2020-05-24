class CanvasButton {
    
    constructor(ctx, canvasEle, img) {
        this.ctx = ctx ;
        this.canvasElement = canvasEle;
        this.base_image = img;
        this.prevX = 0;
        this.prevY = 0;
    }

    render(posX,posY) {
      
        this.ctx.clearRect(this.prevX , this.prevY,30 ,30);
        this.ctx.drawImage(document.getElementById("img_local"), posX, posY,30 ,30);
        this.prevX = posX;
        this.prevY = posY;
    }

}

export default CanvasButton;
