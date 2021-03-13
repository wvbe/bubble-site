var win; // Windowwwwww
var mouse; // Canvas van mouse
var main;

/**
 * Converts an X/Y, which represent the angle
 */
function rasterizeVector({ x, y }, radius) {
	if ((x == 0 && y == 0) || radius == 0) {
		return { x: 0, y: 0 };
	}
	// multiply by the ratio of desired radius to (pythagoras of) x/y vector
	const multiplier = radius / Math.sqrt(y * y + x * x);
	return { x: x * multiplier, y: y * multiplier };
}

// WINDOW
class Window {
	constructor(selector) {
		this.w = 0;
		this.h = 0;
		this.e = $(selector);
		this.mouse = { x: 0, y: 0 };
		this.mousemoved = false;

		this.resize();
	}
	resize() {
		if (document.body && document.body.offsetWidth) {
			this.w = document.body.offsetWidth;
			this.h = document.body.offsetHeight;
		}
		if (
			document.compatMode == 'CSS1Compat' &&
			document.documentElement &&
			document.documentElement.offsetWidth
		) {
			this.w = document.documentElement.offsetWidth;
			this.h = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
			this.w = window.innerWidth;
			this.h = window.innerHeight;
		}
		$('.stats-resolution').html(
			this.w + 'x' + this.h + '<br />' + Math.round(this.w * this.h * 0.00001) / 10 + 'MP'
		);
	}
	mousemove(e) {
		//if(e.changedTouches.length>0)
		//    this.mouse = {x:this.mx(e.changedTouches[0]),y:this.my(e.changedTouches[0])};
		//else
		win.mouse = { x: this.mx(e), y: this.my(e) };
		win.mousemoved = true;
		//$('#mousepos').html('X:'+this.mouse.x+',Y:'+this.mouse.y);
	}
	mx(evt) {
		if (evt.pageX) return evt.pageX;
		else if (evt.clientX)
			return (
				evt.clientX +
				(document.documentElement.scrollLeft
					? document.documentElement.scrollLeft
					: document.body.scrollLeft)
			);
		else return null;
	}
	my(evt) {
		if (evt.pageY) return evt.pageY;
		else if (evt.clientY)
			return (
				evt.clientY +
				(document.documentElement.scrollTop
					? document.documentElement.scrollTop
					: document.body.scrollTop)
			);
		else return null;
	}
}

// CANVAS
class Canvas {
	constructor(parent, options) {
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
		this.average = { x: this.w / 2, y: this.y / 2 };
		this.markforclearall = false;
		// specifiek voor dit script
		// construct
		this.index = false;
		parent.e.append(
			'<canvas id="' +
				this.id +
				'" width="' +
				this.w +
				'" height="' +
				this.h +
				'">Canvas</canvas>'
		);
		this.init();
	}

	init() {
		this.c = document.getElementById(this.id); // canvas
		this.x = this.c.getContext('2d'); // context
	}
	reconfig(config) {
		console.log('New canvas configuration:', config);
		this.options = config;

		if (config.population != undefined) this.population = config.population;
		this.sprites.forEach((blobNode) => {
			if (config.node_size != undefined) blobNode.node_size = config.node_size;
			if (config.radius_near != undefined) blobNode.radius_near = config.radius_near;
			if (config.radius_far != undefined) blobNode.radius_far = config.radius_far;
			if (config.radius_void != undefined) blobNode.radius_void = config.radius_void;
			if (config.attraction_multiplier != undefined)
				blobNode.attraction_multiplier = config.attraction_multiplier;
			if (config.repulsion_multiplier != undefined)
				blobNode.repulsion_multiplier = config.repulsion_multiplier;
			if (config.slowdown_multiplier != undefined)
				blobNode.slowdown_multiplier = config.slowdown_multiplier;
		});
	}
	resize() {
		jQuery('#' + this.id)
			.css('width', win.w + 'px')
			.css('height', win.h + 'px')
			.attr('width', win.w)
			.attr('height', win.h);
		this.w = win.w;
		this.h = win.h;
		this.init();
	}
	start() {
		this.resize();
		for (let i = 0; i < this.sprites.length; i++) {
			this.sprites[i].reset();
		}
		this.active = true;
		this.animate();
		this.trackfps();
		//console.log('Starting canvas:', this);
	}
	stop() {
		this.active = false;
	}

