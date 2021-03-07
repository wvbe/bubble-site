/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-opacity-rgba-csstransitions-canvas-history-touch-shiv-mq-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-ie8compat-load
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a){var e=a[d];if(!D(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return w("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.history=function(){return!!a.history&&!!history.pushState},q.rgba=function(){return A("background-color:rgba(150,255,150,.5)"),D(j.backgroundColor,"rgba")},q.opacity=function(){return B("opacity:.55"),/^0.55$/.test(j.opacity)},q.csstransitions=function(){return G("transition")};for(var H in q)z(q,H)&&(v=H.toLowerCase(),e[v]=q[H](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)z(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},A(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=x,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});


// WINDOW
function Window(selector) {
    this.w = 0;
    this.h = 0;
    this.e = $(selector);
    this.mouse = {x:0,y:0};
    this.mousemoved = false;
    this.resize = function() {
        if (document.body && document.body.offsetWidth) {
            this.w = document.body.offsetWidth;
            this.h = document.body.offsetHeight;
        }
        if (document.compatMode=='CSS1Compat' &&
            document.documentElement &&
            document.documentElement.offsetWidth ) {
            this.w = document.documentElement.offsetWidth;
            this.h = document.documentElement.offsetHeight;
        }
        if (window.innerWidth && window.innerHeight) {
            this.w = window.innerWidth;
            this.h = window.innerHeight;
        }
        $('.stats-resolution').html(this.w+'x'+this.h+'<br />'+Math.round(this.w*this.h*0.00001)/10+'MP');
    }
    this.mousemove = function(e) {
        //if(e.changedTouches.length>0)
        //    this.mouse = {x:this.mx(e.changedTouches[0]),y:this.my(e.changedTouches[0])};
        //else
            win.mouse = {x:this.mx(e),y:this.my(e)};
            win.mousemoved = true;
        //$('#mousepos').html('X:'+this.mouse.x+',Y:'+this.mouse.y);
    }
        this.mx = function(evt) {
            if (evt.pageX) return evt.pageX;
            else if (evt.clientX)
                return evt.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
            else return null;
        }
        this.my = function(evt) {
            if (evt.pageY) return evt.pageY;
            else if (evt.clientY)
                return evt.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
            else return null;
        }
    
    this.switch = function(id) {
        if($('.page.active').attr('id')!=id)  {
            $('.page').removeClass('active');
            $('#'+id+'.page').addClass('active');
        }
    }
    this.log = function(msg) {
        $('#log').append('<li>'+msg+'</li>');
    }
    
    
    this.resize();
}

// CANVAS
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

// BLOBNODE



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

// ARC
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
// WORDPRESS
// todo: juiste thumbnailformaat binnen WP maken


function Wordpress(api_url) {
    this.api_url = api_url;
    this.target = '#content';
    this.api = function(url, callback, target) {
        this.target = target;
        $('.page').removeClass('in-transit');
        if($('#'+target).length<1) {
            win.log('Quering Wordpress api');
            var temp_element = $('#'+target+'-temp');
            if(temp_element.length<1) $('body').append('<section class="page wordpress in-transit" id="'+target+'-temp"></section>');
            else temp_element.html('').addClass('in-transit');
            callback = 'wp.interpret';
            if(url.indexOf('?')==-1) query = url+'?json=true&count=100&callback='+callback;
            else query = url+'&json=true&count=100&callback='+callback;
            var script = document.createElement('script');
            script.setAttribute('src', query);
            script.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('body')[0].appendChild(script);
        }
    }
    this.interpret = function(data) {
        if(data.posts!=undefined)
            type = 'posts';
        $('.page').removeClass('in-transit');
        if(type=='posts') this.interpretPosts(data);
    }
    this.interpretPosts = function(data) {
        html = '';
        rest = 3-data.posts.length%3;
        if(rest!=0) for(i=0;i<rest;i++) html += '<div class="post-thumbnail"></div>';
        for(i=0;i<data.posts.length;i++) {
            post = data.posts[i];
            thumbnail = false;
            for(j=0;j<post.attachments.length&&thumbnail==false;j++) {
                //if(post.attachments[j].images['post-thumbnail'].url==post.thumbnail)
                    //thumbnail = post.attachments[j].images.medium.url;
            }
            if(thumbnail==false) thumbnail = post.thumbnail;
            
            html += '<a href="'+post.url+'" class="post-thumbnail" target="_blank" style="background-image: url(\''+thumbnail+'\');"><span class="title">'+post.title+'</span></a>';
        }
        $('#'+this.target+'-temp').html(html).attr('id', this.target).addClass('active');
        
        
        
    }
}
// EVENTS AND FUNCTIONS
            
            
//                    var config_oud = {
//                        width: win.w,
//                        height: win.h,
//                        id: 'main'+j,
//                        population: 300,
//                        node_size: 2,
//                        radius_near: 20,
//                        radius_far: 270,
//                        radius_void: 320,
//                        attraction_multiplier: 0.005,
//                        repulsion_multiplier: 1,
//                        slowdown_multiplier: 0.8
//                    };
//        var config_groot = {
//            width: win.w,
//            height: win.h,
//            id: 'main0',
//            population: 300,
//            node_size: 2,
//            radius_near: 50,
//            radius_far: 180,
//            radius_void: 300,
//            attraction_multiplier: 0.001,
//            repulsion_multiplier: 1,
//            slowdown_multiplier: 0.8
//        };
//var config_light = {
//    population: 25,
//    node_size: 2,
//    radius_near: 75,
//    radius_far: 180,
//    radius_void: 700,
//    attraction_multiplier: 0.01,
//    repulsion_multiplier: 0.3,
//    slowdown_multiplier: 0.8
//};
//var config_bouncy_light = {
//width: win.w,
//height: win.h,
//id: 'main0',
//population: 40,
//node_size: 2,
//radius_near: 40,
//radius_far: 140,
//radius_void: 400,
//attraction_multiplier: 0.005,
//repulsion_multiplier: 1,
//slowdown_multiplier: 0.95
//};


//var config_ok = {
//width: win.w,
//height: win.h,
//id: 'main0',
//population: 400,
//node_size: 2,
//radius_near: 30,
//radius_far: 260,
//radius_void: 3000,
//attraction_multiplier: 0.001,
//repulsion_multiplier: 0.6,
//slowdown_multiplier: 0.95
//}
//var config_random = {attraction_multiplier: 0.009308509211987257
//population: 100
//radius_far: 279.2348712235689
//radius_near: 23
//radius_void: 4727.990357160568
//repulsion_multiplier: 0.19437134847976267
//slowdown_multiplier: 0.7889707193733193};



















var do_magic_stuff = true;
var win; // Windowwwwww
var mouse; // Canvas van mouse
var main;
var blobcanvases = [];
var wp;
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
window.onload = function() {
        if(getInternetExplorerVersion()>-1&&getInternetExplorerVersion()<9)
                do_magic_stuff = false;
        //alert(' IE:' +getInternetExplorerVersion());
        if(do_magic_stuff==true) {
                win = new Window($('body'));
                win.log('Initializing interface');
                window.setTimeout(function() { win.log('Interface initialized');}, 2000);

            wp = new Wordpress('http://blog.x-54.com');
            $(document).on('touchstart click', 'a',function(e) {
                    $('body > nav a').removeClass('last-anchor');
                    $(this).addClass('last-anchor');
                href = $(this).attr('href');
                iofq = href.indexOf(wp.api_url);
                iofh = href.indexOf('#');
                if(iofq>iofh) {
                    query = href.substring(iofq, href.length);
                    hashtag = href.substring(iofh, href.length-query.length);
                }else if(iofq<iofh) {

                    hashtag = href.substring(iofh+1, href.length);
                    query = href.substring(iofq, href.length-hashtag.length-1);
                } else {
                    hashtag = false;
                    query = false;
                }                                         

                if(hashtag) {
                    if(query) {
                        wp.api(query, 'wp.interpretPosts', hashtag);
                        e.preventDefault();
                    }
                    win.switch(hashtag);
                } else {
                    window.open(href,'_blank');
                    e.preventDefault();
                }
            });

            main = new Canvas(win, {
                width: win.w,
                height: win.h,
                id: 'main0'
            });
            main.reconfig(current_configuration);
            //main.clear = function() {}
            main.draw = function() {
                //$('#header').css({top: this.average.y+'px',left: this.average.x+'px'});
                for(j = 0; j<this.sprites.length; j++) {
                    this.sprites[j].drawconnections(this.x);
                }
                win.mousemoved = false;
                this.x.strokeStyle = 'rgb(51,51,51)';
                for(j = 0; j<this.sprites.length; j++) {
                   this.sprites[j].draw(this.x);
                }

            }
            // cursorcanvas
            mouse = new Canvas(win, {
                width: 150,
                height: 150,
                id: 'mouse',
            });
            mouse.clear = function() { this.x.clearRect(0, 0, this.w,this.h); }
            mouse.start = function() {
                for(i=0;i<this.sprites.length;i++) {
                    this.sprites[i].reset();
                }
                this.active = true;
                this.animate();
            }
            mouse.add(new Arc());

            // start the machine!
            main.start();
					
                perpetualWiper();

                if(Modernizr.touch) {
                    window.ontouchstart = holdMouse;
                    window.ontouchend = releaseMouse;
                    window.ontouchmove = updateMouse;

                } else {
                    window.onmousedown = holdMouse;
                    window.onmouseup = releaseMouse;
                    window.onmousemove = updateMouse;
                }
                //randomizeConfig();
        } else {
                $('body').append('<div id="message">Sorry, but the coolest part of this website is not supported by your (outdated) browser. You should consider using <a href="www.google.com/chrome/" target="_blank">Google Chrome</a>!</div>');
        }
}
window.onresize = function() {

        if(do_magic_stuff==true) {
                win.resize();
                main.resize();
        }
}
function giveStats() {
        var statistics = {};
        statistics.fps = main.fps;
        statistics.resolution = {x:win.w,y:win.h};
        statistics.config = main.population;





}
function perpetualWiper() {
   main.markforclearall = true;
    window.setTimeout(perpetualWiper, 100);
}
function updateMouse(e) {
    if(do_magic_stuff==true) {
        win.mousemove(e);
        $('#mouse').css({top: win.mouse.y+'px', left: win.mouse.x+'px'});
        e.preventDefault();
    }
}
function holdMouse(e) {
    updateMouse(e);
    mouse.start();
}
function releaseMouse(e) {
    if(do_magic_stuff==true) {
            var force = mouse.sprites[0].progress;
            if(force<0.1) force = 0.1;
            for(i=0;i<main.sprites.length;i++)
                    main.sprites[i].implodeTo(win.mouse.x, win.mouse.y, force*40, force*2000);
            mouse.stop();
            mouse.clear();
            win.mousemoved = false;
    }
}
function randomizeConfig() {
    var c = {};
    c.population = 20+Math.round(Math.random()*180); // as in, percentages
    c.radius_near = 10+Math.round(Math.random()*70);
    c.radius_far = c.radius_near*2+Math.sqrt(c.population)*50*Math.random();
    c.radius_void = c.radius_far+Math.random()*200*c.population;
    c.attraction_multiplier = 0.001+0.009*Math.random();
    c.repulsion_multiplier = 0.3+0.6*Math.random();
    c.slowdown_multiplier = 0.3+Math.random()*0.49;
    main.reconfig(c);
    window.setTimeout(randomizeConfig, 10000);
}