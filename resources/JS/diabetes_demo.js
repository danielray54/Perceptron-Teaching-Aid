var sketch = function(e){
    e.points = [];
    e.output = [];
    e.WOC = [];
    e.tIndex = 0;

    e.preload = function(){
        e.table = e.loadTable('resources/Data/diabetes.csv', 'csv', 'header');
    }

    e.setup = function(){
        for (e.r = 0; e.r < e.table.getRowCount(); e.r++){
            e.pregrancies =  e.table.getNum(e.r, 0);
            e.glucose =  e.table.getNum(e.r, 1);
            e.blood_pressure =  e.table.getNum(e.r, 2);
            e.skin_thickness = e.table.getNum(e.r, 3);
            e.insulin =  e.table.getNum(e.r, 4);
            e.bmi =  e.table.getNum(e.r, 5);
            e.dpf =  e.table.getNum(e.r, 6);
            e.age =  e.table.getNum(e.r, 7);
            e.output[e.r] = e.table.getNum(e.r, 8);
            e.points[e.r] = [e.pregrancies, e.glucose, e.blood_pressure, e.skin_thickness, e.insulin, e.bmi, e.dpf, e.age];
        }
        //create the canvas for the demo
        e.cnv = e.createCanvas(400,300);
        //put the canvas within a <div> in order to manage in the html code
        e.cnv.parent('diabetesDemo');
        //background colour white
        e.background(255);
        e.displayInputs();
        e.displayOutputs();
    }
    e.draw = function(){
        if(e.train == true){
            //init the training  data for each point - makes use of the draw loop
            e.traininginpt = e.points[e.tIndex];
            e.trainingoupt = e.output[e.tIndex]
             //call the train function in the perceptron to update the WOC, using that points input array and desired output
            e.perc.train(e.traininginpt, e.trainingoupt);
            //set the current accuracy of the perceptron to variable
            e.accuracy = e.perc.current_accuracy();
            //only display 4 decimal places due to space
            e.accuracy = e.accuracy.toFixed(4);
            //set the variable to the current weight of connections
            e.WOC = e.perc.getWeights();
            //split the array into X1 and X2 weights
            e.weightOfConnectionX1 = e.WOC[0] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX1 = e.weightOfConnectionX1.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX2 = e.WOC[1] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX2 = e.weightOfConnectionX2.toFixed(4);
            e.weightOfConnectionX3 = e.WOC[2] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX3 = e.weightOfConnectionX3.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX4 = e.WOC[3] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX4 = e.weightOfConnectionX4.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX5 = e.WOC[4] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX5 = e.weightOfConnectionX5.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX6 = e.WOC[5] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX6 = e.weightOfConnectionX6.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX7 = e.WOC[6] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX7 = e.weightOfConnectionX7.toFixed(4);
             //split the array into X1 and X2 weights
            e.weightOfConnectionX8 = e.WOC[7] ;
             //only display 4 decimal places due to space
            e.weightOfConnectionX8 = e.weightOfConnectionX8.toFixed(4);

             //display the accuracy of the perceptron on screen
            e.lblCurrAccuracy.html(e.accuracy+"%");
             //display the current weights of connections
            e.lblCurrWeightX1.html(e.weightOfConnectionX1);
            e.lblCurrWeightX2.html(e.weightOfConnectionX2);
            e.lblCurrWeightX3.html(e.weightOfConnectionX3);
            e.lblCurrWeightX4.html(e.weightOfConnectionX4);
            e.lblCurrWeightX5.html(e.weightOfConnectionX5);
            e.lblCurrWeightX6.html(e.weightOfConnectionX6);
            e.lblCurrWeightX7.html(e.weightOfConnectionX7);
            e.lblCurrWeightX8.html(e.weightOfConnectionX8);
             //increment the index to move to next point
            e.tIndex++;
             //if reached the end of the points start again
            if (e.tIndex == e.points.length) {
                e.tIndex = 0;
            }
        }
    }
    e.trainPoint = function(){
        e.learnRate = parseFloat(e.learnRate);
        if(isNaN(e.learnRate)){
            e.lblsldrLr.style("color", "#B20000");
        }else{
            e.lblsldrLr.style("color", "#000000");
        e.perc = new Perceptron(8, e.learnRate);
        //boolean to start the training loop
        e.train = true;
        //create a stop button - helpful to stop the loop and explain whats going on
        e.btnStop = e.createButton('Stop');
        //positioning of that button in relation the the train button
        e.btnStop.position(e.btnTrain.x + e.btnTrain.width +5,75);
        //function to execute when the stop button is pressed by user
        e.btnStop.mousePressed(e.stopTraining);
        //show the output values generated from the training
        //first display the labels as to let the user know what they are looking at
        e.lblOutput.show();
        e.lblAccuracy.show();
        e.lblWeightX1.show();
        e.lblCurrWeightX1.show();
        e.lblWeightX2.show();
        e.lblCurrWeightX2.show();
        e.lblWeightX3.show();
        e.lblCurrWeightX3.show();
        e.lblWeightX4.show();
        e.lblCurrWeightX4.show();
        e.lblWeightX5.show();
        e.lblCurrWeightX5.show();
        e.lblWeightX6.show();
        e.lblCurrWeightX6.show();
        e.lblWeightX7.show();
        e.lblCurrWeightX7.show();
        e.lblWeightX8.show();
        e.lblCurrWeightX8.show();
        //displays the accuracy of the perceptron along with the position on screen
        e.lblAccuracy.position(10,300);
        e.lblCurrAccuracy.position(e.lblAccuracy.x + e.lblAccuracy.width +5,300);
        }
    }
    /**
    Stop Training function
        code runs if the stop button is pressed by a user
    */
    e.stopTraining = function(){
        //bool to stop the training loop in the draw function
        e.train = false;
        //hide all the information that is unneccesary when the perceptron is training
        e.lblWeightX1.hide();
        e.lblCurrWeightX1.hide();
        e.lblWeightX2.hide();
        e.lblCurrWeightX2.hide();
        e.lblWeightX3.hide();
        e.lblCurrWeightX3.hide();
        e.lblWeightX4.hide();
        e.lblCurrWeightX4.hide();
        e.lblWeightX5.hide();
        e.lblCurrWeightX5.hide();
        e.lblWeightX6.hide();
        e.lblCurrWeightX6.hide();
        e.lblWeightX7.hide();
        e.lblCurrWeightX7.hide();
        e.lblWeightX8.hide();
        e.lblCurrWeightX8.hide();
        //move the accuracy back to the position it was before
        e.lblAccuracy.position(10,130);
        e.lblCurrAccuracy.position(e.lblAccuracy.x + e.lblAccuracy.width +5,130);
    }
    /**
    Get Learning Rate function
        used to manipulate the slider input to get the correct format
    */
    e.getLearningRate = function(){
        e.learnRate = this.value()/10;
        //display the learning rate to the user as the slider doesnt show it
        e.lblLr.html(e.learnRate);
    }
    /**
    Display Inputs function
        code to display inputs when the demo loads
    */
    e.displayInputs = function(){
        //create heading for users benefit
        e.lblControls = e.createElement('h3', 'Controls: ');
        //position on top of demo
        e.lblControls.position(10,0);
        //display label and slider for the the learning rate of the perceptron
        e.lblsldrLr = e.createElement('label', 'Learning Rate: ');
        e.lblsldrLr.position(10,45);
        e.sldrLr = e.createSlider(0,10, 1);
        e.sldrLr.position(e.lblsldrLr.x + e.lblsldrLr.width +5 ,45);
        e.sldrLr.size(50, e.AUTO);
        e.sldrLr.input(e.getLearningRate);
        //display the value of the slider
        e.lblLr = e.createElement('label', '0');
        e.lblLr.position(e.sldrLr.x + e.sldrLr.width +8 ,45);
        //train button created to allow the user to start the training loop
        e.btnTrain = e.createButton('Train');
        e.btnTrain.position(10,75);
        //train points function called when user presses train button
        e.btnTrain.mousePressed(e.trainPoint);
    }
    /**
    Display Outputs function
        Displays the outputs from the training on screen
    */
    e.displayOutputs = function(){
        //creates heading for the outputs, position it on screen then hide it
        e.lblOutput = e.createElement('h3', 'Outputs: ');
        e.lblOutput.position(10,90);
        e.lblOutput.hide();
        //displays the accuracy with label, position both on screen relative to each other. then hide it
        e.lblAccuracy = e.createElement('label', 'Accuracy: ');
        e.lblAccuracy.position(10,320);
        e.lblAccuracy.hide();
        e.lblCurrAccuracy = e.createElement('label', '');
        e.lblCurrAccuracy.position(e.lblAccuracy.x + e.lblAccuracy.width +5,320);
        //display the current weights of connections along with labels for each
        e.lblWeightX1 = e.createElement('label', 'Weight Of Con (Pregancies): ');
        e.lblWeightX1.position(10,140);
        e.lblWeightX1.hide();
        e.lblCurrWeightX1 = e.createElement('label', '');
        e.lblCurrWeightX1.position(e.lblWeightX1.x + e.lblWeightX1.width+5 ,140);
        e.lblWeightX2 = e.createElement('label', 'Weight Of Con (Glucose): ');
        e.lblWeightX2.position(10,160);
        e.lblWeightX2.hide();
        e.lblCurrWeightX2 = e.createElement('label', '');
        e.lblCurrWeightX2.position(e.lblWeightX2.x + e.lblWeightX2.width+5 ,160);
        e.lblWeightX3 = e.createElement('label', 'Weight Of Con (Blood Pressure): ');
        e.lblWeightX3.position(10,180);
        e.lblWeightX3.hide();
        e.lblCurrWeightX3 = e.createElement('label', '');
        e.lblCurrWeightX3.position(e.lblWeightX3.x + e.lblWeightX3.width+5 ,180);
        e.lblWeightX4 = e.createElement('label', 'Weight Of Con (Skin Thickness): ');
        e.lblWeightX4.position(10,200);
        e.lblWeightX4.hide();
        e.lblCurrWeightX4 = e.createElement('label', '');
        e.lblCurrWeightX4.position(e.lblWeightX4.x + e.lblWeightX4.width+5 ,200);
        e.lblWeightX5 = e.createElement('label', 'Weight Of Con (Insulin): ');
        e.lblWeightX5.position(10,220);
        e.lblWeightX5.hide();
        e.lblCurrWeightX5 = e.createElement('label', '');
        e.lblCurrWeightX5.position(e.lblWeightX5.x + e.lblWeightX5.width+5 ,220);
        e.lblWeightX6 = e.createElement('label', 'Weight Of Con (BMI): ');
        e.lblWeightX6.position(10,240);
        e.lblWeightX6.hide();
        e.lblCurrWeightX6 = e.createElement('label', '');
        e.lblCurrWeightX6.position(e.lblWeightX6.x + e.lblWeightX6.width+5 ,240);
        e.lblWeightX7 = e.createElement('label', 'Weight Of Con (Diabetes Prediction Function): ');
        e.lblWeightX7.position(10,260);
        e.lblWeightX7.hide();
        e.lblCurrWeightX7 = e.createElement('label', '');
        e.lblCurrWeightX7.position(e.lblWeightX7.x + e.lblWeightX7.width+5 ,260);
        e.lblWeightX8 = e.createElement('label', 'Weight Of Con (Age): ');
        e.lblWeightX8.position(10,280);
        e.lblWeightX8.hide();
        e.lblCurrWeightX8 = e.createElement('label', '');
        e.lblCurrWeightX8.position(e.lblWeightX8.x + e.lblWeightX8.width+5 ,280);
    }
}
let diabetesDemo = new p5(sketch);