	add(sprite) {
		var length = this.sprites.length;
		//console.log('Adding sprite:', sprite, this);
		this.sprites[length] = sprite;
		this.sprites[length].init(length, this);

		//this.sprites[length].setup();
		return length;
	}
	remove() {
		this.sprites.splice(this.sprites.length - 1, 1);
	}
	resetFurthest() {
		var furthest = 0;
		var furthest_i = false;
		for (i = 0; i < this.sprites.length; i++) {
			var dist = Math.sqrt(
				Math.pow(Math.abs(this.w / 2 - this.sprites[i].x), 2) +
					Math.pow(Math.abs(this.h / 2 - this.sprites[i].y), 2)
			);
			if (dist > furthest) {
				furthest = dist;
				furthest_i = i;
			}
		}
		//console.log('resetting', i, furthest);
		this.sprites[furthest_i].reset(this);
	}

	iterate() {
		for (let i = 0; i < this.sprites.length; i++) {
			this.sprites[i].iterate(this.sprites);
		}
	}
	draw() {
		for (j = 0; j < this.sprites.length; j++) {
			this.sprites[j].drawconnections(this.x);
		}
		win.mousemoved = false;
		this.x.strokeStyle = 'rgb(51,51,51)';
		for (j = 0; j < this.sprites.length; j++) {
			this.sprites[j].draw(this.x);
		}
	}
	clear() {
		if (this.markforclearall == true) {
			this.clearAll();
			this.markforclearall = false;
			return;
		}
		const margin = 10;
		this.x.clearRect(
			this.boundary.minx - margin,
			this.boundary.miny - margin,
			this.boundary.maxx + margin,
			this.boundary.maxy + margin
		);

		this.boundary = {
			minx: this.w,
			maxx: 0,
			miny: this.h,
			maxy: 0
		};
		const avg = { x: 0, y: 0 };
		for (let j = 0; j < this.sprites.length; j++) {
			avg.x += this.sprites[j].x;
			avg.y += this.sprites[j].y;
			if (this.sprites[j].x < this.boundary.minx) this.boundary.minx = this.sprites[j].x;
			else if (this.sprites[j].x > this.boundary.maxx) this.boundary.maxx = this.sprites[j].x;
			if (this.sprites[j].y < this.boundary.miny) this.boundary.miny = this.sprites[j].y;
			else if (this.sprites[j].y > this.boundary.maxy) this.boundary.maxy = this.sprites[j].y;
		}
		this.average = { x: avg.x / this.sprites.length, y: avg.y / this.sprites.length };
		if (this.boundary.minx < 0) this.boundary.minx = 0;
		if (this.boundary.miny < 0) this.boundary.miny = 0;
	}
	clearAll() {
		this.x.clearRect(0, 0, this.w, this.h);
	}
	trackfps() {
		if (!this.active) return;
		this.fps = this.frame_count - this.frame_tarra;
		this.frame_tarra = this.frame_count;

		// dit kan beter met een callback via options, zelfde geldt voor wel meer dingen in dit script
		//$('.stats-population').html(this.sprites.length);
		//$('.stats-fps').html(this.fps);
		window.setTimeout(() => this.trackfps(), 1000);
	}
	animate() {
		if (!this.active) return;
		if (this.sprites.length < this.population) {
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
			this.add(new Blobnode(this, this.options));
		} else if (this.sprites.length > this.population) {
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
			this.remove();
		}

		this.iterate();
		this.clear();
		this.draw();
		window.requestAnimationFrame(() => this.animate());
		this.frame_count++;
	}
}

// BLOBNODE

