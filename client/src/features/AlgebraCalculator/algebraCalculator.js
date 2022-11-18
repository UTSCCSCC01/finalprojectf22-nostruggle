function formatPrior(section) {
  //Replace all spaces
  section = section.replaceAll(" ", "");
  return section;
}

function brackets(expression) {

  //Determining left-innermost pair of brackets, and evaluating the contents
  var inner_left;
  var inner_right;
  for (var i = 0; i < expression.length; i++) {
    if (expression[i] == '(') {
      inner_left = i;
    }
    if (expression[i] == ')') {
      inner_right = i;
      break;
    }
  }
  var inner = expression.substring(inner_left + 1, inner_right);
  var result = simplifyExpression(inner);
  var newExpression = expression.substring(0, inner_left) + result + expression.substring(inner_right + 1,);
  return newExpression;
}

function performOperation(type, expression, i) {
    //Finding the number on left of operand
    var left;
    var digit_start1 = i - 1;
    while ((!isNaN(expression[digit_start1 - 1]) || expression.substring(digit_start1 - 1, digit_start1) == '-') && ((digit_start1) > 0)) {
      digit_start1--;
    }
    left = parseInt(expression.substring(digit_start1, i));

    //Finding the number on right of operand 
    var digit_end2 = i + 1;
    while (((digit_end2 + 1) < expression.length) && !isNaN(expression[digit_end2 + 1])) {
      digit_end2++;
    }
    var right = parseInt(expression.substring(i + 1, digit_end2 + 1));

    //Performing operation based upon input
    var result;
    if (type == '^')
      result = Math.pow(left, right);
    else if (type == '*')
      result = left * right;
    else if (type == '/')
      result = left / type;
    else if (type == '+')
      result = left + right;
    else if (type == '-')
      result = left - right;

    //String updated with result
    expression = (expression.substring(0, digit_start1)) + result + (expression.substring(digit_end2 + 1, ));
    return expression;
}

function simplifyExpression(expression) {

    expression = formatPrior(expression);

    //Evaulating all brackets until there is none left
    while (expression.includes('(')) {
      expression = brackets(expression);
    }

    //Evaluating all exponents until there is none left
    while (expression.includes('^')) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] == '^') {
          expression = performOperation('^', expression, i);
        }
      }
    }

    //Evaulating all multiplication and division until none left
    while (expression.includes('*') || expression.includes('/')) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] == '*') {
          expression = performOperation('*', expression, i);
        }
        else if (expression[i] == '/') {
          expression = performOperation('/', expression, i);
        }
      }
    }

    //Evaluating all addition and subtraction until none left
    while (expression.includes('+') || (expression.substring(1,).includes('-'))) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] == '+') {
          expression = performOperation('+', expression, i);
        }
        else if (expression[i] == '-') {
          expression = performOperation('-', expression, i);
        }
      }
    }

    for (var i = 0; i < expression.length; i++) {
      //Grouped together due to order of operations
      if (expression[i] == '^') {
        expression = performOperation('^', expression, i);
        i = -1;
      }
      else if (expression[i] == '+' || (expression[i] == '-' && i > 0)) {
          expression = performOperation('+', expression, i);
          i = -1;
        }
      else if (expression[i] == '-' && i > 0) {
          expression = performOperation('-', expression, i);
          i = -1;
        }
      }

    return expression;

}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type in an expression to be simplified: ', function (input) {
	console.log(simplifyExpression(`${input}`));
	rl.close();
});