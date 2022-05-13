const express = require('express');
const router = express.Router();

const {Customer,validate}=require('../models/customer');


router.get('/', async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
})


router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        console.log(req.body.name);
        return res.status(404).send(error.details[0].message);
    }

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold

    });
    console.log(customer);
    const result = await customer.save();
    return res.status(200).send(result);


});

router.put('/:id',async(req,res)=>{
    const customer=await Customer.findById(req.params.id);
    if(!customer){
        return res.status(404).send("Invalid ID!!!");
    }
    const {error}=validate(req.body);
    if(error){
        return res.status(404).send(error.details[0].message);
    }
    customer.set({
        isGold:req.body.isGold,
        name:req.body.name,
        phone: req.body.phone,
    })

    const result=await customer.save();
    res.send(result);
});

router.delete("/:id",async(req,res)=>{
    const result=await Customer.deleteOne({_id:req.params.id});
    res.send(result);
})

module.exports = router;