class Blobnode {
	constructor(canvas, options) {
		this._canvas = canvas;
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
		this.color = { r: 0, g: 0, b: 0 };
	}
	init(i, canvas) {
		//this.x = canvas_initial_margin+(canvas.width-2*canvas_initial_margin)*Math.random();
		//this.y = canvas_initial_margin+(canvas.height-2*canvas_initial_margin)*Math.random();
		this.index = i;
		this.resetFromCenter(canvas);
		this.resetDirection();
		this.resetColor();
		//console.log(this);
	}
	reset(canvas) {
		if (canvas != undefined) this.resetFromCenter(canvas.c);
		this.resetDirection();
		this.resetColor();
	}
	resetColor() {
		this.color = {
			r: Math.round(255 * Math.random()),
			g: Math.round(255 * Math.random()),
			b: Math.round(255 * Math.random())
		};
	}
	resetDirection() {
		this.dx = 0; //nodes_minimum_speed+(nodes_maximum_speed-nodes_minimum_speed)*Math.random()*(Math.random()-0.5)*2;
		this.dy = 0; //nodes_minimum_speed+(nodes_maximum_speed-nodes_minimum_speed)*Math.random()*(Math.random()-0.5)*2;
	}
	resetFromCenter(canvas) {
		this.x = canvas.w / 2 + (Math.random() - 0.5) * 10;
		this.y = canvas.h / 2 + (Math.random() - 0.5) * 10;
	}

	iterate(xnode) {
		const canvas = this._canvas;
		this.connections = [];
		for (var i = this.index + 1; i < xnode.length; i++) {
			const node = xnode[i];
			var ax = this.x;
			var ay = this.y;
			var bx = node.x;
			var by = node.y;

			// manhattan
			// var distance = Math.abs(ax - bx) + Math.abs(ay - by);

			// pythagoras, but ugly
			var distance = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));

			if (distance < this.radius_near && this.repulsion_multiplier > 0) {
				// between 0 and 1
				const urgencyLinearToDistance = (this.radius_near - distance) / this.radius_near;

				// afstoten
				var force = this.repulsion_multiplier * Math.pow(urgencyLinearToDistance, 2);
				this.dx += force * (ax - bx);
				this.dy += force * (ay - by);
				node.dx -= force * (ax - bx);
				node.dy -= force * (ay - by);

				this.connections.push({
					r: 51,
					g: 51,
					b: 51,
					node: node,
					dist: distance / this.radius_near
				});
			} else if (distance < this.radius_far) {
				// A comfortable zone of not much pushing and pulling
				// noop()
			} else if (distance < this.radius_void && this.attraction_multiplier > 0) {
				// aantrekken
				var force = Math.pow(
					(this.attraction_multiplier * distance) / this.radius_void,
					1.6
				);
				this.dx -= force * (ax - bx);
				this.dy -= force * (ay - by);
				node.dx += force * (ax - bx);
				node.dy += force * (ay - by);
			} else {
				// beyond radius_void
				// noop()
			}
		}

		if (win.mousemoved == true) {
			onMouseMove(this, win.mouse);
		}
		// positie updaten adhv dx/dy, en bounce als positie buiten speelveld is
		if (this.dx == 0 && this.dy == 0) return;

		this.dx *= this.slowdown_multiplier;
		this.dy *= this.slowdown_multiplier;
		this.x += this.dx;
		this.y += this.dy;

		if (this.x < 0 || this.x > canvas.w) {
			this.dx *= -1;
			if (this.x < 0) this.x = 0;
			else if (this.x > canvas.w) this.x = canvas.w;
		}
		if (this.y < 0 || this.y > canvas.h) {
			this.dy *= -1;
			if (this.y < 0) this.y = 0;
			else if (this.y > canvas.h) this.y = canvas.h;
		}
	}
	explodeFrom(x, y, force, radius) {
		var ddx = x - this.x;
		var ddy = y - this.y;
		var dist = Math.sqrt(ddx * ddx + ddy * ddy);
		if (dist <= radius) {
			var nd = rasterizeVector({ x: -ddx, y: -ddy }, force * (1 - dist / radius));
			this.dx += nd.x;
			this.dy += nd.y;
		}
	}
	implodeTo(x, y, force, radius) {
		var ddx = x - this.x;
		var ddy = y - this.y;
		var dist = Math.sqrt(ddx * ddx + ddy * ddy);
		if (dist <= radius) {
			var nd = rasterizeVector({ x: -ddx, y: -ddy }, force * (1 - dist / radius));
			this.dx -= nd.x;
			this.dy -= nd.y;
		}
	}
	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.node_size, 0, Math.PI * 2, true);
		context.closePath();
		context.stroke();
		//canvas.x = this.connectToNode(canvas.x, 'rgb('+conn_color.r+','+conn_color.g+','+conn_color.b+')', node);
		//console.log('Node '+this.index+' ('+this.x+','+this.y+')');
		//return context;
	}

	drawconnections(context) {
		for (let i = 0; i < this.connections.length; i++) {
			this.connectToNode(context, this.connections[i]);
		}
		//return context;
	}
	connectToNode(context, conn) {
		context.strokeStyle =
			'rgba(' +
			conn.r +
			',' +
			conn.g +
			',' +
			conn.b +
			', ' +
			(0.1 + Math.round(Math.pow(1 - conn.dist, 2) * 9) / 10) +
			')';
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(conn.node.x, conn.node.y);
		context.closePath();
		context.stroke();
		return context;
	}
}

