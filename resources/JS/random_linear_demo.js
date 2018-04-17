/**
RANDOM POINTS LINEAR SEPERABLE DEMO
    Daniel Ray - 201024489
    Web-Based Teaching Aid to Demonstrate the Perceptron Algorithm
    University of Liverpool - 2018
*/

var sketch = function(b){
    //declaring and initilising arrays and indexs
    b.points = [];
    b.WOC = [];
    b.tIndex = 0;
    /**
    Setup function
        code runs before starting the draw loop
    */
    b.setup = function(){
        //create the canvas for the demo
        b.cnv = b.createCanvas(700,500);
        //put the canvas within a <div> in order to manage in the html code
        b.cnv.parent('rndDemo');
        //background colour white
        b.background(255);
          //call back functions for displaying user controls
        b.displayInputs();
        //call back function to display the outputs
        b.displayOutputs();
    }
    /**
    Draw function
        code runs as a ever lasting loop
    */
    b.draw = function(){
        //draw the boundary line, between the controls and the coordinate plane
    b.line(505,0,505,500);
    //if statement to excecute if the points are on screen and the training button has been clicked
     if(b.pointShow == true && b.train == true){
         //for loop going through every point
       for (b.c = 0; b.c < b.points.length; b.c++) {
           //declare the variables of the points
           //first is the array of x,y coordinates and target output for point
            b.pt = b.points[b.c];
           //set target output for that point
            b.target = b.pt.output;
           //set the input array to that points x,y coordinate
            b.inputs = b.pt.input;
           // declare the variable that calls the summation function of perceptron - returns either 1 or -1
            b.guess = b.perc.summation(b.inputs);
           //if the guess is the same as the desired output
            if (b.guess == b.target) {
                //then make that point green
                b.fill(0,255,0);
            }else {
                //if not make the point red
                b.fill(255,0,0);
            }
            //draw a smaller point within the point to display if the perpectron has correctly learnt the class of that point
            b.noStroke();
            b.ellipse(b.pt.x,b.pt.y,3,3);
        }
        //init the training  data for each point - makes use of the draw loop
        b.training = b.points[b.tIndex];
         //call the train function in the perceptron to update the WOC, using that points input array and desired output
        b.perc.train(b.training.input, b.training.output);
        //set the current accuracy of the perceptron to variable
        b.accuracy = b.perc.current_accuracy();
        //only display 4 decimal places due to space
        b.accuracy = b.accuracy.toFixed(4);
         //set the variable to the current weight of connections
        b.WOC = b.perc.getWeights();
         //split the array into X1 and X2 weights
        b.weightOfConnectionX1 = b.WOC[0] ;
         //only display 4 decimal places due to space
        b.weightOfConnectionX1 = b.weightOfConnectionX1.toFixed(4);
         //split the array into X1 and X2 weights
        b.weightOfConnectionX2 = b.WOC[1] ;
         //only display 4 decimal places due to space
        b.weightOfConnectionX2 = b.weightOfConnectionX2.toFixed(4);
        //if statement to terminate loop if accuracy is 100%
        if(b.accuracy >=100 ){
             b.train == false;
            }
         //display the accuracy of the perceptron on screen
        b.lblCurrAccuracy.html(b.accuracy+"%");
         //display the current weights of connections
        b.lblCurrWeightX1.html(b.weightOfConnectionX1);
        b.lblCurrWeightX2.html(b.weightOfConnectionX2);
         //increment the index to move to next point
        b.tIndex++;
         //if reached the end of the points start again
        if (b.tIndex == b.points.length) {
            b.tIndex = 0;
            }
        }
    }
    /**
    Show Points function
        Displays the points to be trained on screen
    */
    b.showPoint = function(){
        b.noOfInputs = parseInt(b.inpNoOfPoint.value());
        b.learnRate = parseFloat(b.learnRate);
        if(isNaN(b.noOfInputs) && isNaN(b.learnRate)){
            b.lblNoOfPoint.style("color", "#B20000");
            b.inpNoOfPoint.value('');
            b.lblsldrLr.style("color", "#B20000");
        }else if(isNaN(b.noOfInputs)){
            b.lblsldrLr.style("color", "#000000");
            b.lblNoOfPoint.style("color", "#B20000");
            b.inpNoOfPoint.value('');
        }else if(isNaN(b.learnRate)){
            b.lblNoOfPoint.style("color", "#000000");
            b.lblsldrLr.style("color", "#B20000");
        }else{
            b.lblNoOfPoint.style("color", "#000000");
            b.lblsldrLr.style("color", "#000000");
             //init the perceptron object with amount of inputs (x,y) and the learning ratr
            b.perc = new Perceptron(2, b.learnRate);
            //for loop to generate points according to the amount the user has inputted
            for(b.i=0; b.i < b.noOfInputs; b.i++) {
                //create new point object
                b.points[b.i] = new b.Point();
                //call the show function to display that point
                b.points[b.i].show();
                //display the boundary line between the two classes
                b.line(0,0,500,500);
            }
        //boolean used for button
        b.pointShow = true;
        //hide the display points button as to save space on screen
        b.btnShowPoints.hide();
        //move the train button to the show points button's place
        b.btnTrain.position(520,110);
        }
    }
    /**
    Train Points function
        code to execute when the user selects the train points btn
    */
    b.trainPoint = function(){
        //boolean to start the training loop
        b.train = true;
        //create a stop button - helpful to stop the loop and explain whats going on
        b.btnStop = b.createButton('Stop');
        //positioning of that button in relation the the train button
        b.btnStop.position(b.btnTrain.x + b.btnTrain.width +5,110);
        //function to execute when the stop button is pressed by user
        b.btnStop.mousePressed(b.stopTraining);
        //show the output values generated from the training
        //first display the labels as to let the user know what they are looking at
        b.lblOutput.show();
        b.lblAccuracy.show();
        b.lblWeightX1.show();
        b.lblCurrWeightX1.show();
        b.lblWeightX2.show();
        b.lblCurrWeightX2.show();
        //displays the accuracy of the perceptron along with the position on screen
        b.lblAccuracy.position(520,260);
        b.lblCurrAccuracy.position(b.lblAccuracy.x + b.lblAccuracy.width +5,260);
        //call back function to hide the predict controls if the user decides to continue the training loop
        b.hidePredictControls();
    }
    /**
    Stop Training function
        code runs if the stop button is pressed by a user
    */
    b.stopTraining = function(){
        //bool to stop the training loop in the draw function
        b.train = false;
        //hide all the information that is unneccesary when the perceptron is training
        b.lblWeightX1.hide();
        b.lblCurrWeightX1.hide();
        b.lblWeightX2.hide();
        b.lblCurrWeightX2.hide();
        //move the accuracy back to the position it was before
        b.lblAccuracy.position(520,160);
        b.lblCurrAccuracy.position(b.lblAccuracy.x + b.lblAccuracy.width +5,160);
        //call back to show the predict controls - to allow the user to predict a new point with an unknown output
        b.showPredictControls();
    }
    /**
    Get Learning Rate function
       used to manipulate the slider input to get the correct format
    */
    b.getLearningRate = function(){
        b.learnRate = this.value()/10;
        //display the learning rate to the user as the slider doesnt show it
        b.lblLr.html(b.learnRate);
    }
    /**
    Display Inputs function
        code to display inputs when the demo loads
    */
    b.displayInputs = function(){
        //create heading for users benefit
        b.lblControls = b.createElement('h3', 'Controls: ');
        //position on top of demo
        b.lblControls.position(520,0);
        //display label and input box for the number of points the user wants to train
        b.lblNoOfPoint = b.createElement('label', '# of Points: ');
        b.lblNoOfPoint.position(520,50);
        b.inpNoOfPoint = b.createInput(' ');
        b.inpNoOfPoint.position(b.lblNoOfPoint.x + b.lblNoOfPoint.width +5 , 50);
        b.inpNoOfPoint.size(50, 15);
        //display label and slider for the the learning rate of the perceptron
        b.lblsldrLr = b.createElement('label', 'Learning Rate: ');
        b.lblsldrLr.position(520,80);
        b.sldrLr = b.createSlider(0,10, 1);
        b.sldrLr.position(b.lblsldrLr.x + b.lblsldrLr.width +5 ,80);
        b.sldrLr.size(50, b.AUTO);
        b.sldrLr.input(b.getLearningRate);
        //display the value of the slider
        b.lblLr = b.createElement('label', '0');
        b.lblLr.position(b.sldrLr.x + b.sldrLr.width +8 ,80);
        //display the shpw points button, used to show the points on the screen before training
        b.btnShowPoints = b.createButton('Show Points');
        b.btnShowPoints.position(520,110);
        //function show points called when the button is pressed by user
        b.btnShowPoints.mousePressed(b.showPoint);
        //train button created to allow the user to start the training loop
        b.btnTrain = b.createButton('Train');
        b.btnTrain.position(b.btnShowPoints.x + b.btnShowPoints.width +5,110);
        //train points function called when user presses train button
        b.btnTrain.mousePressed(b.trainPoint);
    }
    /**
    Display Outputs function
        Displays the outputs from the training on screen
    */
    b.displayOutputs = function(){
        //creates heading for the outputs, position it on screen then hide it
        b.lblOutput = b.createElement('h3', 'Outputs: ');
        b.lblOutput.position(520,120);
        b.lblOutput.hide();
        //displays the accuracy with label, position both on screen relative to each other. then hide it
        b.lblAccuracy = b.createElement('label', 'Accuracy: ');
        b.lblAccuracy.position(520,260);
        b.lblAccuracy.hide();
        b.lblCurrAccuracy = b.createElement('label', '');
        b.lblCurrAccuracy.position(b.lblAccuracy.x + b.lblAccuracy.width +5,260);
        //display the current weights of connections along with labels for each
        b.lblWeightX1 = b.createElement('label', 'Weight Of Con(X1): ');
        b.lblWeightX1.position(520,160);
        b.lblWeightX1.hide();
        b.lblCurrWeightX1 = b.createElement('label', '');
        b.lblCurrWeightX1.position(520,185);
        b.lblWeightX2 = b.createElement('label', 'Weight Of Con(X2): ');
        b.lblWeightX2.position(520,210);
        b.lblWeightX2.hide();
        b.lblCurrWeightX2 = b.createElement('label', '');
        b.lblCurrWeightX2.position(520,235);
    }
    /**
    Show Predict Controls function
        displays the user controls to predict new points from train perceptron
    */
    b.showPredictControls = function(){
        //creates heading for predict controls for user
        b.lblPredict = b.createElement('h3', 'Predict Point: ');
        b.lblPredict.position(520,180);
        b.lblPredict.show();
        //creates inputs for both inputs x1 and x2 for the user to inputs between 0-500
        b.lblInputX1 = b.createElement('label', 'Input (X1): ');
        b.lblInputX1.position(520,225);
        b.lblInputX1.show();
        b.inpPredictX1 = b.createInput(' ');
        b.inpPredictX1.position(b.lblInputX1.x + b.lblInputX1.width +5 , 225);
        b.inpPredictX1.size(50, 15);
        b.inpPredictX1.show();
        b.lblInputX2 = b.createElement('label', 'Input (X2): ');
        b.lblInputX2.position(520,255);
        b.lblInputX2.show();
        b.inpPredictX2 = b.createInput(' ');
        b.inpPredictX2.position(b.lblInputX2.x + b.lblInputX2.width +5 , 255);
        b.inpPredictX2.size(50, 15);
        b.inpPredictX2.show();
        //creates button for the user to click and predict the inputted  values
        b.btnPredict = b.createButton('Predict');
        b.btnPredict.position(520,280);
        b.lblPredictOuput = b.createElement('label', 'Output: ');
        b.lblPredictOuput.position(520,315);
        b.lblPredictOuput.hide();
        b.predictOuput = b.createElement('label', '');
        b.predictOuput.position(b.lblPredictOuput.x + b.lblPredictOuput.width +5 , 315);
        b.predictOuput.show();
        //when the button is pressed the predict point function is called
        b.btnPredict.mousePressed(b.predictPoint);
        b.btnPredict.show();
    }
    /**
    Hide Predict Controls function
        hides the controls to predict a new point
    */
    b.hidePredictControls = function(){
        //hides all the labels and I/O functionality to do with predicting points
        //is called when the training has been started again after being stopped
        b.lblPredict.hide();
        b.lblInputX1.hide();
        b.inpPredictX1.hide();
        b.lblInputX2.hide();
        b.inpPredictX2.hide();
        b.lblPredictOuput.hide();
        b.predictOuput.hide();
        b.btnPredict.hide();
    }
    /**
    Predict Point function
        function to predict a set of x,y coordinates on the trained perceptron
    */
    b.predictPoint = function(){
        //inits the output to '' so that users can predict more than one point
        b.predictOuput.html('');
        //get the x,y coordinates from inputs
        b.predictX = parseInt(b.inpPredictX1.value());
        b.predictY = parseInt(b.inpPredictX2.value());
        //validation check to make sure inputs are numbers
        if(isNaN(b.predictX) && isNaN(b.predictY) || b.predictX > 500 && b.predictY > 500){
            //if not then the label of the input turns red and the input is emptied
            b.lblInputX1.style("color", "#B20000");
            b.inpPredictX1.value('');
            b.lblInputX2.style("color", "#B20000");
            b.inpPredictX2.value('');
        }else if(isNaN(b.predictX) || b.predictX > 500){
            //if not then the label of the input turns red and the input is emptied
            b.lblInputX1.style("color", "#B20000");
            b.inpPredictX1.value('');
        }else if(isNaN(b.predictY)|| b.predictY > 500){
            //if not then the label of the input turns red and the input is emptied
            b.lblInputX2.style("color", "#B20000");
            b.inpPredictX2.value('');
        }else{
            //changes the colour of label back to black
            b.lblInputX1.style("color", "#000000");
            b.lblInputX2.style("color", "#000000");
              //displays the predict outputs
            b.lblPredictOuput.show();
            b.predictOuput.show();
            //puts them into an array which is the format the predict funtion takes in the perceptron
            b.predictxy = [b.predictX, b.predictY];
            //calls the predict function in the perceptron with the users inputs and holds it within a variable
            b.prediction = b.perc.predict(b.predictxy);
            b.fill(30,144,255);
            b.stroke(1);
            b.ellipse(b.predictX, b.predictY, 8, 8);
            //ouputs the prediction to screen
            b.predictOuput.html('Class ' + b.prediction);
        }
    }
    /**
    Point function
        function used to create a point object
    */
    b.Point = function(){
        //generate a random point from 0-500 as this is the size of the coordinate plane - for both x and y
        this.x = b.random(500);
        this.y = b.random(500);
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
                b.fill(255);
            }else {
                //if -1 then the point is black
                b.fill(0);
            }
            //draw the circle for the point on screen
            b.ellipse(this.x,this.y,8,8);
        }
    }
}
let rndLinDemo = new p5(sketch);
