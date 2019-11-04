// name
let name = 'John'
// the numbers that you have been programming
let numYears = 8
// whether or not you tried JavaScript before
let hasTriedJS = true

let me = {
  name, numYears, hasTriedJS
}

if (me.hasTriedJS && me.numYears > 5) {
  console.log('I have tried JS!')
} else if (me.hasTriedJS) {
  console.log('I have tried JS')
} else {
  console.log("I haven't tried JS yet")
}

/*for (let i = 0; i < 10; i++) {
  console.log(i);
}

let i = 0;
while(i < 10) {
  console.log(i++);
}*/

let greet = name => `Hello, ${name}!`

console.log(greet('Joel'));

d3.csv('../../data/oecd.csv')
  .then(data => {
    let newArray = data
      .filter(d => +d.year >= 2000)
    console.log(newArray);
  })
