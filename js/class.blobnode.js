

        function normalize(p,len) {
            if((p.x == 0 && p.y == 0) || len == 0) {
                return {x:0, y:0};
            }    
            var angle = Math.atan2(p.y,p.x);
            var nx = Math.cos(angle) * len;
            var ny = Math.sin(angle) * len;
            return {x:nx, y:ny};
        }

function Blobnode(canvas, options) {
    
    this.node_size = options.node_size;
    this.radius_near = options.radius_near;
    this.radius_far = options.radius_far; // 270
    this.radius_void = options.radius_void;    
    this.attraction_multiplier = options.attraction_multiplier; // 0.005 of desnoods 0.01
    this.repulsion_multiplier = options.repulsion_multiplier;
    this.slowdown_multiplier = options.slowdown_multiplier;
    
    this.index = 0;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.connections = [];
    this.color = {r:0,g:0,b:0};
    
    this.init = function(i, canvas) {
        //this.x = canvas_initial_margin+(canvas.width-2*canvas_initial_margin)*Math.random();
        //this.y = canvas_initial_margin+(canvas.height-2*canvas_initial_margin)*Math.random();		    
        this.index = i;
        this.resetFromCenter(canvas);
        this.resetDirection();
        this.resetColor();
        //console.log(this);
    }
    this.reset = function(canvas) {
        if(canvas!=undefined)
            this.resetFromCenter(canvas.c);
        this.resetDirection();
        this.resetColor();
    }
        this.resetColor = function() {
            this.color = {
                r:Math.round(255*Math.random()),
                g:Math.round(255*Math.random()),
                b:Math.round(255*Math.random())
                }
        }
        this.resetDirection = function() {			
            this.dx = 0;//nodes_minimum_speed+(nodes_maximum_speed-nodes_minimum_speed)*Math.random()*(Math.random()-0.5)*2;
            this.dy = 0;//nodes_minimum_speed+(nodes_maximum_speed-nodes_minimum_speed)*Math.random()*(Math.random()-0.5)*2;
        }
        this.resetFromCenter = function(canvas) {
                this.x = canvas.w/2+(Math.random()-0.5)*10;
                this.y = canvas.h/2+(Math.random()-0.5)*10;
        }
        
        
    this.iterate = function(xnode) {
        this.connections = [];
        for(var i = this.index+1; i<xnode.length;i++) {
            node = xnode[i];
            var ax = this.x;
            var ay = this.y;
            var bx = node.x;
            var by = node.y;
            //var distance =  Math.abs(ax-bx)+Math.abs(ay-by);
            var distance = Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
            if(distance<this.radius_near&&this.repulsion_multiplier>0) {
                // afstoten
                var force = Math.pow(this.repulsion_multiplier*(this.radius_near-distance)/this.radius_near, 2);
                this.dx += force*(ax-bx);
                this.dy += force*(ay-by);
                node.dx += -force*(ax-bx);
                node.dy += -force*(ay-by);
                // afstoten
                //if(distance<(this.radius_near-1))
                
                    var connection = {
//                        r: Math.round((this.color.r+node.color.r)/2),
//                        g: Math.round((this.color.g+node.color.g)/2),
//                        b: Math.round((this.color.b+node.color.b)/2),
                        r:51,g:51,b:51,
                        node: node,
                        dist: distance/this.radius_near
                    };
                    this.connections.push(connection);
            } else if(distance<this.radius_far) {
               
            } else if(distance<this.radius_void&&this.attraction_multiplier>0) {
                // aantrekken
                
                var force = Math.pow(this.attraction_multiplier*distance/this.radius_void, 1.3);
                this.dx += -force*(ax-bx);
                this.dy += -force*(ay-by);
                node.dx += force*(ax-bx);
                node.dy += force*(ay-by);
            }  
        }
        
        if(win.mousemoved==true)
            this.explodeFrom(win.mouse.x,win.mouse.y, 1,300);
        // positie updaten adhv dx/dy, en bounce als positie buiten speelveld is
        if(this.dx==0&&this.dy==0) return;  
        
        this.dx *= this.slowdown_multiplier;
        this.dy *= this.slowdown_multiplier;
            this.x += this.dx;
            this.y += this.dy;
            
            if(this.x<0||this.x>canvas.w) {
                this.dx *= -1;
                if(this.x<0) this.x = 0;
                else if(this.x>canvas.w) this.x = canvas.w;
                
            }
            if(this.y<0||this.y>canvas.h) {
                this.dy *= -1;
                if(this.y<0) this.y = 0;
                else if(this.y>canvas.h) this.y = canvas.h;
            }
    }
    this.explodeFrom = function(x, y, max_speed, max_dist) {
        var ddx = x-this.x;
        var ddy = y-this.y;
        var dist = Math.sqrt((ddx*ddx) + (ddy*ddy));
        if(dist<=max_dist) {                        
            var nd = normalize({x:-ddx, y:-ddy}, max_speed*((max_dist-dist)/max_dist));
            this.dx += 10*nd.x;
            this.dy += 10*nd.y;                        
        }
    }
    this.implodeTo = function(x, y, max_speed, max_dist) {
        var ddx = x-this.x;
        var ddy = y-this.y;
        var dist = Math.sqrt((ddx*ddx) + (ddy*ddy));
        if(dist<=max_dist) {  // ligt in effectgebied?
            var nd = normalize({x:-ddx, y:-ddy}, max_speed*((max_dist-dist)/max_dist));
            this.dx -= 10*nd.x;
            this.dy -= 10*nd.y;                        
        }
    }
    this.draw = function(context) {
        
        context.beginPath();
        context.arc(this.x, this.y, this.node_size, 0, Math.PI*2, true);                    
        context.closePath();
        context.stroke();
        //canvas.x = this.connectToNode(canvas.x, 'rgb('+conn_color.r+','+conn_color.g+','+conn_color.b+')', node);
        //console.log('Node '+this.index+' ('+this.x+','+this.y+')');
        //return context;
    }
    
    
    
    this.drawconnections = function(context) {
        for(i = 0;i<this.connections.length;i++) {            
            this.connectToNode(context, this.connections[i]);    
        }
        //return context;
    }
    this.connectToNode = function(context, conn) {
            context.strokeStyle = 'rgba('+conn.r+','+conn.g+','+conn.b+', '+(0.1+Math.round(Math.pow(1-conn.dist, 2)*9)/10)+')';
            context.beginPath();
            context.moveTo(this.x,this.y);
            context.lineTo(conn.node.x,conn.node.y);
            context.closePath();
            context.stroke();
            return context;
    }
    
    
}