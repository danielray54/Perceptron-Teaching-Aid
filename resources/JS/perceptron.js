/**
PERCEPTRON CLASS
    Daniel Ray - 201024489
    Web-Based Teaching Aid to Demonstrate the Perceptron Algorithm
    University of Liverpool - 2018
*/
    /**
    Perceptron function
        -initilises the perceptron and generates random weights of connections
    */
    function Perceptron(inputs, output, learning_rate){
        //initilises input array
        this.inputs = inputs;
        console.log(inputs);
        //initilises taarget output array
        this.output = output;
        console.log(output);
        //init learning rate
        this.learning_rate = learning_rate;
        //
        this.accuracy = 0;
        //
        this.samples = 0;
        //
        this.bias = 1;
        //create array to store weights of connections for each input variable
        this.weights = new Array(inputs[0].length);
        //initilises each weight of connection with a random number between -1 and 1
        for (let i=0; i<inputs[0].length; i++){
            this.weights[i] = Math.random() * 2 -1;
        }
    }
    /**
    Current Accuracy function
        -returns the accuracy of the percpetron
    */
    Perceptron.prototype.current_accuracy = function(accuracy, samples){
        //divides the number of correct predictions with the total amount of predictions within training phase
        return ((this.accuracy/this.samples)*100);
    }
    /**

    */
    Perceptron.prototype.activation_function = function(total){
        if(total >0){
            return 1;
        }else{
            return -1;
        }
    }
     /**
    Get Weights function
        -a function to get the weight of connections for the perceptron
    */
    Perceptron.prototype.getWeights = function() {
        return this.weights;
    }
    /**

    */
    Perceptron.prototype.summation = function(input){
        //
        let total = 0;
        total = this.bias;
        //
        for (var i = 0; i < this.weights.length; i++) {
            total += input[i] * this.weights[i];
        }
        //
        return this.activation_function(total);
    }
    /**

    */
    Perceptron.prototype.train = function(){

        //
            for(let i = 0; i < this.inputs.length; i++){
                //
                let guess = this.summation(this.inputs[i]);
                console.log("Input: " + i);
                console.log("Expected: " + this.output[i] + " Model Output: " + guess);
                //
                if(this.output[i] == guess){
                    this.accuracy += 1;
                }else{
                    this.accuracy -= 1;
                }
                //
                this.samples ++;
                console.log(this.getWeights());
                //calc error by subtracting the desired output by the guess of the perceptron
                let error = this.output[i] - guess;
                //loop which updates the weight of connections
                for(let y = 0; y < this.weights.length; y++){
                    //new weight of connection is computed by multiplying the weight by the learning rate, error and desired output
                    this.weights[y] += this.learning_rate * error * this.inputs[i][y];
                }
                this.bias += error * this.learning_rate;


            }
               console.log("Accuracy: " + this.current_accuracy());
        }
    /**
    Predict function
        -predicts the class of a new point using a the trained perceptron
    */
    Perceptron.prototype.guess = function(p_input){
        //optimal weights of connections
        opt_weights = this.getWeights();
        // init total variable
        let total = 0;
        total = this.bias;
        //for loop that goes through each weight of connection
        for (var i = 0; i < opt_weights.length; i++) {
            //sums up the weighted inputs
            total += p_input[i] * opt_weights[i];
        }
        //
           console.log(this.activation_function(total));
            //passes the total through the activation function which returns either 1 or -1
         return this.activation_function(total);
    }
//TESTS
//x = [[32,23], [65,72], [25,12]];
//y = [1,-1,1];
//let p = new Perceptron(x, y, learning_rate = 0.1);
//p.train();
//p.guess([60,80]);
//p.guess([23,13]);
