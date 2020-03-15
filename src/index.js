const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y
};

function eval(expr) {
    let stack = [];

    expr.forEach((token) => {
        if (token in operators) {
            let [y, x] = [stack.pop(), stack.pop()];
            if (token == '/' && y == 0) throw new Error("TypeError: Division by zero.");
            stack.push(operators[token](x, y));
        } else {
            stack.push(parseFloat(token));
        }
    });
    return stack.pop();
}

function expressionCalculator(expr) {
    expr = expr.split(/([\+\-\*\/\(\)]){1}/).filter(element => element != ' ');
    let stack = [];
    let output = [];

    expr.forEach(element => {
        if (element.trim() != '') {
            if (Number.isFinite(+element)) {
                output.push(+element);
            } else if (/[\+\*\/\-]/.test(element)) {
                while ((/[\+\-]/.test(element) && /[\*\/]/.test(stack[stack.length - 1])) || (/[\+\-]/.test(element) && /[\+\-]/.test(stack[stack.length - 1])) || (/[\*\/]/.test(element) && /[\*\/]/.test(stack[stack.length - 1])) && stack[stack.length - 1] != '(') {
                    output.push(stack.pop());
                }
                stack.push(element);
            } else if (element == '(') {
                stack.push(element);
            } else if (element == ')') {
                while (stack[stack.length - 1] != '(') {
                    if (stack.length == 0) throw new Error("ExpressionError: Brackets must be paired");
                    output.push(stack.pop());
                }
                if (stack[stack.length - 1] == '(') {
                    stack.pop();
                }
            }
        }
    })

    if (stack.length != 0) {
        stack.reverse().forEach(element => {
            if (element == '(' || element == ')') {
                throw new Error("ExpressionError: Brackets must be paired");
            } else {
                output.push(element);
            }

        })
    }
    return eval(output);
}

module.exports = {
    expressionCalculator
}