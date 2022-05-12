const express=require('express');
const router=express.Router();
const Joi=require('joi');

const genres=[
    {
        id:1,
        genre:"horror",
        movies:['US','Get Out','Psycho']
    },
    {
        id:2,
        genre:"action",
        movies:['Thor','End Game']
    }
]

router.get("/api/genres",(req,res)=>{
    res.send(genres);
});
router.get("/api/genres/:id",(req,res)=>{
    const name = genres.find(c => c.id === parseInt(req.params.id));
    res.send(name);
});

router.post("/api/genres",(req,res)=>{

    // const schema=Joi.object({
    //     genre: Joi.string().required().min(3),
    //     movies:Joi.array().items(Joi.string()).length(2).required()
    // });

    // const result=schema.validate(req.body);
    // console.log(result.error);
    // if(result.error){
    //     return res.status(404).send(result.error.details[0].message);
    // }
    const {error}=validateGenre(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }
    const addGenre={
        id: genres.length+1,
        genre: req.body.genre,
        movies: req.body.movies
    }

    genres.push(addGenre);
    res.send(addGenre);
});


router.put("/api/genres/:id",(req,res)=>{
    const genre=genres.find(g  => g.id === parseInt(req.params.id))
    if(!genre){
        return res.status(404).send("Invalid ID");
    }
    // const schema=Joi.object({
    //     genre: Joi.string().required().min(3),
    //     movies:Joi.array().items(Joi.string()).length(2).required()
    // });

    // const result=schema.validate(req.body);
    // console.log(result.error);
    const {error}=validateGenre(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    genre.genre=req.body.genre;
    genre.movies=req.body.movies;

    res.send(genre)
    

});

router.delete("/api/genres/:id",(req,res)=>{
    const genre=genres.find(g  => g.id === parseInt(req.params.id))
    if(!genre){
        return res.status(404).send("Invalid ID");
    }
    const index=genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})  

function validateGenre(genre){
    const schema=Joi.object({
        genre: Joi.string().required().min(3),
        movies:Joi.array().items(Joi.string()).length(2).required()
    });

    return schema.validate(genre);
    

}

module.exports=router;