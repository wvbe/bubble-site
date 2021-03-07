import { Window } from './Window.js';

export function whatTheFuckEvenIsThis() {
	var do_magic_stuff = true;
	var win; // Windowwwwww
	var mouse; // Canvas van mouse
	var main;

	window.onresize = function () {
		if (do_magic_stuff == true) {
			win.resize();
			main.resize();
		}
	};

	function perpetualWiper() {
		main.markforclearall = true;
		window.setTimeout(perpetualWiper, 100);
	}
	function updateMouse(e) {
		if (do_magic_stuff == true) {
			win.mousemove(e);
			e.preventDefault();
		}
	}
	function holdMouse(e) {
		updateMouse(e);
		mouse.start();
	}
	function releaseMouse(e) {
		if (do_magic_stuff == true) {
			var force = mouse.sprites[0].progress;
			if (force < 0.1) force = 0.1;
			for (i = 0; i < main.sprites.length; i++)
				main.sprites[i].implodeTo(win.mouse.x, win.mouse.y, force * 40, force * 2000);
			mouse.stop();
			mouse.clear();
			win.mousemoved = false;
		}
	}
	function randomizeConfig() {
		var c = {};
		c.population = 20 + Math.round(Math.random() * 180); // as in, percentages
		c.radius_near = 10 + Math.round(Math.random() * 70);
		c.radius_far = c.radius_near * 2 + Math.sqrt(c.population) * 50 * Math.random();
		c.radius_void = c.radius_far + Math.random() * 200 * c.population;
		c.attraction_multiplier = 0.001 + 0.009 * Math.random();
		c.repulsion_multiplier = 0.3 + 0.6 * Math.random();
		c.slowdown_multiplier = 0.3 + Math.random() * 0.49;
		main.reconfig(c);
		window.setTimeout(randomizeConfig, 10000);
	}

	// window.onload = function () {
	win = new Window($('body'));
	win.log('Initializing interface');
	window.setTimeout(function () {
		win.log('Interface initialized');
	}, 2000);

	wp = new Wordpress('http://blog.x-54.com');

	main = new Canvas(win, {
		width: win.w,
		height: win.h,
		id: 'main0'
	});
	main.reconfig(current_configuration);
	//main.clear = function() {}
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
	// };
}
