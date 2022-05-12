const express=require('express');
const app=express();


const genre=require("./routes/genre");

app.use(express.json());
app.use(genre);

app.get("/",(req,res)=>{
    res.send("Hello, This is our HomePage");
})



app.listen(3000,()=>{
    console.log('Listening to port 8080......');
})

