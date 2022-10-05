//Calculator setup
/*
Expected user input so far: no spaces, no brackets, variables exclusively in terms of x
Ex. 3x+7+2x^4 -> 3+8x^3
*/

/*
"3x+7+2x^4";
"3x^2";
"7";
*/
var eqn = "7";
console.log(eqn);

//Convert minus to plus sign with negative term, then store in array

//Separating terms by + sign, and storing each term in an array
const operators = [];
for (const s of eqn) {
    if (s == '+') {
        operators.push(s);
    }
}

const terms = eqn.split("+"); 

//Deriving each term and store in string array
const derivedTerms = [];
for (var i = 0; i < terms.length; i++) {
    if (/^\d$/.test(terms[i])) {
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

//Output string array based on derived terms and prior operations to console
var countOps = 0;
var completeDerivative = '';
for (var countDerived = 0; countDerived < derivedTerms.length; countDerived++) {
    completeDerivative += derivedTerms[countDerived];
    if (countOps < operators.length) {
        completeDerivative += operators[countOps];
        countOps++;
    }
}
//Removes occurences of "+0" or "-0"
completeDerivative = completeDerivative.replace(/(\+|-)0/g, '');
console.log(completeDerivative);