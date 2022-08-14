/*
https://programming-quotes-api.herokuapp.com/Quotes/random

*/

fetch('https://programming-quotes-api.herokuapp.com/Quotes/random')
  .then(response => response.json())
  .then(data => console.log(data))
