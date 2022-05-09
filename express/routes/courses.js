const express=require('express');
const router=express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }, 
]

router.get("/api/courses", (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    // if(result.error){
    //     res.send(res.error);
    // }
    console.log(result);

    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name  is required and should be minumun 3 characters');
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    if (result.error)
        courses.push(course);
    res.send(course);
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found')
    }
    res.send(course)
    // res.send(req.params.id)  //request parameter id
});


router.put("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found')
    }
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name  is required and should be minumun 3 characters');
        return;
    }
    course.name = req.body.name;
    res.send(course)
});


router.delete("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found')
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

module.exports=router;

// app.get('/api/courses/:year/:month',(req,res)=>{
//     res.send(req.params.year+req.params.month);  //request parameter id
//     // res.send(req.params.month);  //request parameter id
// });