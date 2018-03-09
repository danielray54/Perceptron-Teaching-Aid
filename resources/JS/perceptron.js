//Perceptron Class
class Perceptron{
    constructor(inputs, output, learning_rate=1, epoch=0){
        //
        this.inputs = inputs;
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
    }

    //method to generate random number between -1 and 1
    rand(){
        return Math.random() *2 -1;
    }
    //
    current_accuracy(){
        //
        return ((this.accuracy/this.samples)*100);
    }
    //
    activation_function(i){
        //
        if(i<0){
            return 0;
        }else{
            return 1;
        }
    }
    //
    guess(input){
        //
        let total = this.bias;
        //
        this.weights.forEach((w, index) => {total += input[index]*w });
        //
        return this.activation_function(total);
    }
    //
    learn(){
        //
        for(let n = 0; n < this.epoch; n++){
            //
            for(let i = 0; i < this.inputs.length; i++){
                let guess = this.guess(this.inputs[i]);
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
                    this.weights[y] += error * this.output[i][y] * this.learning_rate;
                }
                this.bias += error * this.learning_rate;
            }
            console.log(this.current_accuracy());
        }
    }
}
x = [[1,1,1], [0,0,1], [1,1,0], [0,0,1], [1,0,0]];
y = [1,0,0,0,1];
let p = new Perceptron(x, y, learning_rate = 0.2, epoch=1000);
p.learn();
