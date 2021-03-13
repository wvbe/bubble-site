
            
            
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