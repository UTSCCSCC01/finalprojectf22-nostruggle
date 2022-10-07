/*
Expected user input so far: no brackets, variables exclusively in terms of x
Ex. 3x+7+2x^4 -> 3+8x^3
*/

function validate(equation) {
	
	//Removing spaces
	equation = equation.split(' ').join();
	
	//Checking if everything is not a letter other than x
	if (/[a-wyz]/.test(equation))
		return false;
	
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
		/*
        else if ((equation[s].includes('+') || (equation[s].includes('-'))) && s > 0 && s < equation.length) {
			if (equation[s-1].includes('(') || equation[s-1].includes(')') || equation[s+1].includes('(') || equation[s-1].includes(')')) {
				return false;
			}
        }
		*/
    }
	
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
        if (!(isNaN(terms[i]))) {
            derivedTerms.push("0");
        }
        else if (terms[i].includes('^')) {
            var constant = parseInt(terms[i].substring(0, terms[i].indexOf("x")));
            var exponent = parseInt(terms[i].substring(terms[i].indexOf("^") + 1,));
            var newConstant = constant*exponent;
            var newExponent = exponent - 1;

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
            var constant = terms[i].substring(0, terms[i].indexOf("x"));
            derivedTerms.push(constant);
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
    var constant = parseInt(section.substring(0, section.indexOf("(")));
    var innerSection = section.substring(section.indexOf("(") + 1, section.indexOf(")")); 
    var exponent = parseInt(section.substring(section.indexOf(")") + 2,));

    var newConstant = exponent*constant;
    var newExponent = exponent - 1;
    derivedSection = findSectionDerivative(innerSection);
    
    //Concatenating terms
    derivative = newConstant + '(' + innerSection + ")^" + newExponent + "(" + derivedSection + ")" 
    return derivative;
}

function derivativeType(equation) {
	if (validate(equation) == false) {
		return "Equation is not in a valid format";
	}
    var result;
    if (equation.includes('(') || equation.includes(')'))
        result = chainRule(equation);
    else 
        result = findSectionDerivative(equation);
    return result;
}

/*
"3x+7+2x^4";
"3x^2";
"7";
"3x-7+2x^-4"
"3x-7-2x^-4"
"-3  (  2x^-5 - 3x^2 ) ^ 4  "
" -3y - 5y^4 "
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
