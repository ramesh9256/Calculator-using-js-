



let display = document.querySelector('.display input');
let buttons = document.querySelectorAll('button');

let ans = "";
const operators = ['+', '-', '*', '/']; // List of valid operators
let lastPressedEqual = false;  // Flag to check if '=' was pressed

buttons.forEach((ele) => {
    ele.addEventListener("click", () => {
        let character = ele.innerText;

        // If 'C' is pressed, clear the expression
        if (character == 'C') {
            ans = "0";
            character = '0'
            lastPressedEqual = false;  // Reset the flag
        }

        // If 'x' is pressed, replace it with '*' for multiplication
        if (character == 'x') {
            character = '*';
        }

        // If '=' is pressed, evaluate the expression and mark that '=' was pressed
        if (character == '=') {
            try {
                ans = eval(ans);
            } catch (error) {
                ans = "Error";  // Handle invalid expressions
            }
            lastPressedEqual = true;  // Set flag to true after '='
        }

        // If the user clicks an operator and the last input wasn't '=' or an operator
        else if (operators.includes(character)) {
            // Prevent consecutive operators
            if (operators.includes(ans[ans.length - 1])) {
                return; // Do nothing if the last character is an operator
            }
            ans += character;
            lastPressedEqual = false;  // Reset the flag after entering an operator
        }

        // For other numbers or characters
        else {
            if (lastPressedEqual) {
                ans = character;  // If '=' was pressed before, start a fresh expression
                lastPressedEqual = false;  // Reset the flag after starting fresh
            } else {
                if (ans === "0") {
                    ans = character; // Replace '0' with the first number clicked
                } else {
                    ans += character;
                }
            }
        }

        // Remove leading zero if the expression starts with it
        if (ans[0] == '0' && ans.length > 1) {
            ans = ans.slice(1);
        }

        // Update the display with the current expression or result
        display.value = ans;
    });
});

