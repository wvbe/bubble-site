// VARIABLES
var xnode = new Array();
var drawtimer = 0;
var canvas_id = 'main';
var canvas;
var canvas_initial_margin = 50;
var canvas_stroke_color = '#666';
var canvas_fill_color = '#666';
var canvas_connection_width = 1;
var canvas_highlight_stroke = 1;
var highlight_color = '#f60';
var nodes_minimum_speed = 1;
var nodes_maximum_speed = 10;
var tooltip_width = 300;
var tooltip_offset_x = 10;
var tooltip_offset_y = -10;
var lastTime;
var context;
var winW;
var winH;
var boidresolution = 20000; // 1 boid/x pixels
var population_aim;
// EVENT HANDLERS

	window.onresize = function() {
		detectBrowserSize();
		resizeCanvas();

	}
	function populationChecker() {
		if(xnode.length<200) {
			addNode();
		} else {
			//console.log('Gotta remove furthest node');
			
			// dope!
			//removeFurthestNode();
		}
		setTimeout(populationChecker, 1);
	}
        window.onmouseup = function(e) {
            drawtimer = 0;
            for(i=0;i<xnode.length;i++)
		xnode[i].implodeTo(mx, my, 10, 500);
        }
        var lmx;
        var lmy;
	var mx = 0;
	var my = 0;
        window.onmousemove = function(e) {
            mx = mouseX(e);
            my = mouseY(e);
	    $('#mouse').css({top: my+'px', left: mx+'px'});
        }
	window.onload = function(e) {
            
		window.onmousemove(e);
		detectBrowserSize();
		resizeCanvas();
                
		var date = new Date();
		var lastTime = date.getTime();
		populationChecker();
		
		animateAllNodes();
                $('#bubble').click(function() {
                    addNode();
                });
                $('#burst').click(removeNode);
	};
function populate(x) {
                var n = Math.round((winW*winH)/x);
                //console.log('Making '+n+' boids for '+(Math.round((winW*winH)/100000)/10) +'MP at 1bd/'+x+'px or '+(10000/x)+' boids per hundred square pixels');
                return n;
}
	function interpretResponse(x) {
		//console.log('API', x);
		var j = 0; // iterator for number of posts
                var k = 0; // iterator for number of tags
                var tags = new Array();
		for(i = 0; i<x.posts.length; i++) {
			if(x.posts[i].type=='portfolio') {
				xnode[j] = new xNode();
				xnode[j].init(j, x.posts[i]);
                                if(xnode[j].tags.length>0) {
                                    xnode[j].tags.forEach(function(tag) {
                                        tags[k] = tag;
                                        k++;
                                    })
                                }
				j++;
			}
		}
                //tags.getUnique().forEach(function(t) {
                //    jQuery('#posts').append('<li class="activator tag" data-tag="'+t+'">'+t+'</li>');
                //});
                for(i = 0; i<xnode.length; i++) {
                    xnode[i].resetConnectionsFromTags();
                }
                //console.log('NODES', xnode);
                
                // register :hover for post names
		jQuery('.activator.post').hover(function() {
			xnode[jQuery(this).data('index')].toggleTooltip();
		});
		
		jQuery('.activator.tag').click(function() {
                    var tag = jQuery(this).data('tag');
                    xnode.forEach(function(n) {
                        n.highlight = false;
                        n.tags.forEach(function(t) {
                            if(t==tag) {
                                n.highlight = true;
                            }
                        });
                        
                    });
		});
		
                // style all tooltips to correspond with scripted width
		jQuery('.tooltip').css('width',tooltip_width+'px')
				.css('marginTop', tooltip_offset_y+'px')
				.css('marginLeft', tooltip_offset_x+'px');  

		jQuery('#log').fadeOut(500);
	}
