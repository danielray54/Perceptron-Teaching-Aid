/**
RANDOM POINTS LINEAR SEPERABLE DEMO
    Daniel Ray - 201024489
    Web-Based Teaching Aid to Demonstrate the Perceptron Algorithm
    University of Liverpool - 2018
*/
//declaring variables used within the demo
let perc, cnv, sldrLr, btnTrain, inpNoOfPoint, noOfPoints, learnRate, lblNoOfPoint, lblLr, lblOutput,lblPredict, btnShowPoints, amountPoints, pointShow, training, train, btnStop, accuracy, lblInputX1, lblInputX2, inpPredictX1, inpPredictX2, btnPredict, predictOuput, btnReset;
//declaring and initilising arrays and indexs
let points = [];
let WOC = [];
let tIndex = 0;
/**
Setup function
    code runs before starting the draw loop
*/
function setup() {
    //create the canvas for the demo
	cnv = createCanvas(700,500);
    //put the canvas within a <div> in order to manage in the html code
    cnv.parent('rndDemo');
    //background colour white
    background(255);
      //call back functions for displaying user controls
    displayInputs();
    //call back function to display the outputs
    displayOutputs();
}
/**
Draw function
    code runs as a ever lasting loop
*/
function draw() {



    //draw the boundary line, between the controls and the coordinate plane
    line(505,0,505,500);
    //if statement to excecute if the points are on screen and the training button has been clicked
     if(pointShow == true && train == true){
         //for loop going through every point
       for (var c = 0; c < points.length; c++) {
           //declare the variables of the points
           //first is the array of x,y coordinates and target output for point
            var pt = points[c];
           //set target output for that point
            var target = pt.output;
           //set the input array to that points x,y coordinate
            var inputs = pt.input;
           // declare the variable that calls the summation function of perceptron - returns either 1 or -1
            var guess = perc.summation(inputs);
           //if the guess is the same as the desired output
            if (guess == target) {
                //then make that point green
                fill(0,255,0);
            }else {
                //if not make the point red
                fill(255,0,0);
            }
            //draw a smaller point within the point to display if the perpectron has correctly learnt the class of that point
            noStroke();
            ellipse(pt.x,pt.y,3,3);
        }
        //init the training  data for each point - makes use of the draw loop
        training = points[tIndex];
         //call the train function in the perceptron to update the WOC, using that points input array and desired output
        perc.train(training.input, training.output);
        //set the current accuracy of the perceptron to variable
        accuracy = perc.current_accuracy();
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
         //if statement to terminate loop if accuracy is 100%
         if(accuracy >=100 ){
             train == false;
         }
         //display the accuracy of the perceptron on screen
        lblCurrAccuracy.html(accuracy+"%");
         //display the current weights of connections
        lblCurrWeightX1.html(weightOfConnectionX1);
        lblCurrWeightX2.html(weightOfConnectionX2);
         //increment the index to move to next point
        tIndex++;
         //if reached the end of the points start again
        if (tIndex == points.length) {
            tIndex = 0;
        }
    }
}
/**
Show Points function
    Displays the points to be trained on screen
*/
function showPoint(){
    let noOfInputs = parseInt(inpNoOfPoint.value());
    learnRate = parseFloat(learnRate);
    if(isNaN(noOfInputs) && isNaN(learnRate)){
        lblNoOfPoint.style("color", "#B20000");
        inpNoOfPoint.value('');
        lblsldrLr.style("color", "#B20000");
    }else if(isNaN(noOfInputs)){
        lblsldrLr.style("color", "#000000");
        lblNoOfPoint.style("color", "#B20000");
        inpNoOfPoint.value('');
    }else if(isNaN(learnRate)){
        lblNoOfPoint.style("color", "#000000");
        lblsldrLr.style("color", "#B20000");
    }else{
        lblNoOfPoint.style("color", "#000000");
        lblsldrLr.style("color", "#000000");
         //init the perceptron object with amount of inputs (x,y) and the learning ratr
        perc = new Perceptron(2, learnRate);
        //for loop to generate points according to the amount the user has inputted
        for (var i=0; i < noOfInputs; i++) {
            //create new point object
            points[i] = new Point();
            //call the show function to display that point
            points[i].show();
            //display the boundary line between the two classes
            line(0,0,500,500);
        }
        //boolean used for button
        pointShow = true;
        //hide the display points button as to save space on screen
        btnShowPoints.hide();
        //move the train button to the show points button's place
        btnTrain.position(520,110);
    }
}
/**
Train Points function
    code to execute when the user selects the train points btn
*/
function trainPoint(){
    //boolean to start the training loop
    train = true;
    //create a stop button - helpful to stop the loop and explain whats going on
    btnStop = createButton('Stop');
    //positioning of that button in relation the the train button
    btnStop.position(btnTrain.x + btnTrain.width +5,110);
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
    //displays the accuracy of the perceptron along with the position on screen
    lblAccuracy.position(520,260);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,260);
    //call back function to hide the predict controls if the user decides to continue the training loop
    hidePredictControls();
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
    //move the accuracy back to the position it was before
    lblAccuracy.position(520,160);
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,160);
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
    lblControls.position(520,0);
    //display label and input box for the number of points the user wants to train
    lblNoOfPoint = createElement('label', '# of Points: ');
    lblNoOfPoint.position(520,50);
    inpNoOfPoint = createInput(' ');
    inpNoOfPoint.position(lblNoOfPoint.x + lblNoOfPoint.width +5 , 50);
	inpNoOfPoint.size(50, 15);
    //display label and slider for the the learning rate of the perceptron
    lblsldrLr = createElement('label', 'Learning Rate: ');
    lblsldrLr.position(520,80);
    sldrLr = createSlider(0,10, 1);
    sldrLr.position(lblsldrLr.x + lblsldrLr.width +5 ,80);
    sldrLr.size(50, AUTO);
    sldrLr.input(getLearningRate);
    //display the value of the slider
    lblLr = createElement('label', '0');
    lblLr.position(sldrLr.x + sldrLr.width +8 ,80);
    //display the shpw points button, used to show the points on the screen before training
    btnShowPoints = createButton('Show Points');
    btnShowPoints.position(520,110);
    //function show points called when the button is pressed by user
    btnShowPoints.mousePressed(showPoint);
    //train button created to allow the user to start the training loop
    btnTrain = createButton('Train');
    btnTrain.position(btnShowPoints.x + btnShowPoints.width +5,110);
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
    lblOutput.position(520,120);
    lblOutput.hide();
    //displays the accuracy with label, position both on screen relative to each other. then hide it
    lblAccuracy = createElement('label', 'Accuracy: ');
    lblAccuracy.position(520,260);
    lblAccuracy.hide();
    lblCurrAccuracy = createElement('label', '');
    lblCurrAccuracy.position(lblAccuracy.x + lblAccuracy.width +5,260);
    //display the current weights of connections along with labels for each
    lblWeightX1 = createElement('label', 'Weight Of Con(X1): ');
    lblWeightX1.position(520,160);
    lblWeightX1.hide();
    lblCurrWeightX1 = createElement('label', '');
    lblCurrWeightX1.position(520,185);
    lblWeightX2 = createElement('label', 'Weight Of Con(X2): ');
    lblWeightX2.position(520,210);
    lblWeightX2.hide();
    lblCurrWeightX2 = createElement('label', '');
    lblCurrWeightX2.position(520,235);
}
/**
Show Predict Controls function
     displays the user controls to predict new points from train perceptron
*/
function showPredictControls(){
    //creates heading for predict controls for user
    lblPredict = createElement('h3', 'Predict Point: ');
    lblPredict.position(520,180);
    lblPredict.show();
    //creates inputs for both inputs x1 and x2 for the user to inputs between 0-500
    lblInputX1 = createElement('label', 'Input (X1): ');
    lblInputX1.position(520,225);
    lblInputX1.show();
    inpPredictX1 = createInput(' ');
    inpPredictX1.position(lblInputX1.x + lblInputX1.width +5 , 225);
	inpPredictX1.size(50, 15);
    inpPredictX1.show();
    lblInputX2 = createElement('label', 'Input (X2): ');
    lblInputX2.position(520,255);
    lblInputX2.show();
    inpPredictX2 = createInput(' ');
    inpPredictX2.position(lblInputX2.x + lblInputX2.width +5 , 255);
	inpPredictX2.size(50, 15);
    inpPredictX2.show();
    //creates button for the user to click and predict the inputted  values
    btnPredict = createButton('Predict');
    btnPredict.position(520,280);
    lblPredictOuput = createElement('label', 'Output: ');
    lblPredictOuput.position(520,315);
    lblPredictOuput.hide();
    predictOuput = createElement('label', '');
    predictOuput.position(lblPredictOuput.x + lblPredictOuput.width +5 , 315);
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
    let predictX = parseInt(inpPredictX1.value());
    let predictY = parseInt(inpPredictX2.value());
    //validation check to make sure inputs are numbers
    if(isNaN(predictX) && isNaN(predictY) || predictX > 500 && predictY > 500){
        //if not then the label of the input turns red and the input is emptied
        lblInputX1.style("color", "#B20000");
        inpPredictX1.value('');
        lblInputX2.style("color", "#B20000");
        inpPredictX2.value('');
    }else if(isNaN(predictX) || predictX > 500){
        //if not then the label of the input turns red and the input is emptied
        lblInputX1.style("color", "#B20000");
        inpPredictX1.value('');
    }else if(isNaN(predictY)|| predictY > 500){
        //if not then the label of the input turns red and the input is emptied
        lblInputX2.style("color", "#B20000");
        inpPredictX2.value('');
    }else{
        //changes the colour of label back to black
        lblInputX1.style("color", "#000000");
        lblInputX2.style("color", "#000000");
          //displays the predict outputs
        lblPredictOuput.show();
        predictOuput.show();
        //puts them into an array which is the format the predict funtion takes in the perceptron
        let predictxy = [predictX, predictY];
        //calls the predict function in the perceptron with the users inputs and holds it within a variable
        prediction = perc.predict(predictxy);
        fill(30,144,255);
        stroke(1);
        ellipse(predictX, predictY, 8, 8);
        //ouputs the prediction to screen
        predictOuput.html('Class ' + prediction);
    }
}
/**
Point function
    function used to create a point object
*/
function Point() {
    //generate a random point from 0-500 as this is the size of the coordinate plane - for both x and y
	this.x = random(500);
	this.y = random(500);
    //puts the x,y coordinates within an array as this is the format the perceptron takes
    this.input = [this.x, this.y];
    //init the output to null
	this.output = null;
    //if x> than y then the output is 1 else -1
	if (this.x>this.y) {
		this.output = 1;
	}else {
		this.output = -1;
	}
    //show function to display the point on screen
	this.show = function() {
		if (this.output == 1) {
            //if the output is 1 then the point is white
			fill(255);
		}else {
            //if -1 then the point is black
			fill(0);
		}
        //draw the circle for the point on screen
		ellipse(this.x,this.y,8,8);
	}
}
