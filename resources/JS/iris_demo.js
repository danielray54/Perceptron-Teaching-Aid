var sketch = function(c){
    c.points = [];
    c.output = [];
    c.WOC = [];
    c.tIndex = 0;

    c.preload = function(){
        c.table = c.loadTable('resources/Data/iris_dataset.csv', 'csv', 'header');
    }

    c.setup = function(){
        for(c.r = 0; c.r < c.table.getRowCount(); c.r++){
        c.sepal_Length =  c.table.getNum(c.r, 0);
        c.sepal_Width =  c.table.getNum(c.r, 1);
        c.petal_Length =  c.table.getNum(c.r, 2);
        c.petal_Width =  c.table.getNum(c.r, 3);
        c.output[c.r] = c.table.getNum(c.r, 5);
        c.points[c.r] = [c.sepal_Length, c.sepal_Width, c.petal_Length, c.petal_Width];
            }
         //create the canvas for the demo
        c.cnv = c.createCanvas(200,200);
        //put the canvas within a <div> in order to manage in the html code
        c.cnv.parent('irisDemo');
        //background colour white
        c.background(255);

        c.displayInputs();
        c.displayOutputs();
    }

    c.draw = function(){
        if(c.train == true){

    //init the training  data for each point - makes use of the draw loop
        c.traininginpt = c.points[c.tIndex];
        c.trainingoupt =  c.output[c.tIndex]
         //call the train function in the perceptron to update the WOC, using that points input array and desired output
        c.perc.train(c.traininginpt, c.trainingoupt);
        //set the current accuracy of the perceptron to variable
        c.accuracy = c.perc.current_accuracy();
        //only display 4 decimal places due to space
        c.accuracy = c.accuracy.toFixed(4);
        //set the variable to the current weight of connections
        c.WOC = c.perc.getWeights();
        //split the array into X1 and X2 weights
        c.weightOfConnectionX1 = c.WOC[0] ;
         //only display 4 decimal places due to space
        c.weightOfConnectionX1 = c.weightOfConnectionX1.toFixed(4);
         //split the array into X1 and X2 weights
        c.weightOfConnectionX2 = c.WOC[1] ;
         //only display 4 decimal places due to space
        c.weightOfConnectionX2 = c.weightOfConnectionX2.toFixed(4);
        c.weightOfConnectionX3 = c.WOC[2] ;
         //only display 4 decimal places due to space
        c.weightOfConnectionX3 = c.weightOfConnectionX3.toFixed(4);
         //split the array into X1 and X2 weights
        c.weightOfConnectionX4 = c.WOC[3] ;
         //only display 4 decimal places due to space
        c.weightOfConnectionX4 = c.weightOfConnectionX4.toFixed(4);
         //display the accuracy of the perceptron on screen
        c.lblCurrAccuracy.html(c.accuracy+"%");
         //display the current weights of connections
        c.lblCurrWeightX1.html(c.weightOfConnectionX1);
        c.lblCurrWeightX2.html(c.weightOfConnectionX2);
        c.lblCurrWeightX3.html(c.weightOfConnectionX3);
        c.lblCurrWeightX4.html(c.weightOfConnectionX4);
         //increment the index to move to next point
        c.tIndex++;
         //if reached the end of the points start again
        if (c.tIndex == c.points.length) {
            c.tIndex = 0;
            }
        }
    }

    c.trainPoint = function(){
        c.learnRate = parseFloat(c.learnRate);
        if(isNaN(c.learnRate)){
            c.lblsldrLr.style("color", "#B20000");
        }else{
            c.lblsldrLr.style("color", "#000000");
            c.perc = new Perceptron(4, c.learnRate);
            //boolean to start the training loop
            c.train = true;
            //create a stop button - helpful to stop the loop and explain whats going on
            c.btnStop = c.createButton('Stop');
            //positioning of that button in relation the the train button
            c.btnStop.position(c.btnTrain.x + c.btnTrain.width +5,75);
            //function to execute when the stop button is pressed by user
            c.btnStop.mousePressed(c.stopTraining);
            //show the output values generated from the training
            //first display the labels as to let the user know what they are looking at
            c.lblOutput.show();
            c.lblAccuracy.show();
            c.lblWeightX1.show();
            c.lblCurrWeightX1.show();
            c.lblWeightX2.show();
            c.lblCurrWeightX2.show();
            c.lblWeightX3.show();
            c.lblCurrWeightX3.show();
            c.lblWeightX4.show();
            c.lblCurrWeightX4.show();
            //displays the accuracy of the perceptron along with the position on screen
            c.lblAccuracy.position(10,220);
            c.lblCurrAccuracy.position(lblAccuracy.x + c.lblAccuracy.width +5,220);
            //call back function to hide the predict controls if the user decides to continue the training loop
            c.hidePredictControls();
        }
    }
    /**
    Stop Training function
        code runs if the stop button is pressed by a user
    */
    c.stopTraining = function(){
        //bool to stop the training loop in the draw function
        c.train = false;
        //hide all the information that is unneccesary when the perceptron is training
        c.lblWeightX1.hide();
        c.lblCurrWeightX1.hide();
        c.lblWeightX2.hide();
        c.lblCurrWeightX2.hide();
        c.lblWeightX3.hide();
        c.lblCurrWeightX3.hide();
        c.lblWeightX4.hide();
        c.lblCurrWeightX4.hide();
        //move the accuracy back to the position it was before
        c.lblAccuracy.position(10,130);
        c.lblCurrAccuracy.position(c.lblAccuracy.x + c.lblAccuracy.width +5,130);
        //call back to show the predict controls - to allow the user to predict a new point with an unknown output
        c.showPredictControls();
    }
    /**
    Get Learning Rate function
       used to manipulate the slider input to get the correct format
    */
    c.getLearningRate = function(){
        c.learnRate = this.value()/10;
        //display the learning rate to the user as the slider doesnt show it
        c.lblLr.html(c.learnRate);
    }
    /**
    Display Inputs function
        code to display inputs when the demo loads
    */
    c.displayInputs = function(){
        //create heading for users benefit
        c.lblControls = c.createElement('h3', 'Controls: ');
        //position on top of demo
        c.lblControls.position(10,0);
        //display label and slider for the the learning rate of the perceptron
        c.lblsldrLr = c.createElement('label', 'Learning Rate: ');
        c.lblsldrLr.position(10,45);
        c.sldrLr = c.createSlider(0,10, 1);
        c.sldrLr.position(c.lblsldrLr.x + c.lblsldrLr.width +5 ,45);
        c.sldrLr.size(50, c.AUTO);
        c.sldrLr.input(c.getLearningRate);
        //display the value of the slider
        c.lblLr = c.createElement('label', '0');
        c.lblLr.position(c.sldrLr.x + c.sldrLr.width +8 ,45);
        //train button created to allow the user to start the training loop
        c.btnTrain = c.createButton('Train');
        c.btnTrain.position(10,75);
        //train points function called when user presses train button
        c.btnTrain.mousePressed(c.trainPoint);
    }

    c.displayOutputs = function(){
        //creates heading for the outputs, position it on screen then hide it
        c.lblOutput = c.createElement('h3', 'Outputs: ');
        c.lblOutput.position(10,90);
        c.lblOutput.hide();
        //displays the accuracy with label, position both on screen relative to each other. then hide it
        c.lblAccuracy = c.createElement('label', 'Accuracy: ');
        c.lblAccuracy.position(10,220);
        c.lblAccuracy.hide();
        c.lblCurrAccuracy = c.createElement('label', '');
        c.lblCurrAccuracy.position(c.lblAccuracy.x + c.lblAccuracy.width +5,220);
        //display the current weights of connections along with labels for each
        c.lblWeightX1 = c.createElement('label', 'Weight Of Con (Sepal Length): ');
        c.lblWeightX1.position(10,140);
        c.lblWeightX1.hide();
        c.lblCurrWeightX1 = c.createElement('label', '');
        c.lblCurrWeightX1.position(c.lblWeightX1.x + c.lblWeightX1.width+5 ,140);
        c.lblWeightX2 = c.createElement('label', 'Weight Of Con (Sepal Width): ');
        c.lblWeightX2.position(10,160);
        c.lblWeightX2.hide();
        c.lblCurrWeightX2 = c.createElement('label', '');
        c.lblCurrWeightX2.position(c.lblWeightX2.x + c.lblWeightX2.width+5 ,160);
        c.lblWeightX3 = c.createElement('label', 'Weight Of Con (Petal Length): ');
        c.lblWeightX3.position(10,180);
        c.lblWeightX3.hide();
        c.lblCurrWeightX3 = c.createElement('label', '');
        c.lblCurrWeightX3.position(c.lblWeightX3.x + c.lblWeightX3.width+5 ,180);
        c.lblWeightX4 = c.createElement('label', 'Weight Of Con (Petal Width): ');
        c.lblWeightX4.position(10,200);
        c.lblWeightX4.hide();
        c.lblCurrWeightX4 = c.createElement('label', '');
        c.lblCurrWeightX4.position(c.lblWeightX4.x + c.lblWeightX4.width+5 ,200);
    }
    /**
    Show Predict Controls function
         displays the user controls to predict new points from train perceptron
    */
    c.showPredictControls = function(){
        //creates heading for predict controls for user
        c.lblPredict = c.createElement('h3', 'Predict Point: ');
        c.lblPredict.position(250,0);
        c.lblPredict.show();
        //creates inputs for both inputs x1 and x2 for the user to inputs between 0-500
        c.lblInputX1 = c.createElement('label', 'Sepal Length: ');
        c.lblInputX1.position(250,40);
        c.lblInputX1.show();
        c.inpPredictX1 = c.createInput(' ');
        c.inpPredictX1.position(c.lblInputX1.x + c.lblInputX1.width +5, 40);
        c.inpPredictX1.size(50, 20);
        c.inpPredictX1.show();
        c.lblInputX2 = c.createElement('label', 'Sepal Width: ');
        c.lblInputX2.position(250,70);
        c.lblInputX2.show();
        c.inpPredictX2 = c.createInput(' ');
        c.inpPredictX2.position(c.lblInputX2.x + c.lblInputX2.width +5, 70);
        c.inpPredictX2.size(50, 20);
        c.inpPredictX2.show();
        c.lblInputX3 = c.createElement('label', 'Petal Length: ');
        c.lblInputX3.position(250,100);
        c.lblInputX3.show();
        c.inpPredictX3 = c.createInput(' ');
        c.inpPredictX3.position(c.lblInputX2.x + c.lblInputX2.width +5, 100);
        c.inpPredictX3.size(50, 20);
        c.inpPredictX3.show();
        c.lblInputX4 = c.createElement('label', 'Petal Width: ');
        c.lblInputX4.position(250,130);
        c.lblInputX4.show();
        c.inpPredictX4 = c.createInput(' ');
        c.inpPredictX4.position(c.lblInputX2.x + c.lblInputX2.width +5 , 130);
        c.inpPredictX4.size(50, 20);
        c.inpPredictX4.show();
        //creates button for the user to click and predict the inputted  values
        c.btnPredict = c.createButton('Predict');
        c.btnPredict.position(250,160);
        c.lblPredictOuput = c.createElement('label', 'Output: ');
        c.lblPredictOuput.position(250,190);
        c.lblPredictOuput.hide();
        c.predictOuput = c.createElement('label', '');
        c.predictOuput.position(c.lblPredictOuput.x + c.lblPredictOuput.width +5 , 190);
        c.predictOuput.show();
        //when the button is pressed the predict point function is called
        c.btnPredict.mousePressed(c.predictPoint);
        c.btnPredict.show();
    }
    /**
    Hide Predict Controls function
        hides the controls to predict a new point
     */
    c.hidePredictControls = function(){
        //hides all the labels and I/O functionality to do with predicting points
        //is called when the training has been started again after being stopped
        c.lblPredict.hide();
        c.lblInputX1.hide();
        c.inpPredictX1.hide();
        c.lblInputX2.hide();
        c.inpPredictX2.hide();
        c.lblInputX3.hide();
        c.inpPredictX3.hide();
        c.lblInputX4.hide();
        c.inpPredictX4.hide();
        c.lblPredictOuput.hide();
        c.predictOuput.hide();
        c.btnPredict.hide();
    }
    /**
    Predict Point function
        function to predict a set of x,y coordinates on the trained perceptron
    */
    c.predictPoint = function(){
        //inits the output to '' so that users can predict more than one point
        c.predictOuput.html('');
        //get the x,y coordinates from inputs
        c.predictX1 = parseFloat(c.inpPredictX1.value());
        c.predictX2 = parseFloat(c.inpPredictX2.value());
        c.predictX3 = parseFloat(c.inpPredictX3.value());
        c.predictX4 = parseFloat(c.inpPredictX4.value());
        //validation check to make sure inputs are numbers
        switch(isNaN(c.predictX1)) {
            case true:
                c.lblInputX1.style("color", "#B20000");
                c.inpPredictX1.value('');
                c.validX1 = false;
                break;
            case false:
                c.validX1 = true;
                break;
        }
         switch(isNaN(c.predictX2)) {
            case true:
                c.lblInputX2.style("color", "#B20000");
                c.inpPredictX2.value('');
                c.validX2 = false;
                break;
            case false:
                c.validX2 = true;
                break;
        }
         switch(isNaN(c.predictX3)) {
            case true:
                c.lblInputX3.style("color", "#B20000");
                c.inpPredictX3.value('');
                c.validX3 = false;
                break;
            case false:
                c.validX3 = true;
                break;
        } switch(isNaN(c.predictX4)) {
            case true:
                c.lblInputX4.style("color", "#B20000");
                c.inpPredictX4.value('');
                c.validX4 = false;
                break;
            case false:
                c.validX4 = true;
                break;
        }
        if(c.validX1 === true && c.validX2 === true && c.validX3 === true && c.validX4 === true){
            //changes the colour of label back to black
            c.lblInputX1.style("color", "#000000");
            c.lblInputX2.style("color", "#000000");
            c.lblInputX3.style("color", "#000000");
            c.lblInputX4.style("color", "#000000");
              //displays the predict outputs
            c.lblPredictOuput.show();
            c.predictOuput.show();
            //puts them into an array which is the format the predict funtion takes in the perceptron
            c.predictPoint = [c.predictX1, c.predictX2, c.predictX3, c.predictX4];
            //calls the predict function in the perceptron with the users inputs and holds it within a variable
            c.prediction = c.perc.predict(c.predictPoint);
            if(c.prediction === 1){
                c.predOutput = "Iris Setosa";
            }else{
                c.predOutput = "Iris Versicolor or Iris Virginica";
            }
            //ouputs the prediction to screen
            c.predictOuput.html(c.predOutput);
        }
    }
}
let irisDemo = new p5(sketch);
