const express=require('express');
const app=express();
const mongoose=require('mongoose');
const genre=require("./routes/genre");
const customer=require("./routes/customer-api");
const movie=require("./routes/movie-api");
const rental=require("./routes/rental-api");
const user=require("./routes/user-api");
const auth=require("./routes/auth");

mongoose.connect('mongodb://localhost/vidly') //connection to mongodb database
    .then(() => console.log("Connected to MongoDB"))
    .catch((err => console.error("Could not connect to database", err)));

app.use(express.json());
app.use("/api/genres",genre);
app.use("/api/customers",customer);
app.use("/api/movies",movie);
app.use("/api/rental",rental);
app.use("/api/users",user);
app.use("/api/auth",auth);
app.listen(3000,()=>{
    console.log('Listening to port 3000......');
})

