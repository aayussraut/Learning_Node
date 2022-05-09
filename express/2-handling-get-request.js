
const express = require('express')
const app = express();
const  courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
]
app.get("/", (req, res) => {
    res.send("hello World!");

});

app.get("/api/courses", (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given id was not found')
    }
    res.send(course)
    // res.send(req.params.id)  //request parameter id
});

// app.get('/api/courses/:year/:month',(req,res)=>{
//     res.send(req.params.year+req.params.month);  //request parameter id
//     // res.send(req.params.month);  //request parameter id
// });

const port=process.env.PORT || 8080; //environment variable
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});





// app.post();
// app.put();
// app.delete();
  