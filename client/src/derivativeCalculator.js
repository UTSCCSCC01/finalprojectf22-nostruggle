//Calculator setup
/*
Expected user input so far: no brackets, variables exclusively in terms of x
Ex. 3x+7+2x^4 -> 3+8x^3
*/

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
    derivedTerms = derivingTerms(terms);
    derivative = concatenateTerms(derivedTerms, operators)
    return derivative;
}

/*
"3x+7+2x^4";
"3x^2";
"7";
"3x-7+2x^-4"
"3x-7-2x^-4"
*/
var eqn = "   3  + 7 x-2 x^4  ";

console.log(eqn);
console.log(findSectionDerivative(eqn));