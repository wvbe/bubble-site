function Window(selector) {
	this.w = 0;
	this.h = 0;
	this.e = $(selector);
	this.mouse = { x: 0, y: 0 };
	this.mousemoved = false;
	this.resize = function () {
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
		// $('.stats-resolution').html(this.w+'x'+this.h+'<br />'+Math.round(this.w*this.h*0.00001)/10+'MP');
	};
	this.mousemove = function (e) {
		//if(e.changedTouches.length>0)
		//    this.mouse = {x:this.mx(e.changedTouches[0]),y:this.my(e.changedTouches[0])};
		//else
		win.mouse = { x: this.mx(e), y: this.my(e) };
		win.mousemoved = true;
		//$('#mousepos').html('X:'+this.mouse.x+',Y:'+this.mouse.y);
	};
	this.mx = function (evt) {
		if (evt.pageX) return evt.pageX;
		else if (evt.clientX)
			return (
				evt.clientX +
				(document.documentElement.scrollLeft
					? document.documentElement.scrollLeft
					: document.body.scrollLeft)
			);
		else return null;
	};
	this.my = function (evt) {
		if (evt.pageY) return evt.pageY;
		else if (evt.clientY)
			return (
				evt.clientY +
				(document.documentElement.scrollTop
					? document.documentElement.scrollTop
					: document.body.scrollTop)
			);
		else return null;
	};

	this.switch = function (id) {
		if ($('.page.active').attr('id') != id) {
			$('.page').removeClass('active');
			$('#' + id + '.page').addClass('active');
		}
	};
	this.log = function (msg) {
		$('#log').append('<li>' + msg + '</li>');
	};

	this.resize();
}
