/**
RANDOM POINTS LINEAR SEPERABLE DEMO
    Daniel Ray - 201024489
    Web-Based Teaching Aid to Demonstrate the Perceptron Algorithm
    University of Liverpool - 2018
*/
let per;
let points = [];
let output = [];
let tIndex = 0;


function setup() {
    createCanvas(500,500);
    background(51);
    for (i=0; i < 200; i++) {
		p = new Point();
        points[i] = p.point;
        output[i] = p.output;
        p.show();
	}
    per = new Perceptron(points, output, 0.1)
}
function draw() {
line(0,0,width,height)

}

function Point(){
    this.x = random(width);
    this.y = random(height);
    this.point = [this.x, this.y];
    this.output = null;

    	if (this.x>this.y) {
		this.output = 1;
	}else {
		this.output = -1;
	}

	this.show = function() {
		if (this.output == 1) {
			fill(255);
		}else {
			fill(0);
		}

		ellipse(this.x,this.y,8,8);
	}
}
