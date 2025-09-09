**1) What is the difference between var, let, and const?
**   > *var*-
- When var is hoisted, it gets initialized with a value 'Undefined'
- var can be redeclared and reassign value in the same scope
-  var creates a property on window/global object.
- created problem within closures and  functions

const & *let*- 
- hoisted as usual, but are not initialized until the execution gets to the line where they are first declared. (so they are in Temporal dead zone-TDZ;- The time between hoisting and variable declaration).
- Cont's value can't be redeclared, but let's value can.
- They do not create global property

  
**3) What is the difference between map(), forEach(), and filter()?
**   
- .map() -> works on each element, then returns the result
- .forEach() -> same as map, but doesn't return, only shows the result in console or another way.
- .filter() -> check condition, then returns all the results that have fulfilled the condition.


   
**5) What are arrow functions in ES6?
******
- used to write a function with shorter syntax.
- If there's 1 parameter () is optional
- 1 line return is implicit (no need to write 'return'), but multi-line body> explicit 'return'.
- doesn't have it's own '*this*', inherits from surrounding scope. (usually window/undefined in strict mode)

  
**7) How does destructuring assignment work in ES6?
**   
  - Used to extract values/properties from array/object and assign them to a new variable
  - can set a default value [a=3, b=4]
  - renaming variables is possible [first:changedFirst]


  
**9) Explain template literals in ES6. How are they different from string concatenation?**
- used to declare strings in a cleaner, powerful and convenient way.
- used with `` (backtick) ``
-  ${} - to write any variable, function call, expression
-  show texts as they are written, include all the whitespace, line breaks etc.
