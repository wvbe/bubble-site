export class Arc {
	constructor(canvas, options) {
		this.canvas = canvas;
		this.width = 2;
		this.color = { r: 0, g: 0, b: 0 };
		this.startangle = -0.5 * Math.PI;
		this.progress = 0;
	}

	init(i, canvas) {
		//this.x = canvas_initial_margin+(canvas.width-2*canvas_initial_margin)*Math.random();
		//this.y = canvas_initial_margin+(canvas.height-2*canvas_initial_margin)*Math.random();
		this.index = i;
		this.x = canvas.w / 2;
		this.y = canvas.h / 2;
		this.radius = 0.25 * (this.canvas.w + this.canvas.h) - 0.5 * this.width;
	}

	reset() {
		this.progress = 0;
	}

	iterate() {
		this.progress += Math.pow(1 - this.progress, 2) / 20;
	}

	draw(context) {
		if (context.strokeStyle != 'rgb(51,51,51)') {
			context.strokeStyle = 'rgb(51,51,51)';
		}

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
	}
	drawconnections(context) {
		return context;
	}
}
