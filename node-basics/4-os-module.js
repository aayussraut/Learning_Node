//os module provides a number of os related ulitity methods.
 

const os=require('os');

var totalMemory=os.totalmem();
var freeMemory=os.freemem();

// console.log("Total Memory: "+ totalMemory);
// console.log("Free Memory: "+freeMemory);

console.log(`Total Memory: ${totalMemory}`); //template string 
console.log(`Free Memory: ${freeMemory}`);
