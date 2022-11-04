function formatPrior(section) {
  //Replace all spaces
  section = section.replaceAll(" ", "");
  //Convert minus to plus sign with negative term 
  section = section.replace(/(?<!\^)-/g, '+-');
  return section;
}

function generateTerms(expression) {

    expression = formatPrior(expression);
    var terms = expression.split('+');
    return terms;

}

function simplifyExpression(expression) {

    var terms = generateTerms(expression);

    var constant = 0;
    for (var i = 0; i < terms.length; i++) {

        //Constant case
        if (!isNaN(terms[i])) {
            constant += parseInt(terms[i]);
        }

        //x case (to do later)

    }

    var simplified = constant;

    return simplified;

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