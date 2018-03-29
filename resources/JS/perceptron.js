function Perceptron(input, learning_rate){
        this.NoOfInputs = input;
        //init learning rate
        this.learning_rate = learning_rate;
        //
        this.accuracy = 0;
        //
        this.samples = 0;
        //
        this.bias = 1;
        //create array to store weights of connections for each input variable
        this.weights = [];
        //initilises each weight of connection with a random number between -1 and 1
        for (let i=0; i<this.NoOfInputs; i++){
            this.weights[i] = Math.random() * 2 -1;
        }
    }
    Perceptron.prototype.activation_function = function(total){
        if(total >=0){
            return 1;
        }else{
            return -1;
        }
    }

    Perceptron.prototype.getWeights = function() {
        return this.weights;
    }
      /**
    Current Accuracy function
        -returns the accuracy of the percpetron
    */
    Perceptron.prototype.current_accuracy = function(accuracy, samples){
        //divides the number of correct predictions with the total amount of predictions within training phase
        return ((this.accuracy/this.samples)*100);
    }
	Perceptron.prototype.summation = function(inputs) {
		var sum = 0;
        sum = this.bias;
		for (var i = 0; i < this.weights.length; i++) {
			sum += inputs[i]*this.weights[i];
		}

		return this.activation_function(sum); // output
	}
	Perceptron.prototype.train = function(inputs, target) {
		var guess = this.summation(inputs);
		var error = target - guess;
         if(target == guess){
                    this.accuracy += 1;
                }else{
                    this.accuracy -= 1;
                }
            this.samples ++;
		for (var i = 0; i < this.weights.length; i++) {
			this.weights[i] += this.learning_rate * error * inputs[i];
		}
        this.bias += error * this.learning_rate;
       // console.log(target + " " + guess);
        //console.log(this.current_accuracy());
	}



    Perceptron.prototype.predict = function(p_input){
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
            //passes the total through the activation function which returns either 1 or -1
         return this.activation_function(total);
    }
