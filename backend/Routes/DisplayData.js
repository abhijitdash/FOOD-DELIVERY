const express = require('express')
const router = express.Router()
const mongoDB = require("../db");

const data = mongoDB()
router.post('/foodData', (req, res)=>{
    try{
        // console.log("global.food_items.....",global.food_items)
        res.send([global.food_items, global.foodCategory])
    } catch(error) {
        console.error(error.mesaage)
        res.send("Server Error")
    }
})

module.exports = router;


