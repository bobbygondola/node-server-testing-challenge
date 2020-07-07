const server = require("../server");

const router = require("express").Router();
const db = require('./faculty-helpers');

router.get('/', (req,res) => {
    db.getAll()
    .then(all => {
        res.status(200).json(all)
    })
})

module.exports=router;