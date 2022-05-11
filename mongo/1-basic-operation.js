const mongoose = require('mongoose');

//connection to database
mongoose.connect('mongodb://localhost/playground') //connection to mongodb database
    .then(() => console.log("Connected to MongoDB"))
    .catch((err => console.error("Could not connect to database", err)));

//schemas
// to defone the shape of document
//what are the property we have in this document

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now }, //will have a default value
    isPublished: Boolean,
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    //models
    //compiling schema to model


    const course = new Course({
        name: 'Angular COurse',
        author: "Ashwin",
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}
// createCourse();

//quering document
async function getCourses() {

    // Comparasion operator in mongodb
    //eq (equal)
    //ne (not equal)
    // gt(greater than)
    // gte (greater than or eqaul to)
    // lt (less than)
    // lte (less than or eqaual to)
    //in
    //nin (not in) 


    //logical operator
    //or
    //and

    //regular expression

    const courses = await Course
        .find({
            author: "Aayush",
            isPublished: true
        })

        //logical operator

        // .find()
        // .or([{author:"Aayush"},{isPublished:true}]) //we will get the course that are published by aayush or with value is published is true
        //comparision operator
        // .find({price:{$gte:10,$lte:20}}) //if we have a price property then it search for price greater than 10 and less than 20
        // .find({price:{$in:[10,20,30]}}) // searchinng for the object with price 10,20 and 30

        //regular exppression

        //author starts with mosh
        // .find({ author: /^A/ }) //starts with A
        // //Ends with h
        // .find({ author: /h$/i }) //i indicates case insensitive $ sign indicates end of string
        // // Contains us
        // .find({ author: /.*us.*/i }) // ./* repressent that we can have any character before and after us
        .limit(10) //kati ota
        .sort({ name: 1 }) //sort by name in ascending order(1) ...descending order (-1)
        // .select({ name: 1, tags: 1 }); //select the property we want to return 
        .count();
    console.log(courses);
}

//query first - if u recieve id from client
async function updateCourse(id){
    const course=await Course.findById(id);
    if(!course) return;
    // course.isPublished=true;
    // course.author="Rabindra";
    course.set({
        isPublished:true,
        author:"Rabindra"
    });
    const result=await course.save();
    console.log(result);

}
//query first
async function updateCourse(id){
    // const result=await Course.updateMany({_id: id},{$set:{
    //     author: "Ashwin",
    //     isPublished: false
    // }});
    const course=await Course.findByIdAndUpdate(id,{$set:{
        author: "Rabindra",
        isPublished: true
    }},{new:true}); //show the updated course
    console.log(course);

}
async function removeCourse(id){
  const result=await  Course.deleteOne({_id:id})
    console.log(result);
}


removeCourse('627540b3c7a2be1eaaa9ef78');




