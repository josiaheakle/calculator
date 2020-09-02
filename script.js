// const btn1 = document.querySelector('#btn1');
// const btn2 = document.querySelector('#btn2');
// const btn3 = document.querySelector('#btn3');
// const btn4 = document.querySelector('#btn4');
// const btn5 = document.querySelector('#btn5');
// const btn6 = document.querySelector('#btn6');
// const btn7 = document.querySelector('#btn7');
// const btn8 = document.querySelector('#btn8');
// const btn9 = document.querySelector('#btn9');
// const btn0 = document.querySelector('#btn0');
// const btnEqual = document.querySelector('#btnequal');
// const btnPlus = document.querySelector('#btnplus');
// const btnMinus = document.querySelector('#btnminus');
// const btnMultiply = document.querySelector('#btntimes');
// const btnDivide = document.querySelector('#btndivide');

function add(num1, num2) {
    let result = num1 + num2;
    return result;
}

function subtract(num1, num2) {
    let result = num1 - num2;
    return result;
}

function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}

function divide(num1, num2) {
    let result = num1 / num2;
    return result;
}


// input an array of number strings and an array of operators to run the proper 
// function and return the value
function operate(numArray, opArray) {

    let result = 0;
    let opIndex = 0;
    let num1 = 0;
    let num2 = 0;

    // for the amount of number values, run the proper function
    for(let i=0; i<numArray.length; i++) {
        console.log(`num: ${numArray[i]}`);
        if(i == 0) {
            num1 = +numArray[i];
        } else {
            num2 = +numArray[i];
            console.log(`opArray[${opIndex}]: ${opArray[opIndex]}`);
            switch(opArray[opIndex++]) {
                case('+'):
                    num1 = add(num1, num2);
                    break;
                case('-'):
                    num1 = subtract(num1, num2);
                    break;
                case('÷'):
                    num1 = divide(num1, num2);
                    break;
                case('×'):
                    num1 = multiply(num1, num2);
                    break;
            }
        }
    } 
    result = Math.round(num1 * 10000) / 10000;
    return result;
}

function calcScreen() {

    const inputDiv = document.querySelector('#input-container');

    // string to display in input-container
    let inputStr = '';
    let numStr = '';
    // amount of numbers and operators 
    let numAmt = 0;
    let opAmt = 0;
    // array of numbers and operators to be sent to operate();
    let numArray = [];
    let opArray = [];

    // get all number buttons -
    // add event handler to check if the mouse is hovering over them
    // and to see if clicked - add the value to the display string
    const calcNumBtns = document.querySelectorAll('.btn-num');
    calcNumBtns.forEach(btn => {
        // change the color of the button if it is hovered over
        btn.onmouseover = function() {
            btn.style.backgroundColor = "lightgray";
        }
        btn.onmouseout = function() {
            btn.style.backgroundColor = "lightskyblue";
        }

        // add click event to each button
        btn.addEventListener('click', function() {
            
            if(btn.textContent == 'C') {
                // CLEAR BUTTON CLICK
                inputStr = '';
                numStr = '';
                numAmt = 0;;
                opAmt = 0;
                numArray = [];
                opArray = [];
            } else {
                // ANY NUMBER BUTTON CLICKED
                numStr = `${numStr}${btn.textContent}`;
                inputStr = `${inputStr}${btn.textContent}`;
            }

            // Print display value to inputdiv
            inputDiv.textContent = inputStr;
        });
    });

    const calcSymBtns = document.querySelectorAll('.btn-sym');
    calcSymBtns.forEach(btn => {
        // change the color of the button if it is hovered over
        btn.onmouseover = function() {
            btn.style.backgroundColor = "lightgray";
        }
        btn.onmouseout = function() {
            btn.style.backgroundColor = "lightblue";
        }


        // Add click event handler
        btn.addEventListener('click', function() {

            // when any operator is called, and the numStr is not empty,
            // add the number string to the num array
            if(numStr != '') {
                numArray.push(numStr);
                numStr = '';
            }

            // add the button value to the display value
            inputStr = `${inputStr}${btn.textContent}`;

            // if the button clicked is the equal button, 
            //  - if the num array is empty, reset the calculator
            //  - if the num array has values, but the oparray has none,
            //      show the value 
            //  - if the num array has values and the operator array has values, 
            //      call the operator functon and show the returned value
            if(btn.id==="btnequals") {
                console.log(numArray.length);
                if(numArray.length == 0) {
                    console.log('no numbers to operate on!');
                    inputStr = '';
                    numStr = '';
                    numAmt = 0;;
                    opAmt = 0;
                    numArray = [];
                    opArray = [];
                } else {
                    if(opArray.length != 0) {
                        inputStr = operate(numArray, opArray);
                        numStr = '';
                        numAmt = 0;
                        opAmt = 0;
                        numArray = [];
                        opArray = [];
                        numArray.push(inputStr);
                    } else {
                        inputStr = numArray[0];
                        numStr = '';
                        numAmt = 0;;
                        opAmt = 0;
                        numArray = [];
                        opArray = [];
                        numArray.push(inputStr);
                    }
                }
            } else {
                opArray.push(btn.textContent);
                console.log(`NUM [${numAmt}] : ${numArray[numAmt]}`);
                console.log(`OP [${opAmt}] : ${opArray[opAmt]}`)
                numStr = '';
                opAmt++;
                numAmt++;
            }
            inputDiv.textContent = inputStr;
            // console.log(`${inputStr}`);
        });
    });

}


calcScreen();

