const path =require('path');

//path.parse method returns an object whose properties represent significant elements of path
var pathObj=path.parse(__filename);

console.log(pathObj);
console.log(pathObj.dir);