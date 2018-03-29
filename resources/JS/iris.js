let points = [];
let output = [];
let WOC = [];
let tIndex = 0;
let perc, cnv, sldrLr, btnTrain, inpNoOfPoint, noOfPoints, learnRate, lblNoOfPoint, lblLr, lblOutput, btnShowPoints, amountPoints, pointShow, training, train, btnStop, accuracy, lblPredict, lblInputX1, lblInputX2, inpPredictX1, inpPredictX2, btnPredict, predictOuput;

function preload(){
     table = loadTable('resources/Data/iris_dataset.csv', 'csv', 'header');
}

function setup(){
    for (var r = 0; r < table.getRowCount(); r++){
        let sepal_Length =  table.getNum(r, 0);
        let sepal_Width =  table.getNum(r, 1);
        let petal_Length =  table.getNum(r, 2);
        let petal_Width =  table.getNum(r, 3);
        output[r] = table.getNum(r, 5);
        points[r] = [sepal_Length, sepal_Width, petal_Length, petal_Width];
    }
     //create the canvas for the demo
	cnv = createCanvas(400,300);
    //put the canvas within a <div> in order to manage in the html code
    cnv.parent('irisDemo');
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
         //display the accuracy of the perceptron on screen
        lblCurrAccuracy.html(accuracy+"%");
         //display the current weights of connections
        lblCurrWeightX1.html(weightOfConnectionX1);
        lblCurrWeightX2.html(weightOfConnectionX2);
        lblCurrWeightX3.html(weightOfConnectionX3);
        lblCurrWeightX4.html(weightOfConnectionX4);
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
    perc = new Perceptron(4, learnRate);
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
    //displays the accuracy of the perceptron along with the position on screen
    lblAccuracy.position(10,220);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,220);
    //call back function to hide the predict controls if the user decides to continue the training loop
    hidePredictControls();
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
    //move the accuracy back to the position it was before
    lblAccuracy.position(10,130);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,130);
    //call back to show the predict controls - to allow the user to predict a new point with an unknown output
    showPredictControls();
}
/**
Get Learning Rate function
   used to manipulate the slider input to get the correct format
*/
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
    sldrLr = createSlider(0,100, 1);
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
    lblAccuracy.position(10,220);
    lblAccuracy.hide();
    lblCurrAccuracy = createElement('label', '');
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,220);
    //display the current weights of connections along with labels for each
    lblWeightX1 = createElement('label', 'Weight Of Con (Sepal Length): ');
    lblWeightX1.position(10,140);
    lblWeightX1.hide();
    lblCurrWeightX1 = createElement('label', '');
    lblCurrWeightX1.position(lblWeightX1.x + lblWeightX1.width+5 ,140);
    lblWeightX2 = createElement('label', 'Weight Of Con (Sepal Width): ');
    lblWeightX2.position(10,160);
    lblWeightX2.hide();
    lblCurrWeightX2 = createElement('label', '');
    lblCurrWeightX2.position(lblWeightX2.x + lblWeightX2.width+5 ,160);
    lblWeightX3 = createElement('label', 'Weight Of Con (Petal Length): ');
    lblWeightX3.position(10,180);
    lblWeightX3.hide();
    lblCurrWeightX3 = createElement('label', '');
    lblCurrWeightX3.position(lblWeightX3.x + lblWeightX3.width+5 ,180);
    lblWeightX4 = createElement('label', 'Weight Of Con (Petal Width): ');
    lblWeightX4.position(10,200);
    lblWeightX4.hide();
    lblCurrWeightX4 = createElement('label', '');
    lblCurrWeightX4.position(lblWeightX4.x + lblWeightX4.width+5 ,200);
}
/**
Show Predict Controls function
     displays the user controls to predict new points from train perceptron
*/
function showPredictControls(){
    //creates heading for predict controls for user
    lblPredict = createElement('h3', 'Predict Point: ');
    lblPredict.position(250,0);
    lblPredict.show();
    //creates inputs for both inputs x1 and x2 for the user to inputs between 0-500
    lblInputX1 = createElement('label', 'Sepal Length: ');
    lblInputX1.position(250,40);
    lblInputX1.show();
    inpPredictX1 = createInput(' ');
    inpPredictX1.position(lblInputX1.x + lblInputX1.width +5, 40);
	inpPredictX1.size(50, 20);
    inpPredictX1.show();
    lblInputX2 = createElement('label', 'Sepal Width: ');
    lblInputX2.position(250,70);
    lblInputX2.show();
    inpPredictX2 = createInput(' ');
    inpPredictX2.position(lblInputX2.x + lblInputX2.width +5, 70);
	inpPredictX2.size(50, 20);
    inpPredictX2.show();
    lblInputX3 = createElement('label', 'Petal Length: ');
    lblInputX3.position(250,100);
    lblInputX3.show();
    inpPredictX3 = createInput(' ');
    inpPredictX3.position(lblInputX2.x + lblInputX2.width +5, 100);
	inpPredictX3.size(50, 20);
    inpPredictX3.show();
    lblInputX4 = createElement('label', 'Petal Width: ');
    lblInputX4.position(250,130);
    lblInputX4.show();
    inpPredictX4 = createInput(' ');
    inpPredictX4.position(lblInputX2.x + lblInputX2.width +5 , 130);
	inpPredictX4.size(50, 20);
    inpPredictX4.show();
    //creates button for the user to click and predict the inputted  values
    btnPredict = createButton('Predict');
    btnPredict.position(250,160);
    lblPredictOuput = createElement('label', 'Output: ');
    lblPredictOuput.position(250,190);
    lblPredictOuput.hide();
    predictOuput = createElement('label', '');
    predictOuput.position(lblPredictOuput.x + lblPredictOuput.width +5 , 190);
    predictOuput.show();
    //when the button is pressed the predict point function is called
    btnPredict.mousePressed(predictPoint);
    btnPredict.show();
}
/**
Hide Predict Controls function
     hides the controls to predict a new point
*/
function hidePredictControls(){
    //hides all the labels and I/O functionality to do with predicting points
    //is called when the training has been started again after being stopped
    lblPredict.hide();
    lblInputX1.hide();
    inpPredictX1.hide();
    lblInputX2.hide();
    inpPredictX2.hide();
    lblInputX3.hide();
    inpPredictX3.hide();
    lblInputX4.hide();
    inpPredictX4.hide();
    lblPredictOuput.hide();
    predictOuput.hide();
    btnPredict.hide();
}
/**
Predict Point function
     function to predict a set of x,y coordinates on the trained perceptron
*/
function predictPoint(){
    //inits the output to '' so that users can predict more than one point
    predictOuput.html('');
    //get the x,y coordinates from inputs
    let predictX1 = parseFloat(inpPredictX1.value());
    let predictX2 = parseFloat(inpPredictX2.value());
    let predictX3 = parseFloat(inpPredictX3.value());
    let predictX4 = parseFloat(inpPredictX4.value());
    //validation check to make sure inputs are numbers
    switch(isNaN(predictX1)) {
        case true:
            lblInputX1.style("color", "#B20000");
            inpPredictX1.value('');
            validX1 = false;
            break;
        case false:
           validX1 = true;
            break;
    }
     switch(isNaN(predictX2)) {
        case true:
            lblInputX2.style("color", "#B20000");
            inpPredictX2.value('');
            validX2 = false;
            break;
        case false:
            validX2 = true;
            break;
    }
     switch(isNaN(predictX3)) {
        case true:
            lblInputX3.style("color", "#B20000");
            inpPredictX3.value('');
            validX3 = false;
            break;
        case false:
           validX3 = true;
            break;
    } switch(isNaN(predictX4)) {
        case true:
            lblInputX4.style("color", "#B20000");
            inpPredictX4.value('');
            validX4 = false;
            break;
        case false:
           validX4 = true;
            break;
    }
    if(validX1 === true && validX2 === true && validX3 === true && validX4 === true){
        //changes the colour of label back to black
        lblInputX1.style("color", "#000000");
        lblInputX2.style("color", "#000000");
        lblInputX3.style("color", "#000000");
        lblInputX4.style("color", "#000000");
          //displays the predict outputs
        lblPredictOuput.show();
        predictOuput.show();
        //puts them into an array which is the format the predict funtion takes in the perceptron
        let predictPoint = [predictX1, predictX2, predictX3, predictX4];
        //calls the predict function in the perceptron with the users inputs and holds it within a variable
        prediction = perc.predict(predictPoint);
        if(prediction === 1){
            predOutput = "Iris Setosa";
        }else{
            predOutput = "Iris Versicolor or Iris Virginica";
        }
        //ouputs the prediction to screen
        predictOuput.html(predOutput);
    }
}