// API
	function api() {
		query = 'http://blog.x-54.com/?json=true&count=100&callback=interpretResponse';
		var script = document.createElement('script');
		script.setAttribute('src', query);
		script.setAttribute('type', 'text/javascript');
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
// CANVAS
	  
            
            function detectBrowserSize() {
                if (document.body && document.body.offsetWidth) {
                 winW = document.body.offsetWidth;
                 winH = document.body.offsetHeight;
                }
                if (document.compatMode=='CSS1Compat' &&
                    document.documentElement &&
                    document.documentElement.offsetWidth ) {
                 winW = document.documentElement.offsetWidth;
                 winH = document.documentElement.offsetHeight;
                }
                if (window.innerWidth && window.innerHeight) {
                 winW = window.innerWidth;
                 winH = window.innerHeight;
                }
            }
	    function resizeCanvas() {
		jQuery('#'+canvas_id).css('width', winW+'px')
				.css('height', winH+'px')
				.attr('width', winW)
				.attr('height', winH);
				
		canvas = document.getElementById(canvas_id);
                context = canvas.getContext("2d");		
		context.fillStyle = canvas_fill_color;
                latest_stroke = canvas_stroke_color;
		context.strokeStyle = canvas_stroke_color;
                context.lineWidth = canvas_connection_width;
                context.globalCompositeOperation = 'destination-atop';
                
                
                
		for(i = 0; i<xnode.length; i++) {
			if(xnode[i].x>=winW||xnode[i].y>=winH) {
				//console.log('Remove node '+i);
                                //xnode.markForRemoval = true;
				//xnode.splice(i, 1);
                                xnode[i].resetFromCenter();
			}
			
		}
                population_aim = populate(boidresolution);
	    }
            
// FUNCTIONS
function animateAllNodes() {
	var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
        requestAnimFrame(animateAllNodes);
        
        
	for(i = 0; i<xnode.length; i++) {
		xnode[i].update();
	}
	
	for(i=0;i<xnode.length;i++)
	    xnode[i].explodeFrom(mx, my, 1, 300);
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	for(i = 0; i<xnode.length; i++) {
		xnode[i].affect();
		xnode[i].draw();
	}
	lastTime = time;
        // console.log(1000/timeDiff); // FPS
}
function addNode() {
    
                var new_i = xnode.length;
                xnode[new_i] = new xNode(new_i);
                xnode[new_i].init(new_i);
}
function removeNode() {
                xnode.splice(xnode.length-1, 1);
}
function removeFurthestNode() {
	var furthest = 0;
	var furthest_i = false;
	for(i = 0; i<xnode.length;i++) {
		
		var dist = Math.sqrt(Math.pow(Math.abs(winW/2-xnode[i].x), 2)+Math.pow(Math.abs(winH/2-xnode[i].y), 2));
		if(dist>furthest) {
			furthest = dist;
			furthest_i = i;
		}
	}
	//console.log('resetting', i, furthest);
	xnode[furthest_i].resetFromCenter();
	//xnode.splice(furthest_i, 1);
	
}
	
	function getInternetExplorerVersion() {
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		  rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}
function mouseX(evt) {
    if (evt.pageX) return evt.pageX;
    else if (evt.clientX)
        return evt.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
    else return null;
}
function mouseY(evt) {
    if (evt.pageY) return evt.pageY;
    else if (evt.clientY)
        return evt.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
    else return null;
}
        if (!Array.prototype.getUnique) {
            Array.prototype.getUnique = function(){
                var u = {}, a = [];
                for(var i = 0, l = this.length; i < l; ++i){
                   if(u.hasOwnProperty(this[i])) {
                      continue;
                   }
                   a.push(this[i]);
                   u[this[i]] = 1;
                }
                return a;
             }
        }
         if (!Array.prototype.forEach) {
            Array.prototype.forEach = function(fun /*, thisp*/)
            {
              var len = this.length;
              if (typeof fun != "function")
                throw new TypeError();

              var thisp = arguments[1];
              for (var i = 0; i < len; i++)
              {
                if (i in this)
                  fun.call(thisp, this[i], i, this);
              }
            };
          }
          
          