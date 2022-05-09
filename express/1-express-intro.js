
const express = require('express')
const app = express();

app.get("/", (req, res) => {
    res.send("hello World!");

});

app.get("/api/courses", (req, res) => {
    res.send([1, 2, 3]);
});


 
app.listen(8080, () => {
    console.log('listening on port 8080');
});





// app.post();
// app.put();
// app.delete();
