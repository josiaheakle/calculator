

// TODO - if the window is resized, change the size of the string in the input div
function getMaxNum () {

    let max = 0;
    let mediaLen = document.body.clientWidth;
    let mediaTall = document.body.clientHeight;
    console.log(`mediaLen: ${mediaLen}`)
    console.log(`mediaTall: ${mediaTall}`)
    if(mediaLen >= 585) {
        max = 17;
    } else {
        max = 25;
    }
    if(mediaTall > 450 && mediaLen >= 585 && mediaLen < 700) {
        console.log(`tall`)
        max = 14;
    }

    return max;
}

// Add two numbers, return the sum
function add(num1, num2) {
    let result = num1 + num2;
    return result;
}

// Subtract two numbers, return the difference
function subtract(num1, num2) {
    let result = num1 - num2;
    return result;
}

// Multiply the two numbers, return the product
function multiply(num1, num2) {
    let result = num1 * num2;
    return result;
}

// Divide the two numbers, return the quotient
function divide(num1, num2) {
    let result = num1 / num2;
    return result;
}

// Take in number array (which only contains two numbers) and the operator
// If the second number is 0 and the function is division, return WRONG
// return the result of the proper function
function operate(numArray, operator) {

    let result =0;

    if(numArray.length == 1) {
        return numArray[0];
    } else {
        switch(operator) {
            case('+'):
                result = add(+numArray[0], +numArray[1]);
                break;
            case('-'):
                result = subtract(+numArray[0], +numArray[1]);
                break;
            case('×'):
                result = multiply(+numArray[0], +numArray[1]);
                break;
            case('÷'):
                result = divide(+numArray[0], +numArray[1]);
                break;
        }
    }
    return (Math.round(result*100000))/100000;

}

function calcScreen() {

    // Get input container from the html
    const inputDiv = document.querySelector('#input-container');


    // string to display in input-container
    let maxInputAmt = 0;
    
    let inputStr = '';

    // array of numbers and operator to be sent to operate();
    let numArray = [];
    let operator = '';

    // get all number buttons -
    // add event handler to check if the mouse is hovering over them
    // and to see if clicked - add the value to the display string
    // if 
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
            maxInputAmt = getMaxNum();

            if(inputStr.length < maxInputAmt) {
                if (btn.id == 'btndecimal') {
                    if(!inputStr.includes('.')) {
                        inputStr = `${inputStr}.`
                    } else  {
                        console.log(`already a decmial!`)
                    }
                } else {
                    inputStr = `${inputStr}${btn.textContent}`;
                }
            } else {
                console.log(`too many numbers!`)
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





            // if the all clear button is called, clear the operator, and the numbers
            if(btn.textContent == 'AC') {
                console.log(`ALL CLEAR`);
                inputStr = '';
                numArray = [];
                operator = '';
            } else if (btn.id == 'btnneg') {
                if(inputStr.includes('-')) {
                    console.log(`input string is neg alread!`)
                    inputStr = inputStr.slice(1, inputStr.length);
                } else {
                    console.log(`making input string negative now!`)
                    inputStr = `-${inputStr}`
                }
            } else if (btn.id == 'btnpercent') {
                inputStr = `${(+inputStr)/100}`;
            } else {

                // when any operator is called, and the input string is not empty,
                // add the input string to the num array
                if(inputStr != '') {
                    numArray.push(inputStr);
                    inputStr = '';
                }

                // if the button clicked is the equal button, 
                // if(btn.id==="btnequals") {
                console.log(numArray.length);
                if(numArray.length == 0) {
                    inputStr = '';
                } else if (numArray.length == 1) {
                    console.log(`one num`)
                    if(btn.id == 'btnequals') {
                        console.log(`equal for one num`)
                        inputStr = numArray[0];
                        numArray = [];
                    } else {
                        console.log(`numAmount: ${numArray.length}, operator: ${btn.textContent}`)
                        operator = btn.textContent;
                        inputStr = ''
                    }   
                } else if (numArray.length == 2) {
                    inputStr = `${operate(numArray, operator)}`;
                    numArray = [];
                    operator = '';
                } else {
                    console.log('what the hell how did we get here')
                }
            
                // if the button clicked is any other symbol button
                // } else {
                // }   
            }
            inputDiv.textContent = inputStr;
        });
    });

}


calcScreen();