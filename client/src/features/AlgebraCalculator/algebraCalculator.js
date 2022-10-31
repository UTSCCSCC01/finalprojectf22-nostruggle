function simplifyExpression(expression) {

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