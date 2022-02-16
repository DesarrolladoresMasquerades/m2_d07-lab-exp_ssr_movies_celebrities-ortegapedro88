const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();


router.route("/create", )
.get((req, res)=>{
    res.render("../views/celebrities/new-celebrity")
})
.post((req,res)=>{
    const name = req.body.name
    const ocupation = req.body.ocupation
    const catchPhrase = req.body.catchPhrase

    Celebrity.create({name, ocupation, catchPhrase})
    .then(()=>{
        res.redirect("/movies/create")
    }).catch((err)=>{console.log(err)})
})

module.exports= router;