//Perceptron Class

    function Perceptron(inputs, output, learning_rate=1, epoch=0){
        //
        this.inputs = inputs;
        console.log(inputs);
        this.output = output;
        this.learning_rate = learning_rate;
        this.epoch = epoch;
        //
        this.accuracy = 0;
        //
        this.samples = 0;
        //
        this.bias = 0;
        //create array to store weights of connections for each input variable
        this.weights = new Array(inputs[0].length);
        //initilises each weight of connection with a random number between -1 and 1
        for (let i=0; i<inputs[0].length; i++){
            this.weights[i] = this.rand();
        }
        console.log(this.weights);
    }

    //method to generate random number between -1 and 1
    Perceptron.prototype.rand = function() {
        return Math.random() *2 -1;
    }
    //
    Perceptron.prototype.current_accuracy = function(accuracy, samples){
        //
        return ((this.accuracy/this.samples)*100);
    }
    //
    Perceptron.prototype.activation_function = function(total){
        TODO FIX FOR -1 AND 1
        if(total <= 0){
            return -1;
        }else{
            return 1;
        }
    }
    //
    Perceptron.prototype.summation = function(input){
        //
        let total = this.bias;
        //
        for (var i = 0; i < this.weights.length; i++) {
            total += input[i] * this.weights[i];
        }
        //
        return this.activation_function(total);
    }
    //
    Perceptron.prototype.train = function(inputs, output){
        //
        for(let n = 0; n < this.epoch; n++){
            console.log("Epoch: " + n);
            //
            for(let i = 0; i < this.inputs.length; i++){
                let guess = this.summation(this.inputs[i]);
                console.log("Input: " + i);
                console.log("Expected: " + this.output[i] + " Model Output: " + guess);

                if(this.output[i] = guess){
                    this.accuracy += 1;
                }else{
                    this.accuracy -= 1;
                }

                this.samples ++;

                //calc error
                let error = this.output[i] - guess;
                //
                for(let y = 0; y < this.weights.length; y++){
                    this.weights[y] += this.learning_rate * error * this.output[i][y];

                }
                this.bias += error * this.learning_rate;
            console.log("Ac" + this.accuracy);
            console.log("Samples: " + this.samples);
            console.log("Accuracy: " + this.current_accuracy());
            }
        }
    }
x = [[1,1,1], [0,0,1], [1,1,0]];
y = [-1,1,-1];
let p = new Perceptron(x, y, learning_rate = 0.000001, epoch=10);
p.train(x, y);
