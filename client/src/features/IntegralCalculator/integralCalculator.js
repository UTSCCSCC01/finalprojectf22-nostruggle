
function reduceFraction(numerator, denominator) {

    var originalNum = numerator;

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

    if (originalNum > 0)
        return numerator + "/" + denominator;
    else if (originalNum < 0)
        return (numerator * -1) + "/" + denominator;

}

function validate(equation) {
	
	//Removing spaces
	equation = equation.replaceAll(" ", "");
	
	//Checking if everything is not a letter other than x
	if (/[a-wyz]/.test(equation))
		return false;
	
	//Checking brackets
    var count_ops = 0;
    for (var s in equation) {
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

        //Case when term has variable
        if (terms[i].includes('x')) {

             //Taking the exponent
             var exponent;
             if (terms[i].includes('^')) {
                 exponent = parseInt(terms[i].substring(terms[i].indexOf("^") + 1,));
             }
             else {
                 exponent = 1;
             }
             var newExponent = exponent + 1;

            var constant;

            //Case if there's only x on its own (ex. x^3 or x instead of 3x)
            if (terms[i] == 'x' || terms[i].substring(0, terms[i].indexOf("^")) == 'x') {
                terms[i] = '1' + terms[i];
            }
               
            //Whole number constant
            if (!(isNaN(terms[i].substring(0, terms[i].indexOf("x"))))) {

                constant = parseInt(terms[i].substring(0, terms[i].indexOf("x")));

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
                    newConstant = '(' + reduceFraction(constant, newExponent) + ')';
                }

                if (newExponent > 1)
                    integratedTerm = newConstant + 'x^' + newExponent;
                else
                    integratedTerm = newConstant = 'x';

            }
                
            //Fractional constant
            else if (terms[i].substring(0, terms[i].indexOf("x")).includes("/")) {

                constant = terms[i].substring(0, terms[i].indexOf("x"));
                //Case of bracketed fraction constant input 
                if (constant[0] == '(' && constant[constant.length - 1] == ')') {
                    constant = constant.substring(1, constant.length - 1);
                }
                var denominator = parseInt(constant.substring(constant.indexOf("/") + 1, ));
                var numerator = parseInt(constant.substring(0, constant.indexOf("/")));

                //Seeing if fraction can be simplified
                var newConstant;
                if (numerator / (denominator * newExponent) == 0) {
                    newConstant = numerator / (denominator * newExponent);

                    //Accounting for 1 or -1
                    if (newConstant == 1)
                        newConstant = '';
                    else if (newConstant == -1)
                        newConstant = '-';
                }
                else {
                    newConstant = '(' + reduceFraction(numerator, denominator * newExponent) + ')';
                }

                if (newExponent > 1)
                    integratedTerm = newConstant + 'x^' + newExponent;
                else
                    integratedTerm = newConstant = 'x';

            }

            integratedTerms.push(integratedTerm);
        }
        //Case when term is constant and a whole number
        else if (!(isNaN(terms[i]))) {
            if (terms[i] != '')
                integratedTerm = terms[i] + 'x';
            else 
                integratedTerm = terms[i];
            integratedTerms.push(integratedTerm);
        }
        //Case when term is constant and a fraction
        else if (terms[i].includes("/")) {
            //Case of bracketed fraction constant input 
            if (terms[i][0] == '(' && terms[i][terms[i].length - 1] == ')') {
                terms[i] = terms[i].substring(1, terms[i].length - 1);
            }
            const fraction_parts = terms[i].split("/");
            //Ensuring terms around division are numbers
            if (!(isNaN(fraction_parts[0])) && !(isNaN(fraction_parts[1]))) {
                integratedTerm = '(' + terms[i] + ')x';
                integratedTerms.push(integratedTerm);
            }
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

    //Code cleanup for '+' at the front and end
    if (completeIntegral[0] == '+')
        completeIntegral = completeIntegral.substring(1,);
    if (completeIntegral[completeIntegral.length - 1] == '+')
        completeIntegral = completeIntegral.substring(0, completeIntegral.length - 1);

    //Adds + C for indefinite integral
    completeIntegral += '+C';

    return completeIntegral;
}

export function findIntegral(equation) {

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

/*
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
*/