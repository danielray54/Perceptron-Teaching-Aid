
var sketch = function(a){

    a.step = -1;

    a.setup = function(){
        //
        a.cnv = a.createCanvas(700,500);
        a.cnv.parent('arch');
        //
        a.inputControls();
        a.outputDisplay();
        //
        a.biasWeight = (Math.random() * 2 -1).toFixed(1);
        a.x1Weight = (Math.random() * 2 -1).toFixed(1);
        a.x2Weight = (Math.random() * 2 -1).toFixed(1);
        //
        a.bias = 1;
        //
        a.epoch = 0;
    }
    a.draw = function(){
        //
        a.background(255);
        //
        a.line(500,0,500,500);
        a.line(0,315,500,315);
        //
        if(a.step == -1){
            a.stepInit();
        //
        }else if(a.step == 0){
            a.stepZero();
        //
        }else if(a.step == 1){
            a.stepOne();
        //
        }else if(a.step == 2){
            a.stepTwo();
        //
        }else if(a.step == 3){
            a.stepThree();
        //
        }else if(a.step == 4){
            a.stepFour();
        //
        }else if(a.step == 5){
            a.stepFive();
        //
        }else if(a.step == 6){
            a.stepSix();
        //
        }else if(a.step == 7){
            a.stepSeven();
        //
        }else if(a.step ==8){
            a.stepEight();
        }
    }
    a.outputDisplay = function(){
           //
        a.lblDescription = a.createElement('label', '');
        a.lblDescription.position(10,10);
        //
        a.lblInp = a.createElement('label', '');
        a.lblInp.position(10,30);
        //
        a.lblDesOut = a.createElement('label', '');
        a.lblDesOut.position(10,50);
        //
        a.wocB = a.createElement('label', '');
        a.wocB.position(245, 165);
        //
        a.wocX1 = a.createElement('label', '');
        a.wocX1.position(150, 175);
        //
        a.wocX2 = a.createElement('label', '');
        a.wocX2.position(150, 255);
        //
        a.output = a.createElement('label', '');
        a.output.position(462, 225);
    }

    a.inputControls = function(){
        //create heading for users benefit
        a.lblControls = a.createElement('h3', 'Controls: ');
        //position on top of demo
        a.lblControls.position(515,0);
        //display label and slider for the the learning rate of the perceptron
        a.lblsldrLr = a.createElement('label', 'Learning Rate: ');
        a.lblsldrLr.position(515,50);
        a.sldrLr = a.createSlider(0,10, 1);
        a.sldrLr.position(a.lblsldrLr.x + a.lblsldrLr.width +5 ,50);
        a.sldrLr.size(50, a.AUTO);
        a.sldrLr.input(a.getLearningRate);
        //display the value of the slider
        a.lblLr = a.createElement('label', '0');
        a.lblLr.position(a.sldrLr.x + a.sldrLr.width +8 ,50);
        a.lblsldrLr.hide();
        a.sldrLr.hide();
        a.lblLr.hide();
        //
        a.lblX1Val = a.createElement('label', 'X1: ');
        a.lblX1Val.position(515,50);
        a.lblX1Val.hide();
        a.inpX1 = a.createInput('');
        a.inpX1.position(a.lblX1Val.x + a.lblX1Val.width +5 , 50);
        a.inpX1.size(50, 15);
        a.inpX1.hide();
        //
        a.lblX2Val = a.createElement('label', 'X2: ');
        a.lblX2Val.position(515,80);
        a.lblX2Val.hide();
        a.inpX2 = a.createInput('');
        a.inpX2.position(a.lblX2Val.x + a.lblX2Val.width +5 , 80);
        a.inpX2.size(50, 15);
        a.inpX2.hide();
        //
        a.lblTargetVal = a.createElement('label', 'Target Output: ');
        a.lblTargetVal.position(515,110);
        a.lblTargetVal.hide();
        a.inpTargetVal = a.createSelect('');
        a.inpTargetVal.position(a.lblTargetVal.x + a.lblTargetVal.width +5, 110);
        a.inpTargetVal.option('0');
        a.inpTargetVal.option('1');
        a.inpTargetVal.size(50, 20);
        a.inpTargetVal.hide();
        //
        a.btnNext = a.createButton('Next Step');
        a.btnNext.position(575,50);
        //function show points called when the button is pressed by user
        a.btnNext.mousePressed(a.nextStep);
    }

    a.getLearningRate = function(){
        a.learnRate = this.value()/10;
        //display the learning rate to the user as the slider doesnt show it
        a.lblLr.html(a.learnRate);
    }

    a.nextStep = function(){
        if(a.step == 7){
        //
        if(a.btnNext.html() == 'Finish'){
            //
            a.step = 8;
            a.btnNext.hide();
        }else{
        //
            a.step = 3;
        }
        //
        }else if(a.step == -1){
            if(isNaN(a.inpX1.value()) || a.inpX1.value() == ''){
            a.lblX1Val.style("color", "#B20000");
            a.inpX1.value('');
            a.validX1 = false;
            }else{
            a.lblX1Val.style("color", "#000000");
            a.x1Val = a.inpX1.value();
            a.validX1 = true;
            }
            if(isNaN(a.inpX2.value()) || a.inpX2.value() == ''){
            a.lblX2Val.style("color", "#B20000");
            a.inpX2.value('');
            a.validX2 = false;
            }else{
            a.lblX2Val.style("color", "#000000");
            a.x2Val = a.inpX2.value();
            a.validX2 = true;
            }
            if(a.validX1 == true && a.validX2==true){
            a.targetVal = a.inpTargetVal.value();
            a.step = 0;
            }
        }else if(a.step == 2 && isNaN(a.learnRate)){
            //
            a.lblsldrLr.style("color", "#B20000");
        }else{
            //
            a.step++;
        }
    }

    a.displayArchit = function(){
        if(a.step >= 0){
            //
            a.lblDescription.html('Training Set:');
            a.lblInp.html('Inputs: X1: ' + a.x1Val + ', X2: ' + a.x2Val);
            a.lblDesOut.html('Target Output: ' + a.targetVal);
            //weight of connection lines
            a.woc1 = a.line(100,175,300,225);
            a.woc2 = a.line(100,275,300,225);
            //output arrow
            a.outputArr = a.line(300,225,450,225) + a.line(445,220,450,225) + a.line(445,230,450,225);
            //input circles
            a.ellipse(100,175,50,50);
            a.text('X1', 93, 180);
            a.ellipse(100,275,50,50);
            a.text('X2', 93, 280);
            a.ellipse(300,225,50,50);
        }
        //
        if(a.step >= 1){
            //
            a.line(200,150,282,207);
            a.ellipse(200,150,50,50);
            a.text(a.bias, 195, 155);
        }
        //
        if (a.step == 1 || a.step == 2){
            //
            a.wocB.html(a.biasWeight);
            a.wocX1.html(a.x1Weight);
            a.wocX2.html(a.x2Weight);
            //
            a.X1 = a.ellipse(50,175,30,30);
            a.lblX1 = a.text(a.x1Val, 43, 180);
            a.X2 = a.ellipse(50,275,30,30);
            a.lblX2 = a.text(a.x2Val, 43, 280);
        //
        }else if(a.step == 3){
            //
            if(a.epoch>0){
            //
                a.biasWeight = a.newBiasWeight;
                a.x1Weight = a.newX1Weight;
                a.x2Weight = a.newX2Weight;
            }
            //
            a.weightedX1 = a.x1Val * a.x1Weight;
            a.weightedX2 = a.x2Val * a.x2Weight;
            a.weghtedBias = a.bias * a.biasWeight;
            //
            a.X1 = a.ellipse(200,200,40,40);
            a.lblX1 = a.text(a.weightedX1.toFixed(2), 185, 205);
            //
            a.X2 = a.ellipse(200,250,40,40);
            a.lblX2 = a.text(a.weightedX2.toFixed(2), 185, 255);
            //
            a.weighBias = a.ellipse(252,189,40,40);
            a.lblweighBias = a.text(a.weghtedBias.toFixed(2), 235, 192);
            //
            a.output.html('');
        //
        }else if(a.step == 4){
            //
            a.total = a.weightedX1 + a.weightedX2 + a.weghtedBias;
            a.text(a.total.toFixed(2),285,230);
        }else if(a.step == 5){
            //
            a.text(a.total.toFixed(2),285,230);
            if(a.total >= 0){
            //
                a.activation = '1';
            }else{
            //
                a.activation = '0';
            }
            //
            a.output.html(a.activation);
        //
        }else if(a.step == 6){
            //
            a.newBiasWeight = parseFloat(a.biasWeight) + (parseFloat(a.learnRate) *(parseInt(a.targetVal) - parseInt(a.activation)) * parseInt(a.bias));
            //
            a.newX1Weight = parseFloat(a.x1Weight) + (parseFloat(a.learnRate) *(parseInt(a.targetVal) - parseInt(a.activation)) * parseFloat(a.x1Val));
            //
            a.newX2Weight = parseFloat(a.x2Weight) + (parseFloat(a.learnRate) *(parseInt(a.targetVal) - parseInt(a.activation)) * parseFloat(a.x2Val));
            //
            a.wocB.html(a.newBiasWeight.toFixed(2));
            a.wocX1.html(a.newX1Weight.toFixed(2));
            a.wocX2.html(a.newX2Weight.toFixed(2));
        //
        }else if(a.step == 7){
        //
            a.oldTotal = parseFloat(a.biasWeight) + parseFloat(a.x1Weight) + parseFloat(a.x2Weight);
            //
            a.newTotal = a.newBiasWeight + a.newX1Weight + a.newX2Weight;
            //
            if(a.oldTotal == a.newTotal){
            //
            a.btnNext.html('Finish');
            }else{
            //
            a.epoch++;
            }
        }
    }

    a.stepInit = function(){
        //show training set and arch structure
        a.displayArchit();
        //
        a.lblX1Val.show();
        a.inpX1.show();
        a.lblX2Val.show();
        a.inpX2.show();
        a.lblTargetVal.show();
        a.inpTargetVal.show();
        //
        a.btnNext.position(575,145);
    }

    a.stepZero = function(){
        //show training set and arch structure
        a.displayArchit();
        //
        a.lblX1Val.hide();
        a.inpX1.hide();
        a.lblX2Val.hide();
        a.inpX2.hide();
        a.lblTargetVal.hide();
        a.inpTargetVal.hide();
        //
        a.btnNext.position(575,50);
        //
        a.lblStep = a.createElement('label', '');
        a.lblStep.position(15,325);
        //
        a.lblStepDesc = a.createElement('label', '');
        a.lblStepDesc.position(25,345);
        //
        a.lblStepDetail = a.createElement('label', '');
        a.lblStepDetail.position(25,365);
    }

    a.stepOne = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 1: ');
        a.lblStepDesc.html('Initialise Weights of Connections and Bias');
        a.lblStepDetail.html('- The Weights can be initialised using a random number between -1 and 1<br />- The Bias input is always 1');
    }

    a.stepTwo = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 2: ');
        a.lblStepDesc.html('Set Learning Rate');
        a.lblStepDesc.html('The Learning Rate of the Perceptron is set');
        a.lblStepDetail.html('- A positive Coefficient between 0 and 1 ');
        //
        a.lblsldrLr.show();
        a.sldrLr.show();
        a.lblLr.show();
        //
        a.btnNext.position(575,80);
    }

    a.stepThree = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 3: ');
        a.lblStepDesc.html('Inputs are Weighted');
        a.lblStepDetail.html('X1 = '+ a.x1Val +' * ' + parseFloat(a.x1Weight).toFixed(2) + '<br /> X2 = '+ a.x2Val +' * '+ parseFloat(a.x2Weight).toFixed(2) +'<br /> Bias = '+ a.bias +' * ' + parseFloat(a.biasWeight).toFixed(2));
        //
        a.lblsldrLr.hide();
        a.sldrLr.hide();
        a.lblLr.hide();
        //
        a.btnNext.position(575,50);
    }

    a.stepFour = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 4: ');
        a.lblStepDesc.html('Weighted Inputs are Summed');
        a.lblStepDetail.html('X1 + X2 + Bias<br / >'+ a.weightedX1.toFixed(2) +' + ' + a.weightedX2.toFixed(2) + ' + ' + a.weghtedBias.toFixed(2));
    }
    a.stepFive = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 5: ');
        a.lblStepDesc.html('Sum goes through Activation Function');
        a.lblStepDetail.html('We can use the Heaviside step function as the Perceptron\'s activation <br/>- If below 0, Output = 0<br/>- If 0 or above, Output = 1');
    }
    a.stepSix = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 6: ');
        a.lblStepDesc.html('Weights of Connections are Updated');
        a.lblStepDetail.html('The updated weights are calculated by: <br/> New Weight = Old Weight + (Learning Rate * Error * Input), <br/>where Error = Target Output - Guess Output<br/><br/> &nbsp;WeightX1 = ' + parseFloat(a.x1Weight).toFixed(2) + ' + (' + a.learnRate + ' * (' + a.targetVal + ' - ' + a.activation + ') * ' + a.x1Val+ ')<br/> &nbsp;WeightX2 = ' + parseFloat(a.x2Weight).toFixed(2) + ' + (' + a.learnRate + ' * (' + a.targetVal + ' - ' + a.activation + ') * ' + a.x2Val+ ')<br/> &nbsp;WeightBias = ' + parseFloat(a.biasWeight).toFixed(2) + ' + (' + a.learnRate + ' * (' + a.targetVal + ' - ' + a.activation + ') * ' + a.bias+ ')');
    }
    a.stepSeven = function(){
        //
        a.displayArchit();
        //
        a.lblStep.html('Step 7: ');
        a.lblStepDesc.html('Terminating Check');
        a.lblStepDetail.html('To check if the training loop should be terminated, <br/> we can compare the new weights of connections with the<br/> old weights of connections to see if any learning took place: <br/> ∑Old Weights = '+ parseFloat(a.biasWeight).toFixed(2) + ' + ' + parseFloat(a.x1Weight).toFixed(2) + ' + ' + parseFloat(a.x2Weight).toFixed(2) + ' = ' + parseFloat(a.oldTotal).toFixed(2) + '<br/> ∑New Weights = '+ parseFloat(a.newBiasWeight).toFixed(2) +' + ' + parseFloat(a.newX1Weight).toFixed(2) + ' + ' + parseFloat(a.newX2Weight).toFixed(2) + ' = ' + parseFloat(a.newTotal).toFixed(2));
    }
    a.stepEight = function(){
        //
        a.displayArchit();
        //
        a.output.html('');
        //
        a.lblStep.html('Step 8: ');
        a.lblStepDesc.html('Optimal Weights of Connections');
        a.lblStepDetail.html('The weights of connections have been adjusted to their optimal weights,<br/> according to the Training Set.');
    }
}

let archDemo = new p5(sketch);
