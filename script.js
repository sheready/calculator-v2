// // global variables
// let marks = 20

// // arguments -> this is a variable that is passed inside a function

// // function declaration
// function myClass(marks1, marks2){
//     console.log(marks1 + marks2)
// }

// // invoking or calling a function
// myClass(30,20)

// // function expression

// let myClass2 = function(){
//   // local variable
//   let score = 20
//   console.log(score * marks)
// }

// myClass2()


// // arrow function

// let myclass3 = (grades) => {
//     grades = 60
//     console.log(grades / marks)
// }

// myclass3()

// // class syntax

//created an object known as Car that has two properties model & engine
// class Car{
//     // always add a method known as a constructor
//     constructor(model, engine, color){
//         this.model = model;
//         this.engine = engine;
//         this.color = color;
//     }
// }

// const subaru = new Car("Forester", "2000cc","red");
// let rangeRover = new Car("Discovery", "3000cc");
// console.log(rangeRover);

// rangeRover['color'] = 'gray'

// console.log(rangeRover);


class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperandElement = previousOperand;
        this.currentOperandElement = currentOperand;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        
        this.currentOperand = this.currentOperand.toString() + number.toString()
     }
     //60.1

     chooseOperation(operation){
        if(this.currentOperand === '')return
            if(this.previousOperand !== ''){
                return this.compute()
            }
            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
     }

     compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '\u00F7':
                computation = prev / current;
                break;
            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
     }

     //.52 [undefined, '52'] => ['','52'] => ['1' ,'52'] => [1.0, '52'] => [1, '52'] => [1, 52]
     getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
    }

    updateDisplay(){
        console.log(this.currentOperandElement)
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandElement.innerText = ''
        }
    }


}

document.addEventListener('DOMContentLoaded', function(){
    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperand = document.querySelector('[data-previous-operand]')
    const currentOperand = document.querySelector('[data-current-operand]')

    const calculator = new Calculator(previousOperand, currentOperand)

    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {
          calculator.appendNumber(button.innerText)
          calculator.updateDisplay()
        })
      })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(button.innerText)
            calculator.chooseOperation(button.innerText)

            calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button =>{
        calculator.delete()
        calculator.updateDisplay()
    })

    allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    })


 

})





