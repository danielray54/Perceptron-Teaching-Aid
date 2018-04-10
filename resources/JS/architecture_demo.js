
let step, lblControls, learnRate, lblsldrLr, sldrLr, lblLr, btnNext, X1, lblX1, X2, lblX2, x1Val, x2Val, bias, targetVal, weightedX1, weightedX2, weghtedBias, total, activation, epoch, oldTotal, newTotal;
step = -1;
function setup(){
    //
    cnv = createCanvas(700,500);
    cnv.parent('arch');
    //
    inputControls();
    outputDisplay();
    //
    biasWeight = (Math.random() * 2 -1).toFixed(1);
    x1Weight = (Math.random() * 2 -1).toFixed(1);
    x2Weight = (Math.random() * 2 -1).toFixed(1);
    //
    bias = 1;
    //
    epoch = 0;
}
function draw(){
    //
    background(255);
    //
    line(500,0,500,500);
    line(0,315,500,315);
    //
    if(step == -1){
      stepInit();
    //
    }else if(step == 0){
        stepZero();
    //
    }else if(step == 1){
        stepOne();
    //
    }else if(step == 2){
        stepTwo();
    //
    }else if(step == 3){
        stepThree();
    //
    }else if(step == 4){
       stepFour();
    //
    }else if(step == 5){
      stepFive();
    //
    }else if(step == 6){
        stepSix();
    //
    }else if(step == 7){
        stepSeven();
    //
    }else if (step ==8){
        stepEight();
    }
}
function outputDisplay(){
    //
    lblDescription = createElement('label', '');
    lblDescription.position(10,10);
    //
    lblInp = createElement('label', '');
    lblInp.position(10,30);
    //
    lblDesOut = createElement('label', '');
    lblDesOut.position(10,50);
    //
    wocB = createElement('label', '');
    wocB.position(245, 165);
    //
    wocX1 = createElement('label', '');
    wocX1.position(150, 175);
    //
    wocX2 = createElement('label', '');
    wocX2.position(150, 255);
    //
    output = createElement('label', '');
    output.position(462, 225);
}
function inputControls(){
     //create heading for users benefit
    lblControls = createElement('h3', 'Controls: ');
    //position on top of demo
    lblControls.position(515,0);
    //display label and slider for the the learning rate of the perceptron
    lblsldrLr = createElement('label', 'Learning Rate: ');
    lblsldrLr.position(515,50);
    sldrLr = createSlider(0,10, 1);
    sldrLr.position(lblsldrLr.x + lblsldrLr.width +5 ,50);
    sldrLr.size(50, AUTO);
    sldrLr.input(getLearningRate);
    //display the value of the slider
    lblLr = createElement('label', '0');
    lblLr.position(sldrLr.x + sldrLr.width +8 ,50);
    lblsldrLr.hide();
    sldrLr.hide();
    lblLr.hide();
    //
    lblX1Val = createElement('label', 'X1: ');
    lblX1Val.position(515,50);
    lblX1Val.hide();
    inpX1 = createInput('');
    inpX1.position(lblX1Val.x + lblX1Val.width +5 , 50);
	inpX1.size(50, 15);
    inpX1.hide();
    //
    lblX2Val = createElement('label', 'X2: ');
    lblX2Val.position(515,80);
    lblX2Val.hide();
    inpX2 = createInput('');
    inpX2.position(lblX2Val.x + lblX2Val.width +5 , 80);
	inpX2.size(50, 15);
    inpX2.hide();
    //
    lblTargetVal = createElement('label', 'Target Output: ');
    lblTargetVal.position(515,110);
    lblTargetVal.hide();
    inpTargetVal = createInput('');
    inpTargetVal.position(lblTargetVal.x + lblTargetVal.width +5, 110);
	inpTargetVal.size(50, 15);
    inpTargetVal.hide();
    //
    btnNext = createButton('Next Step');
    btnNext.position(575,50);
    //function show points called when the button is pressed by user
    btnNext.mousePressed(nextStep);
}
function getLearningRate(){
    learnRate = this.value()/10;
    //display the learning rate to the user as the slider doesnt show it
     lblLr.html(learnRate);
}
function nextStep(){
    if(step == 7){
        //
        if(btnNext.html() == 'Finish'){
            //
            step = 8;
            btnNext.hide();
        }else{
            //
            step = 3;
        }
        //
    }else if(step == -1){
      if(isNaN(inpX1.value()) || inpX1.value() == ''){
            lblX1Val.style("color", "#B20000");
            inpX1.value('');
            validX1 = false;
        }else{
            lblX1Val.style("color", "#000000");
            x1Val = inpX1.value();
            console.log(x1Val);
            validX1 = true;
        }
        if(isNaN(inpX2.value()) || inpX2.value() == ''){
            lblX2Val.style("color", "#B20000");
            inpX2.value('');
            validX2 = false;
        }else{
            lblX2Val.style("color", "#000000");
            x2Val = inpX2.value();
            console.log(x2Val);
            validX2 = true;
        }
        if(isNaN(inpTargetVal.value())|| inpTargetVal.value() == ''){
            lblTargetVal.style("color", "#B20000");
            inpTargetVal.value('');
            validTarg = false;
        }else{
            lblTargetVal.style("color", "#000000");
            targetVal = inpTargetVal.value();
            console.log(targetVal);
            validTarg = true;
        }
        if(validX1 == true && validX2==true && validTarg == true){
            step = 0;
        }
    }else if(step == 2 && isNaN(learnRate)){
        //
        lblsldrLr.style("color", "#B20000");
    }else{
        //
       step++;
    }
}
function displayArchit(){
    if(step >= 0){
        //
       lblDescription.html('Training Set:');
        lblInp.html('Inputs: X1: ' + x1Val + ', X2: ' + x2Val);
        lblDesOut.html('Target Output: ' + targetVal);
        //weight of connection lines
        let woc1 = line(100,175,300,225);
        let woc2 = line(100,275,300,225);
         //output arrow
        let outputArr = line(300,225,450,225) + line(445,220,450,225) + line(445,230,450,225);
        //input circles
        ellipse(100,175,50,50);
        text('X1', 93, 180);
        ellipse(100,275,50,50);
        text('X2', 93, 280);
        ellipse(300,225,50,50);
    }
    //
    if(step >= 1){
        //
        line(200,150,282,207);
        ellipse(200,150,50,50);
        text(bias, 195, 155);
    }
    //
    if (step == 1 || step == 2){
        //
        wocB.html(biasWeight);
        wocX1.html(x1Weight);
        wocX2.html(x2Weight);
        //
        X1 = ellipse(50,175,30,30);
        lblX1 = text(x1Val, 43, 180);
        X2 = ellipse(50,275,30,30);
        lblX2 = text(x2Val, 43, 280);
    //
    }else if(step == 3){
        //
        if(epoch>0){
            //
            biasWeight = newBiasWeight;
            x1Weight = newX1Weight;
            x2Weight = newX2Weight;
        }
        //
         weightedX1 = x1Val * x1Weight;
         weightedX2 = x2Val * x2Weight;
         weghtedBias = bias * biasWeight;
        //
        X1 = ellipse(200,200,40,40);
        lblX1 = text(weightedX1.toFixed(2), 185, 205);
        //
        X2 = ellipse(200,250,40,40);
        lblX2 = text(weightedX2.toFixed(2), 185, 255);
        //
        weighBias = ellipse(252,189,40,40);
        lblweighBias = text(weghtedBias.toFixed(2), 235, 192);
        //
        output.html('');
    //
    }else if(step == 4){
        //
        total = weightedX1 + weightedX2 + weghtedBias;
        text(total.toFixed(2),285,230);
    }else if(step == 5){
        //
        text(total.toFixed(2),285,230);
        if(total > 0){
            //
             activation = '1';
        }else{
            //
             activation = '0';
        }
        //
        output.html(activation);
    //
    }else if(step == 6){
        //
        newBiasWeight = parseFloat(biasWeight) + (parseFloat(learnRate) *(parseInt(targetVal) - parseInt(activation)) * parseInt(bias));
        //
        newX1Weight = parseFloat(x1Weight) + (parseFloat(learnRate) *(parseInt(targetVal) - parseInt(activation)) * parseFloat(x1Val));
        //
        newX2Weight = parseFloat(x2Weight) + (parseFloat(learnRate) *(parseInt(targetVal) - parseInt(activation)) * parseFloat(x2Val));
        //
        wocB.html(newBiasWeight.toFixed(2));
        wocX1.html(newX1Weight.toFixed(2));
        wocX2.html(newX2Weight.toFixed(2));
    //
    }else if(step == 7){
        //
        oldTotal = parseFloat(biasWeight) + parseFloat(x1Weight) + parseFloat(x2Weight);
        //
        newTotal = newBiasWeight + newX1Weight + newX2Weight;
        //
        if(oldTotal == newTotal){
            //
           btnNext.html('Finish');
        }else{
            //
           epoch++;
        }
    }
}
function stepInit(){
    //show training set and arch structure
    displayArchit();
    //
    lblX1Val.show();
    inpX1.show();
    lblX2Val.show();
    inpX2.show();
    lblTargetVal.show();
    inpTargetVal.show();
    //
    btnNext.position(575,145);
}
function stepZero(){
    //show training set and arch structure
    displayArchit();
    //
    lblX1Val.hide();
    inpX1.hide();
    lblX2Val.hide();
    inpX2.hide();
    lblTargetVal.hide();
    inpTargetVal.hide();
    //
    btnNext.position(575,50);
    //
    lblStep = createElement('label', '');
    lblStep.position(15,325);
    //
    lblStepDesc = createElement('label', '');
    lblStepDesc.position(25,345);
    //
    lblStepDetail = createElement('label', '');
    lblStepDetail.position(25,365);
}
function stepOne(){
    //
    displayArchit();
    //
    lblStep.html('Step 1: ');
    lblStepDesc.html('Initialise Weights of Connections and Bias');
    lblStepDetail.html('- The Weights can be initialised using a random number between -1 and 1<br />- The Bias input is always 1');

}
function stepTwo(){
    //
    displayArchit();
    //
    lblStep.html('Step 2: ');
    lblStepDesc.html('Set Learning Rate');
    lblStepDesc.html('The Learning Rate of the Perceptron is set');
    lblStepDetail.html('- A positive Coefficient between 0 and 1 ');
    //
    lblsldrLr.show();
    sldrLr.show();
    lblLr.show();
    //
    btnNext.position(575,80);
}
function stepThree(){
    //
    displayArchit();
    //
    lblStep.html('Step 3: ');
    lblStepDesc.html('Inputs are Weighted');
    lblStepDetail.html('X1 = '+ x1Val +' * ' + parseFloat(x1Weight).toFixed(2) + '<br /> X2 = '+ x2Val +' * '+ parseFloat(x2Weight).toFixed(2) +'<br /> Bias = '+ bias +' * ' + parseFloat(biasWeight).toFixed(2));
    //
    lblsldrLr.hide();
    sldrLr.hide();
    lblLr.hide();
    //
    btnNext.position(575,50);
}
function stepFour(){
    //
    displayArchit();
    //
    lblStep.html('Step 4: ');
    lblStepDesc.html('Weighted Inputs are Summed');
    lblStepDetail.html('X1 + X2 + Bias<br / >'+ weightedX1.toFixed(2) +' + ' + weightedX2.toFixed(2) + ' + ' + weghtedBias.toFixed(2));
}
function stepFive(){
    //
    displayArchit();
    //
    lblStep.html('Step 5: ');
    lblStepDesc.html('Sum goes through Activation Function');
    lblStepDetail.html('We can use the Heaviside step function as the Perceptron\'s activation <br/>- if 0 or below, Output = 0<br/>- if 0 or above, Output = 1');
}
function stepSix(){
    //
    displayArchit();
    //
    lblStep.html('Step 6: ');
    lblStepDesc.html('Weights of Connections are Updated');
    lblStepDetail.html('The updated weights are calculated by: <br/> New Weight = Old Weight + (Learning Rate * Error * Input), <br/>where Error = Target Output - Guess Output<br/><br/> &nbsp;WeightX1 = ' + parseFloat(x1Weight).toFixed(2) + ' + (' + learnRate + ' * (' + targetVal + ' - ' + activation + ') * ' + x1Val+ ')<br/> &nbsp;WeightX2 = ' + parseFloat(x2Weight).toFixed(2) + ' + (' + learnRate + ' * (' + targetVal + ' - ' + activation + ') * ' + x2Val+ ')<br/> &nbsp;WeightBias = ' + parseFloat(biasWeight).toFixed(2) + ' + (' + learnRate + ' * (' + targetVal + ' - ' + activation + ') * ' + bias+ ')');
}
function stepSeven(){
    //
    displayArchit();
    //
    lblStep.html('Step 7: ');
    lblStepDesc.html('Terminating Check');
    lblStepDetail.html('To check if the training loop should be terminated, <br/> we can compare the new weights of connections with the<br/> old weights of connections to see if any learning took place: <br/> ∑Old Weights = '+ parseFloat(biasWeight).toFixed(2) + ' + ' + parseFloat(x1Weight).toFixed(2) + ' + ' + parseFloat(x2Weight).toFixed(2) + ' = ' + parseFloat(oldTotal).toFixed(2) + '<br/> ∑New Weights = '+ parseFloat(newBiasWeight).toFixed(2) +' + ' + parseFloat(newX1Weight).toFixed(2) + ' + ' + parseFloat(newX2Weight).toFixed(2) + ' = ' + parseFloat(newTotal).toFixed(2));
}
function stepEight(){
    //
    displayArchit();
    //
    output.html('');
    //
    lblStep.html('Step 8: ');
    lblStepDesc.html('Optimal Weights of Connections');
     lblStepDetail.html('The weights of connections have been adjusted to their optimal weights.');
}
