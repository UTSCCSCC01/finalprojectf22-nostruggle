function validate(equation) {
	
	//Removing spaces
	equation = equation.replaceAll(" ", "");
	
	//Checking if everything is not a letter other than x
	if (/[a-wyz]/.test(equation))
		return false;
	
	//Checking brackets
    var count_ops = 0;
    for (s in equation) {
        if (equation[s].includes('('))
            count_ops++;
        else if (equation[s].includes(')') && count_ops == 0)
            return false;
        else if (equation[s].includes(')') && count_ops > 0)
            count_ops--;
    }
	
    //Checking if there is anything around the + or - sign
    for (s in equation) {
		//Checking if +...... or .....- or .....+
		if ((s == 0 && equation[s].includes('+')) || (equation[equation.length - 1].includes('+') || equation[equation.length - 1].includes('-')))
			return false;
    }
	
	//Invalidating (+, ^+, +), +^, -), and -^
	if (/\(\+/g.test(equation) || /\^\+/g.test(equation) || /\+\)/g.test(equation) || /\+\^/g.test(equation) || /\-\)/g.test(equation) || /\-\^/g.test(equation))
		return false;
	
	//Ensuring bracket pairs remain matched
	return count_ops == 0;
}

function formatPrior(section) {
    //Replace all spaces
    section = section.replaceAll(" ", "");
    //Convert minus to plus sign with negative term (except for "^-" since it is within a term)
    section = section.replace(/(?<!\^)-/g, '+-');
    return section;
}

//Separating terms by + sign, and storing each operator in an array
function storeOperators(section) {
    const operators = [];
    for (const s of section) {
        if (s == '+') {
            operators.push(s);
        }
    }
    return operators;
}

function integrateTerms(terms) {
    const integratedTerms = [];
    for (var i = 0; i < terms.length; i++) {
        var integratedTerm;
        //Case when term is constant
        if (!(isNaN(terms[i])) && terms[i] != '') {
            integratedTerm = terms[i] + 'x';
            integratedTerms.push(integratedTerm);
        }
        //Case when term has variable
        else if (terms[i] != '') {
            var constant = parseInt(terms[i].substring(0, terms[i].indexOf("x")));
            //Taking the exponenet
            var exponent;
            if (terms[i].includes('^')) {
                exponent = parseInt(terms[i].substring(terms[i].indexOf("^") + 1,));
            }
            else {
                exponent = 1;
            }
            var newExponent = exponent + 1;

            //Seeing if fraction can be simplified
            var newConstant;
            if (constant % newExponent == 0) {
                newConstant = constant / newExponent;

                //Accounting for 1 or -1
                if (newConstant == 1)
                    newConstant = '';
                else if (newConstant == -1)
                    newConstant = '-';
            }
            else {
                newConstant = constant + "/" + newExponent;
            }

            if (newExponent > 1)
                integratedTerm = newConstant + 'x^' + newExponent;
            else
                integratedTerm = newConstant = 'x';

            integratedTerms.push(integratedTerm);
        }
    }

    return integratedTerms;
}

function concatenateTerms(integratedTerms, operators) {
    var countOps = 0;
    var completeIntegral = '';
    for (var countIntegrated = 0; countIntegrated < integratedTerms.length; countIntegrated++) {
        completeIntegral += integratedTerms[countIntegrated];
        if (countOps < operators.length) {
            completeIntegral += operators[countOps];
            countOps++;
        }
    }

    //Replaces "+-" with "-" 
    completeIntegral = completeIntegral.replace(/(\+-)/g, '-');
    //Removes occurences of "+0", "-0", "0-", or "0+"
    completeIntegral = completeIntegral.replace(/(((\+|-)0)|(0\+))/g, '');
    completeIntegral = completeIntegral.replace(/0-/g, '-');

    //Adds + C for indefinite integral
    //completeIntegral += ' + C';

    return completeIntegral;
}

function findIntegral(equation) {

    if (validate(equation) == false) {
		return "Equation is not in a valid format";
	}

    equation = formatPrior(equation);
    const operators = storeOperators(equation);
    const terms = equation.split("+"); 
    const integratedTerms = integrateTerms(terms);
    const integral = concatenateTerms(integratedTerms, operators)

    return integral;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type in an equation to be integrated: ', function (input) {
	console.log(findIntegral(`${input}`));
    //console.log(formatPrior(`${input}`));
	rl.close();
});