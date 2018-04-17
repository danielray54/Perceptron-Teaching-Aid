var sketch = function(d){
    d.setup = function(){
        //create the canvas for the demo
        d.cnv = d.createCanvas(550,500);
        //put the canvas within a <div> in order to manage in the html code
        d.cnv.parent('logic');
        //background colour white
        d.background(255);

        d.inputControls();
        d.outputControls();
    }
    d.draw = function(){
        d.background(255);
          //comtro;s
        d.line(500,0,500,500);
        //graph
        d.line(50,50,50,350);
        d.line(40,340,360,340);

        d.line(300,335,300,345);
        d.line(45,110,55,110);
        //truth table
        d.line(350,40,470,40);
        d.line(390,20,390,120);
        d.line(430,20,430,120);
        if(d.logicGate.value() == 'AND'){
            d.displayAND();
        }else if(d.logicGate.value() == 'OR'){
            d.displayOR();
        }else if (d.logicGate.value() == 'XOR'){
            d.displayXOR();
        }
    }

    d.inputControls = function(){
        //create heading for users benefit
        d.lblControls = d.createElement('h3', 'Controls: ');
        //position on top of demo
        d.lblControls.position(515,0);

        d.lblLogicGates = d.createElement('h5', 'Logic Gates: ');
        //position on top of demo
        d.lblLogicGates.position(520,20);

        d.logicGate = d.createRadio();
        d.logicGate.option('AND');
        d.logicGate.option('OR');
        d.logicGate.option('XOR');
        d.logicGate.style('width', '60px');
        d.logicGate.position(520,60);
    }

    d.outputControls = function(){
        //create heading for users benefit
        d.lblx = d.createElement('label', 'X');
        //position on top of demo
        d.lblx.position(375,30);
        d.lbly = d.createElement('label', 'Y');
        //position on top of demo
        d.lbly.position(415,30);
        d.lblgate = d.createElement('label', '');
        //position on top of demo
        d.lblgate.position(445,30);

        d.text('X', 340, 355);
        d.text('Y', 35, 70);
        d.text('1', 296, 360);
        d.text('1', 35, 115);
        d.text('0', 40, 355);

        d.lblx1 = d.createElement('label', '0');
        d.lblx1.position(375, 50);
        d.lblx2 = d.createElement('label', '0');
        d.lblx2.position(375, 70);
        d.lblx3 = d.createElement('label', '1');
        d.lblx3.position(375, 90);
        d.lblx4 = d.createElement('label', '1');
        d.lblx4.position(375, 110);

        d.lbly1 = d.createElement('label', '0');
        d.lbly1.position(415, 50);
        d.lbly2 = d.createElement('label', '1');
        d.lbly2.position(415, 70);
        d.lbly3 = d.createElement('label', '0');
        d.lbly3.position(415, 90);
        d.lbly4 = d.createElement('label', '1');
        d.lbly4.position(415, 110);

        d.lbloutput1 = d.createElement('label', '');
        d.lbloutput1.position(455, 50);
        d.lbloutput2 = d.createElement('label', '');
        d.lbloutput2.position(455, 70);
        d.lbloutput3 = d.createElement('label', '');
        d.lbloutput3.position(455, 90);
        d.lbloutput4 = d.createElement('label', '');
        d.lbloutput4.position(455, 110);
    }

    d.displayAND = function(){
        d.lblgate.html(d.logicGate.value());
        d.lbloutput1.html('0');
        d.lbloutput2.html('0');
        d.lbloutput3.html('0');
        d.lbloutput4.html('1');
        d.fill(255);
        d.ellipse(60,330,10,10);
        d.ellipse(60,110,10,10);
        d.ellipse(300,330,10,10);
        d.fill(0);
        d.ellipse(300,110,10,10);
        d.line(50,75,340,340);
    }

    d.displayOR = function(){
        d.lblgate.html(d.logicGate.value());
        d.lbloutput1.html('0');
        d.lbloutput2.html('1');
        d.lbloutput3.html('1');
        d.lbloutput4.html('1');
        d.fill(255);
        d.ellipse(60,330,10,10);
        d.fill(0);
        d.ellipse(60,110,10,10);
        d.ellipse(300,330,10,10);
        d.ellipse(300,110,10,10);
        d.line(50,200,200,340);
    }

    d.displayXOR = function(){
        d.lblgate.html(d.logicGate.value());
        d.lbloutput1.html('0');
        d.lbloutput2.html('1');
        d.lbloutput3.html('1');
        d.lbloutput4.html('0');
        d.fill(255);
        d.ellipse(60,330,10,10);
        d.fill(0);
        d.ellipse(60,110,10,10);
        d.ellipse(300,330,10,10);
        d.fill(255);
        d.ellipse(300,110,10,10);
        d.line(50,75,340,340);
        d.line(50,200,200,340);
    }
}
let truthTablesDemo = new p5(sketch);