// ARC
class Arc {
	constructor(canvas, options) {
		this.width = 5;
		this.color = { r: 0, g: 0, b: 0 };
		this.startangle = -0.5 * Math.PI;
		this.progress = 0;
		this.init = function (i, canvas) {
			//this.x = canvas_initial_margin+(canvas.width-2*canvas_initial_margin)*Math.random();
			//this.y = canvas_initial_margin+(canvas.height-2*canvas_initial_margin)*Math.random();
			this.index = i;
			this.x = canvas.w / 2;
			this.y = canvas.h / 2;
			this.radius = 0.25 * (canvas.w + canvas.h) - 0.5 * this.width;
		};
		this.reset = function () {
			this.progress = 0;
		};
		this.iterate = function () {
			this.progress += Math.pow(1 - this.progress, 2) / 20;
		};

		this.draw = function (context) {
			if (context.strokeStyle != 'rgb(51,51,51)') context.strokeStyle = 'rgb(51,51,51)';
			context.lineWidth = this.width;
			context.beginPath();
			context.arc(
				this.x,
				this.y,
				this.radius,
				this.startangle,
				this.startangle + this.progress * 2 * Math.PI
			);
			context.stroke();
			context.closePath();
			return context;
		};
		this.drawconnections = function (context) {
			return context;
		};
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

window.onload = function () {
	win = new Window($('body'));

	main = new Canvas(win, {
		width: win.w,
		height: win.h,
		id: 'main0'
	});

	main.reconfig(current_configuration);

	main.draw = function () {
		//$('#header').css({top: this.average.y+'px',left: this.average.x+'px'});
		for (j = 0; j < this.sprites.length; j++) {
			this.sprites[j].drawconnections(this.x);
		}
		win.mousemoved = false;
		this.x.strokeStyle = 'rgb(51,51,51)';
		for (j = 0; j < this.sprites.length; j++) {
			this.sprites[j].draw(this.x);
		}
	};

	// cursorcanvas
	mouse = new Canvas(win, {
		width: 150,
		height: 150,
		id: 'mouse'
	});
	mouse.clear = function () {
		this.x.clearRect(0, 0, this.w, this.h);
	};
	mouse.start = function () {
		for (i = 0; i < this.sprites.length; i++) {
			this.sprites[i].reset();
		}
		this.active = true;
		this.animate();
	};
	mouse.add(new Arc());

	// start the machine!
	main.start();

	perpetualWiper();

	window.onmousedown = holdMouse;
	window.onmouseup = releaseMouse;
	window.onmousemove = updateMouse;
};
window.onresize = function () {
	win.resize();
	main.resize();
};
function giveStats() {
	var statistics = {};
	statistics.fps = main.fps;
	statistics.resolution = { x: win.w, y: win.h };
	statistics.config = main.population;
}
function perpetualWiper() {
	main.markforclearall = true;
	window.setTimeout(perpetualWiper, 100);
}
function updateMouse(e) {
	win.mousemove(e);
	$('#mouse').css({ top: win.mouse.y + 'px', left: win.mouse.x + 'px' });
	e.preventDefault();
}
function holdMouse(e) {
	updateMouse(e);
	mouse.start();
}

function releaseMouse(e) {
	onMouseRelease(
		// the "main canvas"
		main,
		// the "arc" instance, which unfortunately doubles as the record of mouse hold duration
		mouse.sprites[0]
	);
	mouse.stop();
	mouse.clear();
	win.mousemoved = false;
}
