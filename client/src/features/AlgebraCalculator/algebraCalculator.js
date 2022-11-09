function formatPrior(section) {
  //Replace all spaces
  section = section.replaceAll(" ", "");
  return section;
}

function simplifyExpression(expression) {

    expression = formatPrior(expression);

    for (var i = 0; i < expression.length; i++) {
      //Grouped together due to order of operations
      if (expression[i] == '^') {
        
        var left;
        var digit_start1 = i - 1;
        while ((!isNaN(expression[digit_start1 - 1]) || expression.substring(digit_start1 - 1, digit_start1) == '-') && ((digit_start1) > 0)) {
          digit_start1--;
        }
        left = parseInt(expression.substring(digit_start1, i));

        var digit_end2 = i + 1;
        while (((digit_end2 + 1) < expression.length) && !isNaN(expression[digit_end2 + 1])) {
          digit_end2++;
        }
        var right = parseInt(expression.substring(i + 1, digit_end2 + 1));

        var exponentiation = Math.pow(left, right);
        expression = (expression.substring(0, digit_start1)) + exponentiation + (expression.substring(digit_end2 + 1, ));
        i = -1;
      }

      else if (expression[i] == '+' || (expression[i] == '-' && i > 0)) {
        if (expression[i] == '+') {
          var left;
          var digit_start1 = i - 1;
          while ((!isNaN(expression[digit_start1 - 1]) || expression.substring(digit_start1 - 1, digit_start1) == '-') && ((digit_start1) > 0)) {
            digit_start1--;
          }
          left = parseInt(expression.substring(digit_start1, i));

          var digit_end2 = i + 1;
          while (((digit_end2 + 1) < expression.length) && !isNaN(expression[digit_end2 + 1])) {
            digit_end2++;
          }
          var right = parseInt(expression.substring(i + 1, digit_end2 + 1));

          var sum = left + right;
          console.log(sum);
          expression = (expression.substring(0, digit_start1)) + sum + (expression.substring(digit_end2 + 1, ));
          i = -1;
        }
        else if (expression[i] == '-' && i > 0) {
          var left;
          var digit_start1 = i - 1;
          while ((!isNaN(expression[digit_start1 - 1]) || expression.substring(digit_start1 - 1, digit_start1) == '-') && ((digit_start1) > 0)) {
            digit_start1--;
          }
          left = parseInt(expression.substring(digit_start1, i));

          var digit_end2 = i + 1;
          while (((digit_end2 + 1) < expression.length) && !isNaN(expression[digit_end2 + 1])) {
            digit_end2++;
          }
          var right = parseInt(expression.substring(i + 1, digit_end2 + 1));

          var difference = left - right;
          expression = (expression.substring(0, digit_start1)) + difference + (expression.substring(digit_end2 + 1, ));
          i = -1;
        }
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