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
        //Case when term is constant
        if (!(isNaN(terms[i]))) {
            var integratedTerm = terms[i] + 'x';
            integratedTerms.push(integratedTerm);
        }
        //Case when term has variable
    
        //Adding + C at the end for indefinite integral
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

    return completeIntegral;
}

function findSectionIntegral(section) {
    section = formatPrior(section);
    const operators = storeOperators(section);
    const terms = section.split("+"); 
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
	console.log(findSectionIntegral(`${input}`));
	rl.close();
});