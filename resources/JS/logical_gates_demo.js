function setup(){
  //create the canvas for the demo
	cnv = createCanvas(550,500);
    //put the canvas within a <div> in order to manage in the html code
    cnv.parent('logic');
    //background colour white
    background(255);

    inputControls();
    outputControls();

}

function draw(){
    background(255);
      //comtro;s
    line(500,0,500,500);
    //graph
    line(50,50,50,350);
    line(40,340,360,340);

    line(300,335,300,345);
    line(45,110,55,110);
    //truth table
    line(350,40,470,40);
    line(390,20,390,120);
    line(430,20,430,120);
    if(logicGate.value() == 'AND'){
        displayAND();
    }else if(logicGate.value() == 'OR'){
         displayOR();
    }else if (logicGate.value() == 'XOR'){
        displayXOR();
    }
}

function inputControls(){
     //create heading for users benefit
    lblControls = createElement('h3', 'Controls: ');
    //position on top of demo
    lblControls.position(515,0);

    lblLogicGates = createElement('h5', 'Logic Gates: ');
    //position on top of demo
    lblLogicGates.position(520,20);

    logicGate = createRadio();
    logicGate.option('AND');
    logicGate.option('OR');
    logicGate.option('XOR');
    logicGate.style('width', '60px');
    logicGate.position(520,60);


}
function outputControls(){
     //create heading for users benefit
    lblx= createElement('label', 'X');
    //position on top of demo
    lblx.position(375,30);
    lbly = createElement('label', 'Y');
    //position on top of demo
    lbly.position(415,30);
    lblgate = createElement('label', '');
    //position on top of demo
    lblgate.position(445,30);

    text('X', 340, 355);
    text('Y', 35, 70);
    text('1', 296, 360);
    text('1', 35, 115);
    text('0', 40, 355);

    lblx1 = createElement('label', '0');
    lblx1.position(375, 50);
    lblx2 = createElement('label', '0');
    lblx2.position(375, 70);
    lblx3 = createElement('label', '1');
    lblx3.position(375, 90);
    lblx4 = createElement('label', '1');
    lblx4.position(375, 110);

    lbly1 = createElement('label', '0');
    lbly1.position(415, 50);
    lbly2 = createElement('label', '1');
    lbly2.position(415, 70);
    lbly3 = createElement('label', '0');
    lbly3.position(415, 90);
    lbly4 = createElement('label', '1');
    lbly4.position(415, 110);

    lbloutput1 = createElement('label', '');
    lbloutput1.position(455, 50);
    lbloutput2 = createElement('label', '');
    lbloutput2.position(455, 70);
    lbloutput3 = createElement('label', '');
    lbloutput3.position(455, 90);
    lbloutput4 = createElement('label', '');
    lbloutput4.position(455, 110);
}

function displayAND(){
    lblgate.html(logicGate.value());
    lbloutput1.html('0');
    lbloutput2.html('0');
    lbloutput3.html('0');
    lbloutput4.html('1');
    fill(255);
    ellipse(60,330,10,10);
    ellipse(60,110,10,10);
    ellipse(300,330,10,10);
    fill(0);
    ellipse(300,110,10,10);
    line(50,75,340,340);
}
function displayOR(){
     lblgate.html(logicGate.value());
     lbloutput1.html('0');
     lbloutput2.html('1');
     lbloutput3.html('1');
     lbloutput4.html('1');
    fill(255);
    ellipse(60,330,10,10);
    fill(0);
    ellipse(60,110,10,10);
    ellipse(300,330,10,10);
    ellipse(300,110,10,10);
    line(50,200,200,340);
}
function displayXOR(){
     lblgate.html(logicGate.value());
     lbloutput1.html('0');
    lbloutput2.html('1');
    lbloutput3.html('1');
    lbloutput4.html('0');
     fill(255);
    ellipse(60,330,10,10);
    fill(0);
    ellipse(60,110,10,10);
    ellipse(300,330,10,10);
    fill(255);
    ellipse(300,110,10,10);
    line(50,75,340,340);
    line(50,200,200,340);
}
