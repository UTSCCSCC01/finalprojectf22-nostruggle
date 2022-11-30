
function formatPrior(section) {
  //Replace all spaces
  section = section.replaceAll(" ", "")
  
  while (section.match('.*[+-]{2}.*')) {
    section = section.replaceAll('+-','-').replaceAll('-+', '-').replaceAll('--', '+').replaceAll('++', '+');
  }
  return section;
}

function validate(equation) {
	
	//Checking brackets
    var count_ops = 0;
    for (var s in equation) {
        if (equation[s].includes('('))
            count_ops++;
        else if (equation[s].includes(')') && count_ops === 0)
            return false;
        else if (equation[s].includes(')') && count_ops > 0)
            count_ops--;
    }
	
	//Ensuring bracket pairs remain matched
	return count_ops === 0;
}

function brackets(expression) {

  //Determining left-innermost pair of brackets, and evaluating the contents
  var inner_left;
  var inner_right;
  for (var i = 0; i < expression.length; i++) {
    if (expression[i] === '(') {
      inner_left = i;
    }
    if (expression[i] === ')') {
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
    while ((!isNaN(expression.substring(digit_start1 - 1, i)) || expression.substring(digit_start1 - 1, digit_start1) === '-') && ((digit_start1) > 0)) {
      if (['+', '-'].includes(expression[digit_start1 - 1])) {
        break;
      }
      digit_start1--;
    }
    left = parseFloat(expression.substring(digit_start1, i));
    console.log('left is: ' + left);
    console.log(!isNaN('.1'));

    //Finding the number on right of operand 
    var digit_end2 = i + 1;
    while (((digit_end2) < expression.length) && !isNaN(expression.substring(i + 1, digit_end2 + 1))) {
      if (['+', '-'].includes(expression[digit_end2])) {
        break;
      }
      digit_end2++;
    }
    var right = parseFloat(expression.substring(i + 1, digit_end2 + 1));
    console.log('right is '  + right);

    //Performing operation based upon input
    var result;
    if (type === '^')
      result = Math.pow(left, right);
    else if (type === '*')
      result = left * right;
    else if (type === '/')
      result = left / right;
    else if (type === '+')
      result = left + right;
    else if (type === '-')
      result = left - right;

    //String updated with result
    console.log('gives result of ' + result);
    console.log('before the result is ' + expression.substring(0, digit_start1));
    console.log('after the result is ' + expression.substring(digit_end2));
    console.log('the expression is ' + expression);
    expression = (expression.substring(0, digit_start1)) + (Math.round(result*100000)/100000).toString() + (expression.substring(digit_end2));
    console.log('new expression becomes ' + expression);

    return expression;
}

function simplifyExpression(expression) {

    //Evaulating all brackets until there is none left
    while (expression.includes('(')) {
      expression = brackets(expression);
    }

    //Evaluating all exponents until there is none left
    while (expression.includes('^')) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] === '^') {
          expression = performOperation('^', expression, i);
        }
      }
    }

    //Evaulating all multiplication and division until none left
    while (expression.includes('*') || expression.includes('/')) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] === '*') {
          expression = performOperation('*', expression, i);
        }
        else if (expression[i] === '/') {
          expression = performOperation('/', expression, i);
        }
      }
    }

    //Evaluating all addition and subtraction until none left
    while (expression.includes('+') || (expression.substring(1,).includes('-'))) {
      for (var i = 0; i < expression.length; i++) {
        if (expression[i] === '+') {
          expression = performOperation('+', expression, i);
        }
        else if (expression[i] === '-') {
          expression = performOperation('-', expression, i);
        }
      }
    }

    for (var i = 0; i < expression.length; i++) {
      //Grouped together due to order of operations
      if (expression[i] === '^') {
        expression = performOperation('^', expression, i);
        i = -1;
      }
      else if (expression[i] === '+' || (expression[i] === '-' && i > 0)) {
          expression = performOperation('+', expression, i);
          i = -1;
        }
      else if (expression[i] === '-' && i > 0) {
          expression = performOperation('-', expression, i);
          i = -1;
        }
      }

    return expression;

}

export function simplify(expression) {

  expression = formatPrior(expression);
  if (validate(expression) === false) {
		return "Equation is not in a valid format";
	}
  var result = simplifyExpression(expression);
  return result;
}

/*
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type in an expression to be simplified: ', function (input) {
	console.log(simplify(`${input}`));
	rl.close();
});
*/