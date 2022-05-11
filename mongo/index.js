const mongoose = require('mongoose');

//connection to database
mongoose.connect('mongodb://localhost/playground') //connection to mongodb database
    .then(() => console.log("Connected to MongoDB"))
    .catch((err => console.error("Could not connect to database", err)));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match for required pattern 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        // lowercase: true, //change value of property to lowercase
        uppercase: true,
        trim: true, //padding around text ..it will remove 
    },
    author: String,
    tags: {
        type: Array,
        validate: {  //custom validation
            isAsync: true,
            validator: function (v) {
                return new Promise((resolve)=>{ //async validation
                    setTimeout(() => {
                        const result=v && v.length > 0;
                        resolve(result);
                    }, 2000);
                })
                
                 //if v has a value and length of v is greater than 10
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }, //will have a default value
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {   // price is required if isPublished is true
            return this.isPublished;

        },
        get:  v=> Math.round(v), //read from database, then it will roundoff the value
        set: v=> Math.round(v), //call function setter will be called
    }
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    //models
    //compiling schema to model


    const course = new Course({
        name: 'Angular COurse',
        author: "Ashwin",
        category: "-",
        tags: null,
        isPublished: true,
        price: 10,
    });
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (err) {
        for(field in err.errors)
            console.log(err.errors[field].message);
    }

}
// createCourse();

//quering document
async function getCourses() {


    const courses = await Course
        .find({
            author: "Aayush",
            isPublished: true
        })


        .limit(10) //kati ota
        .sort({ name: 1 }) //sort by name in ascending 
        .count();
    console.log(courses);
}

//query first - if u recieve id from client
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    // course.isPublished=true;
    // course.author="Rabindra";
    course.set({
        isPublished: true,
        author: "Rabindra"
    });
    const result = await course.save();
    console.log(result);

}
//query first
async function updateCourse(id) {
    // const result=await Course.updateMany({_id: id},{$set:{
    //     author: "Ashwin",
    //     isPublished: false
    // }});
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: "Rabindra",
            isPublished: true
        }
    }, { new: true }); //show the updated course
    console.log(course);

}
async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result);
}


// removeCourse('627540b3c7a2be1eaaa9ef78');

createCourse();


