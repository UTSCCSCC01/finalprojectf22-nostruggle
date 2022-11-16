//import { getCalculatorInput } from '../Calculator/CalculatorHandler';
//import { setCalculatorOutput } from '../Calculator/CalculatorHandler';

function reduceFraction(numerator, denominator) {

    originalNum = numerator;

    if (numerator < 0)
        numerator = numerator * -1;

    var lowest;
    if (numerator < denominator)
        lowest = numerator;
    else if (denominator < numerator)
        lowest = denominator;

    var i = 2;
    while (i <= lowest) {

        if (numerator % i == 0 && denominator % i == 0) {
            numerator = numerator / i;
            denominator = denominator / i;
            i = 1;
        }

        i++;

    }

    if (originalNum > 0) {

        //Case of 2/2
        if (numerator == denominator)
            return '';

        if (denominator == 1) {
            return numerator;
        }
        return numerator + "/" + denominator;
    }

    else if (originalNum < 0) {

        //Case of -2/2
        if (numerator == denominator)
            return '-';

        if (denominator == 1) {
            return numerator * -1;
        }
        return (numerator * -1) + "/" + denominator;
    }

}

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

//Deriving each term and store in string array
function derivingTerms(terms) {
    const derivedTerms = [];
    for (var i = 0; i < terms.length; i++) {
        //Constant case
        if (!(terms[i].includes('x'))) {
            derivedTerms.push("0");
        }
        //Has exponenet
        else if (terms[i].includes('^')) {
            var constant = terms[i].substring(0, terms[i].indexOf("x"));
            //Case when constant is bracketed
            if (constant[0] == '(' && constant[constant.length - 1] == ')') {
                constant = constant.substring(1, constant.length - 1);
            }
            var exponent = parseInt(terms[i].substring(terms[i].indexOf("^") + 1,));
            var newExponent = exponent - 1;
            var newConstant;
            //Case when the constant is a fraction
            if (constant.includes('/')) {
                var denominator = parseInt(constant.substring(constant.indexOf("/") + 1, ));
                var numerator = parseInt(constant.substring(0, constant.indexOf("/")));
                var newNumerator = numerator * exponent;
                newConstant = reduceFraction(newNumerator, denominator);
                //Adding brackets around fractional constant (if applicable)
                if (newConstant.includes('/'))
                    newConstant = '(' + newConstant + ')';
            }
            //Case when constant is a whole number
            else {
                constant = parseInt(constant);
                newConstant = constant*exponent;
            }

            //Handling when new exponent becomes "^1" (removing it)
            var derivedTerm; 
            if (newExponent == 1) {
                derivedTerm = newConstant + "x";
            }
            else {
                derivedTerm = newConstant + "x^" + newExponent;
            }

            derivedTerms.push(derivedTerm);
        }
        else {
            if (terms[i] == 'x') {
                derivedTerms.push("1");
            }
            else {
                var constant = terms[i].substring(0, terms[i].indexOf("x"));
                derivedTerms.push(constant);
            }
        }
    }
    return derivedTerms;
}

function concatenateTerms(derivedTerms, operators) {
    var countOps = 0;
    var completeDerivative = '';
    for (var countDerived = 0; countDerived < derivedTerms.length; countDerived++) {
        completeDerivative += derivedTerms[countDerived];
        if (countOps < operators.length) {
            completeDerivative += operators[countOps];
            countOps++;
        }
    }

    //Replaces "+-" with "-" 
    completeDerivative = completeDerivative.replace(/(\+-)/g, '-');
    //Removes occurences of "+0", "-0", "0-", or "0+"
    completeDerivative = completeDerivative.replace(/(((\+|-)0)|(0\+))/g, '');
    completeDerivative = completeDerivative.replace(/0-/g, '-');

    return completeDerivative;
}

function findSectionDerivative(section) {
    section = formatPrior(section);
    const operators = storeOperators(section);
    const terms = section.split("+"); 
    const derivedTerms = derivingTerms(terms);
    const derivative = concatenateTerms(derivedTerms, operators)
    return derivative;
}


function chainRule(section) {
    section = section.replaceAll(" ", "");
	
	//Dealing with case if there is no constant at the front
	var constant = 1;
	if (section.indexOf("(") > 0)
		constant = parseInt(section.substring(0, section.indexOf("(")));
	
    var innerSection = section.substring(section.indexOf("(") + 1, section.indexOf(")")); 
    var exponent = parseInt(section.substring(section.indexOf(")") + 2,));

    var newConstant = exponent*constant;
    var newExponent = exponent - 1;
    derivedSection = findSectionDerivative(innerSection);
    
    //Concatenating terms
	if (newExponent != 1) 
		derivative = newConstant + '(' + innerSection + ")^" + newExponent + "(" + derivedSection + ")";
	else if (newExponent == 1)
		derivative = newConstant + '(' + innerSection + ")(" + derivedSection + ")"
	
    return derivative;
}

function derivativeType(equation) {
	if (validate(equation) == false) {
		return "Equation is not in a valid format";
	}
    var result;
    /*
    if (equation.includes('(') || equation.includes(')'))
        result = chainRule(equation);
    else 
    */
        result = findSectionDerivative(equation);
    return result;
}

/*
var input = getCalculatorInput();
var output = derivativeType(input);
setCalculatorOutput(output);
*/


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type in an equation to be derived: ', function (input) {
	console.log(derivativeType(`${input}`));
	rl.close();
});
