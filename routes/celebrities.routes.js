const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

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
        res.redirect("/celebrities")
    }).catch((err)=>{console.log(err)})
})



router.get("/", (req, res)=>{
    Celebrity.find()
    .populate({path: "movies",
                model: "Movie"})
    .then((celebrities)=>{
        console.log(celebrities)
        res.render("../views/celebrities/celebrities", {celebrities})
    })
})



module.exports= router;