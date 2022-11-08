function formatPrior(section) {
  //Replace all spaces
  section = section.replaceAll(" ", "");
  return section;
}

function simplifyExpression(expression) {

    expression = formatPrior(expression);

    for (var i = 0; i < expression.length; i++) {
      //Grouped together due to order of operations
      if (expression[i] == '+' || (expression[i] == '-' && i > 0)) {
        if (expression[i] == '+') {
          var left;
          //If number on left side is positive
          if (expression.substring(i - 2, i - 1) != '-')
            left = parseInt(expression.substring(i - 1, i));
          //If number on left side is negative 
          else if (expression.substring(i - 2, i - 1) == '-')
            left = parseInt(expression.substring(i - 2, i));
          var right = parseInt(expression.substring(i + 1, i + 2));
          console.log(left);
          console.log(right);
          var sum = left + right;
          expression = (expression.substring(0, i - 2)) + sum + (expression.substring(i + 2, ));
          i = -1;
        }
        else if (expression[i] == '-' && i > 0) {
          console.log('Second case');
          var left;
          //If number on left side is positive
          if (expression.substring(i - 2, i - 1) != '-')
            left = parseInt(expression.substring(i - 1, i));
          //If number on left side is negative 
          else if (expression.substring(i - 2, i - 1) == '-')
            left = parseInt(expression.substring(i - 2, i));
          var right = parseInt(expression.substring(i + 1, i + 2));
          console.log(left);
          console.log(right);
          var difference = left - right;
          expression = (expression.substring(0, i - 2)) + difference + (expression.substring(i + 2, ));
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