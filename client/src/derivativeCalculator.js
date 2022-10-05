//Calculator setup
/*
Expected user input so far: no spaces, no brackets, variables exclusively in terms of x
Ex. 3x+7+2x^4 -> 3+8x^3
*/

//Separating terms by + or - sign, and storing each term in an array
//With a minus sign, first convert to plus sign and have negative coefficient, then store in array

//Deriving each term and store in string array
//Case 1: Only number/constant -> disregard term entirely 
//Case 2: constant * var (no exponent) -> only capture constant
//Case 3: constant * var (with exponent) -> exponent*constant = new constant, var same, exponenet - 1 = new exponenet

//Output string array based on derived terms and prior operations to console