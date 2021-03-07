function Arc(canvas, options) {
    
    this.width = 2;
    this.color = {r:0,g:0,b:0};    
    this.startangle = -0.5*Math.PI;
    this.progress = 0;
    this.init = function(i, canvas) {
        //this.x = canvas_initial_margin+(canvas.width-2*canvas_initial_margin)*Math.random();
        //this.y = canvas_initial_margin+(canvas.height-2*canvas_initial_margin)*Math.random();		    
        this.index = i;
        this.x = canvas.w/2;
        this.y = canvas.h/2;
        this.radius = 0.25*(canvas.w+canvas.h)-0.5*this.width;
    }
    this.reset = function(canvas) {
        this.progress = 0;
    }
    this.iterate = function(canvas, siblings) {
        this.progress += Math.pow(1-this.progress, 2)/20;
    }
        
    this.draw = function(context) {        
        if(context.strokeStyle!='rgb(51,51,51)')
            context.strokeStyle = 'rgb(51,51,51)';
        context.lineWidth = this.width;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, this.startangle, this.startangle+this.progress*2*Math.PI);
        context.stroke();
        context.closePath();
        return context;
    }
    this.drawconnections = function(context) { return context; }
}