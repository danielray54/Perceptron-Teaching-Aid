let points = [];
let output = [];
let WOC = [];
let tIndex = 0;
let perc, cnv, sldrLr, btnTrain, inpNoOfPoint, noOfPoints, learnRate, lblNoOfPoint, lblLr, lblOutput, btnShowPoints, amountPoints, pointShow, training, train, btnStop, accuracy, lblPredict, lblInputX1, lblInputX2;
function preload(){
     table = loadTable('resources/Data/diabetes.csv', 'csv', 'header');
}

function setup(){
    for (var r = 0; r < table.getRowCount(); r++){
        let pregrancies =  table.getNum(r, 0);
        let glucose =  table.getNum(r, 1);
        let blood_pressure =  table.getNum(r, 2);
        let skin_thickness =  table.getNum(r, 3);
        let insulin =  table.getNum(r, 4);
        let bmi =  table.getNum(r, 5);
        let dpf =  table.getNum(r, 6);
        let age =  table.getNum(r, 7);
        output[r] = table.getNum(r, 8);
        points[r] = [pregrancies, glucose, blood_pressure, skin_thickness, insulin, bmi, dpf, age];
    }
     //create the canvas for the demo
	cnv = createCanvas(400,300);
    //put the canvas within a <div> in order to manage in the html code
    cnv.parent('diabetesDemo');
    //background colour white
    background(255);
    displayInputs();
    displayOutputs();

}
function draw(){

 if(train == true){

    //init the training  data for each point - makes use of the draw loop
        traininginpt = points[tIndex];
        trainingoupt =  output[tIndex]
         //call the train function in the perceptron to update the WOC, using that points input array and desired output
        perc.train(traininginpt, trainingoupt);
        //set the current accuracy of the perceptron to variable
        let accuracy = perc.current_accuracy();
        //only display 4 decimal places due to space
        accuracy = accuracy.toFixed(4);
        //set the variable to the current weight of connections
        WOC = perc.getWeights();
        //split the array into X1 and X2 weights
        weightOfConnectionX1 = WOC[0] ;
         //only display 4 decimal places due to space
        weightOfConnectionX1 = weightOfConnectionX1.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX2 = WOC[1] ;
         //only display 4 decimal places due to space
        weightOfConnectionX2 = weightOfConnectionX2.toFixed(4);
        weightOfConnectionX3 = WOC[2] ;
         //only display 4 decimal places due to space
        weightOfConnectionX3 = weightOfConnectionX3.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX4 = WOC[3] ;
         //only display 4 decimal places due to space
        weightOfConnectionX4 = weightOfConnectionX4.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX5 = WOC[4] ;
         //only display 4 decimal places due to space
        weightOfConnectionX5 = weightOfConnectionX5.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX6 = WOC[5] ;
         //only display 4 decimal places due to space
        weightOfConnectionX6 = weightOfConnectionX6.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX7 = WOC[6] ;
         //only display 4 decimal places due to space
        weightOfConnectionX7 = weightOfConnectionX7.toFixed(4);
         //split the array into X1 and X2 weights
        weightOfConnectionX8 = WOC[7] ;
         //only display 4 decimal places due to space
        weightOfConnectionX8 = weightOfConnectionX8.toFixed(4);

         //display the accuracy of the perceptron on screen
        lblCurrAccuracy.html(accuracy+"%");
         //display the current weights of connections
        lblCurrWeightX1.html(weightOfConnectionX1);
        lblCurrWeightX2.html(weightOfConnectionX2);
        lblCurrWeightX3.html(weightOfConnectionX3);
        lblCurrWeightX4.html(weightOfConnectionX4);
        lblCurrWeightX5.html(weightOfConnectionX5);
        lblCurrWeightX6.html(weightOfConnectionX6);
        lblCurrWeightX7.html(weightOfConnectionX7);
        lblCurrWeightX8.html(weightOfConnectionX8);
         //increment the index to move to next point
        tIndex++;
         //if reached the end of the points start again
        if (tIndex == points.length) {
            tIndex = 0;
        }
    }
}
function trainPoint(){
    learnRate = parseFloat(learnRate);
    if(isNaN(learnRate)){
        lblsldrLr.style("color", "#B20000");
    }else{
        lblsldrLr.style("color", "#000000");
    perc = new Perceptron(8, learnRate);
    //boolean to start the training loop
    train = true;
    //create a stop button - helpful to stop the loop and explain whats going on
    btnStop = createButton('Stop');
    //positioning of that button in relation the the train button
    btnStop.position(btnTrain.x + btnTrain.width +5,75);
    //function to execute when the stop button is pressed by user
    btnStop.mousePressed(stopTraining);
    //show the output values generated from the training
    //first display the labels as to let the user know what they are looking at
    lblOutput.show();
    lblAccuracy.show();
    lblWeightX1.show();
    lblCurrWeightX1.show();
    lblWeightX2.show();
    lblCurrWeightX2.show();
    lblWeightX3.show();
    lblCurrWeightX3.show();
    lblWeightX4.show();
    lblCurrWeightX4.show();
    lblWeightX5.show();
    lblCurrWeightX5.show();
    lblWeightX6.show();
    lblCurrWeightX6.show();
    lblWeightX7.show();
    lblCurrWeightX7.show();
    lblWeightX8.show();
    lblCurrWeightX8.show();
    //displays the accuracy of the perceptron along with the position on screen
    lblAccuracy.position(10,300);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,300);
    }
}
/**
Stop Training function
    code runs if the stop button is pressed by a user
*/
function stopTraining(){
    //bool to stop the training loop in the draw function
    train = false;
    //hide all the information that is unneccesary when the perceptron is training
    lblWeightX1.hide();
    lblCurrWeightX1.hide();
    lblWeightX2.hide();
    lblCurrWeightX2.hide();
    lblWeightX3.hide();
    lblCurrWeightX3.hide();
    lblWeightX4.hide();
    lblCurrWeightX4.hide();
    lblWeightX5.hide();
    lblCurrWeightX5.hide();
    lblWeightX6.hide();
    lblCurrWeightX6.hide();
    lblWeightX7.hide();
    lblCurrWeightX7.hide();
    lblWeightX8.hide();
    lblCurrWeightX8.hide();
    //move the accuracy back to the position it was before
    lblAccuracy.position(10,130);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,130);
}
///**
//Get Learning Rate function
//   used to manipulate the slider input to get the correct format
//*/
function getLearningRate(){
    learnRate = this.value()/10;
    //display the learning rate to the user as the slider doesnt show it
     lblLr.html(learnRate);
}
/**
Display Inputs function
    code to display inputs when the demo loads
*/
function displayInputs(){
    //create heading for users benefit
   lblControls = createElement('h3', 'Controls: ');
    //position on top of demo
    lblControls.position(10,0);
    //display label and slider for the the learning rate of the perceptron
    lblsldrLr = createElement('label', 'Learning Rate: ');
    lblsldrLr.position(10,45);
    sldrLr = createSlider(0,10, 1);
    sldrLr.position(lblsldrLr.x + lblsldrLr.width +5 ,45);
    sldrLr.size(50, AUTO);
    sldrLr.input(getLearningRate);
    //display the value of the slider
    lblLr = createElement('label', '0');
    lblLr.position(sldrLr.x + sldrLr.width +8 ,45);
    //train button created to allow the user to start the training loop
    btnTrain = createButton('Train');
    btnTrain.position(10,75);
    //train points function called when user presses train button
    btnTrain.mousePressed(trainPoint);
}
/**
Display Outputs function
    Displays the outputs from the training on screen
*/
function displayOutputs(){
    //creates heading for the outputs, position it on screen then hide it
    lblOutput = createElement('h3', 'Outputs: ');
    lblOutput.position(10,90);
    lblOutput.hide();
    //displays the accuracy with label, position both on screen relative to each other. then hide it
    lblAccuracy = createElement('label', 'Accuracy: ');
    lblAccuracy.position(10,320);
    lblAccuracy.hide();
    lblCurrAccuracy = createElement('label', '');
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,320);
    //display the current weights of connections along with labels for each
    lblWeightX1 = createElement('label', 'Weight Of Con (Pregancies): ');
    lblWeightX1.position(10,140);
    lblWeightX1.hide();
    lblCurrWeightX1 = createElement('label', '');
    lblCurrWeightX1.position(lblWeightX1.x + lblWeightX1.width+5 ,140);
    lblWeightX2 = createElement('label', 'Weight Of Con (Glucose): ');
    lblWeightX2.position(10,160);
    lblWeightX2.hide();
    lblCurrWeightX2 = createElement('label', '');
    lblCurrWeightX2.position(lblWeightX2.x + lblWeightX2.width+5 ,160);
    lblWeightX3 = createElement('label', 'Weight Of Con (Blood Pressure): ');
    lblWeightX3.position(10,180);
    lblWeightX3.hide();
    lblCurrWeightX3 = createElement('label', '');
    lblCurrWeightX3.position(lblWeightX3.x + lblWeightX3.width+5 ,180);
    lblWeightX4 = createElement('label', 'Weight Of Con (Skin Thickness): ');
    lblWeightX4.position(10,200);
    lblWeightX4.hide();
    lblCurrWeightX4 = createElement('label', '');
    lblCurrWeightX4.position(lblWeightX4.x + lblWeightX4.width+5 ,200);
     lblWeightX5 = createElement('label', 'Weight Of Con (Insulin): ');
    lblWeightX5.position(10,220);
    lblWeightX5.hide();
    lblCurrWeightX5 = createElement('label', '');
    lblCurrWeightX5.position(lblWeightX5.x + lblWeightX5.width+5 ,220);
    lblWeightX6 = createElement('label', 'Weight Of Con (BMI): ');
    lblWeightX6.position(10,240);
    lblWeightX6.hide();
    lblCurrWeightX6 = createElement('label', '');
    lblCurrWeightX6.position(lblWeightX6.x + lblWeightX6.width+5 ,240);
    lblWeightX7 = createElement('label', 'Weight Of Con (Diabetes Prediction Function): ');
    lblWeightX7.position(10,260);
    lblWeightX7.hide();
    lblCurrWeightX7 = createElement('label', '');
    lblCurrWeightX7.position(lblWeightX7.x + lblWeightX7.width+5 ,260);
    lblWeightX8 = createElement('label', 'Weight Of Con (Age): ');
    lblWeightX8.position(10,280);
    lblWeightX8.hide();
    lblCurrWeightX8 = createElement('label', '');
    lblCurrWeightX8.position(lblWeightX8.x + lblWeightX8.width+5 ,280);
}


