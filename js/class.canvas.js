window.requestAnimFrame = (function(callback) {
                return window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame || 
                window.oRequestAnimationFrame || 
                window.msRequestAnimationFrame ||
                function(callback) {
                window.setTimeout(callback, 1000/60);
                };
})();
function Canvas(parent, options) {
                // attributes
                this.w = options.width;
                this.h = options.height;                
                this.id = options.id; // css #id
                
                // specifiek voor dit script
                this.population = options.population;
                this.options = options;
                
                this.active = false;
                this.frame_last;
                this.frame_count = 0;
                this.frame_tarra = 0;
                this.fps = 0;
                this.c; // canvas
                this.x; // context
                this.sprites = [];
                this.boundary = {};
                this.average = {x:this.w/2, y: this.y/2};
                this.markforclearall = false;
                // specifiek voor dit script
                
                
                
                
                
                
                
                // construct
                this.index = false;
                parent.e.append('<canvas id="'+this.id+'" width="'+this.w+'" height="'+this.h+'">Canvas</canvas>');
                
                
                
                this.init = function() {
                                this.c = document.getElementById(this.id); // canvas
                                this.x = this.c.getContext("2d"); // context
                }
                this.reconfig = function(config) {
                                win.log('Reconfiguring canvas');
                                console.log('New canvas configuration:',config);
                                this.options = config;
                                
                                if(config.population!=undefined) this.population = config.population;
                                for(i = 0; i<this.sprites.length;i++) {
                                        if(config.node_size!=undefined) this.sprites[i].node_size = config.node_size;
                                        if(config.radius_near!=undefined) this.sprites[i].radius_near = config.radius_near;
                                        if(config.radius_far!=undefined) this.sprites[i].radius_far = config.radius_far;
                                        if(config.radius_void!=undefined) this.sprites[i].radius_void = config.radius_void;
                                        if(config.attraction_multiplier!=undefined) this.sprites[i].attraction_multiplier = config.attraction_multiplier;
                                        if(config.repulsion_multiplier!=undefined) this.sprites[i].repulsion_multiplier = config.repulsion_multiplier;
                                        if(config.slowdown_multiplier!=undefined) this.sprites[i].slowdown_multiplier = config.slowdown_multiplier;
                                }
                }
                this.init();
                this.resize = function() {
                                
                                jQuery('#'+this.id).css('width', win.w+'px')
                                                .css('height', win.h+'px')
                                                .attr('width', win.w)
                                                .attr('height', win.h);
                                this.w = win.w;
                                this.h = win.h;
                                this.init();
                                
                                
                }
                this.start = function() {
                    this.resize();
                    for(i=0;i<this.sprites.length;i++) {
                        this.sprites[i].reset();
                    }
                    this.active = true;
                    this.animate();
                    this.trackfps();
                    //console.log('Starting canvas:', this);
                }
                this.stop = function() {
                    this.active = false;
                }
                
                this.add = function(sprite) {
                    var length = this.sprites.length;
                    //console.log('Adding sprite:', sprite, this);
                    this.sprites[length] = sprite;
                    this.sprites[length].init(length, this);
                    
                    
                    //this.sprites[length].setup();
                    return length;
                }
                this.remove = function() {
                                this.sprites.splice(this.sprites.length-1, 1);
                }
                this.resetFurthest = function() {
                        var furthest = 0;
                        var furthest_i = false;
                        for(i = 0; i<this.sprites.length;i++) {

                                var dist = Math.sqrt(Math.pow(Math.abs(this.w/2-this.sprites[i].x), 2)+Math.pow(Math.abs(this.h/2-this.sprites[i].y), 2));
                                if(dist>furthest) {
                                        furthest = dist;
                                        furthest_i = i;
                                }
                        }
                        //console.log('resetting', i, furthest);
                        this.sprites[furthest_i].reset(this);
                }
                
                
                this.iterate = function() {
                    for(i = 0; i<this.sprites.length; i++) {
                        this.sprites[i].iterate(this.sprites);
                    }
                }
                this.draw = function() {
                    for(j = 0; j<this.sprites.length; j++) {
                        this.sprites[j].drawconnections(this.x);
                    }
                    win.mousemoved = false;
                    this.x.strokeStyle = 'rgb(51,51,51)';
                    for(j = 0; j<this.sprites.length; j++) {
                       this.sprites[j].draw(this.x);
                    }
                }
                this.clear = function() {
                    if(this.markforclearall==true) {
                        this.clearAll();
                        this.markforclearall = false;
                        return;
                        
                    }
                    margin = 10;
                    this.x.clearRect(this.boundary.minx-margin, this.boundary.miny-margin, this.boundary.maxx+margin,this.boundary.maxy+margin);
                    
                    this.boundary = {
                        minx: this.w,
                        maxx: 0,
                        miny: this.h,
                        maxy: 0
                    }
                    avg = {x:0,y:0};
                    for(j = 0; j<this.sprites.length; j++) {
                        avg.x += this.sprites[j].x;
                        avg.y += this.sprites[j].y;                        
                        if(this.sprites[j].x<this.boundary.minx) this.boundary.minx = this.sprites[j].x;
                        else if(this.sprites[j].x>this.boundary.maxx) this.boundary.maxx = this.sprites[j].x;
                        if(this.sprites[j].y<this.boundary.miny) this.boundary.miny = this.sprites[j].y;
                        else if(this.sprites[j].y>this.boundary.maxy) this.boundary.maxy = this.sprites[j].y;
                    }
                    this.average = {x: avg.x/this.sprites.length,y: avg.y/this.sprites.length};
                    if(this.boundary.minx<0) this.boundary.minx = 0;
                    if(this.boundary.miny<0) this.boundary.miny = 0;
                }
                this.clearAll = function() {
                    this.x.clearRect(0,0,this.w,this.h);
                }
                this.trackfps = function(workaround) {
                    if(workaround==undefined) workaround = this;
                    if(!workaround.active) return;
                    this.fps = this.frame_count-this.frame_tarra;
                    this.frame_tarra = this.frame_count;
                    
                    // dit kan beter met een callback via options, zelfde geldt voor wel meer dingen in dit script
                    //$('.stats-population').html(this.sprites.length);
                    //$('.stats-fps').html(this.fps);
                    
                    
                    window.setTimeout(function() {workaround.trackfps(workaround);}, 1000);
                }
                this.animate = function(workaround) {
                    if(workaround==undefined) workaround = this;
                    if(!workaround.active) return;
                    if(workaround.sprites.length<workaround.population) {
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options));
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options)); 
                        workaround.add(new Blobnode(this, workaround.options));         
                    } else if(workaround.sprites.length>workaround.population) {
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                        workaround.remove();            
                    }
                                
                    workaround.iterate();
                    workaround.clear();
                    workaround.draw();
                    requestAnimFrame(function() { workaround.animate(workaround); });
                    workaround.frame_count++;
                    //console.log('So much for frame '+workaround.frame_count);
                }
            }