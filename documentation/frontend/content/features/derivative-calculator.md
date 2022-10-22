---
title: "Calculus Calculator"
date: 2022-10-07T12:42:38-04:00
draft: false
author: "Team NoStruggle"
menu: 
    main: 
        title: "Calculus Calculator"
        parent: 'features'
        weight: 1
---

The derivative calculator takes in an equation in terms of x, which the user types in the console after running “node derivativeCalculator.js” in the /client/src folder. It ensures all variables are in terms of x and that the parentheses are in proper format. If the input is invalid, “Equation is not in a valid format” is displayed on the screen. The derivative calculator currently supports equations that require the basic polynomial derivative with multiple terms and separated by + or -, and it supports the chain rule involving polynomials.

Here are a few examples of input and output:

```
>>> -3 ( 2x^-5 - 3x^2 ) ^ 4
-12(3x^-5-3x^2)^3(-15x^-6-6x) 

>>> 3x^-2
-6x

>>> 7
0

>>> -3y - 5y^4
Equation is not in a valid format

>>> ) 3x+ 4 (4 + 5x^-2)^-2
Equation is not in a valid format
```


The integral calculator takes in an equation in terms of x, which the user types in the console after running “node integralCalculator.js” in the /client/src/features/IntegralCalculator folder. It displays the resulting indefinite integral. To do so, the integral calculator ensures all variables are in terms of x and that the parentheses are in proper format. If the input is invalid, “Equation is not in a valid format” is displayed on the screen. The integral calculator currently supports equations that require the basic polynomial integration with multiple terms and separated by + or -, and it supports fractional constants.

Here are a few examples of input and output:

```
-3/4x^2 + 3 - 4x^7
-1/4x^3+3x-1/2x^8+C

>>> 3/2x
 3/4x^2+C

>>> 7
7x+C

>>> -3y - 5y^4
Equation is not in a valid format

>>> ) 3x+ 4 
Equation is not in a valid format
```