const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");




router.get("/details/:id", (req, res)=>{
        
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{   
       
           
        res.render("../views/movies/movie-details", movie)
    })
})


router.get("/delete/:id", (req, res)=>{
        
    Movie.findByIdAndRemove(req.params.id)
    .then(()=>{   
                  
        res.redirect("/movies")
    })
})

router.route("/edit/:id", )
.get((req, res)=>{   
    

    Movie.findById(req.params.id)
    .then((movie)=>{
        Celebrity.find()
    .then((dbCelebrity)=>{
        
        res.render("../views/movies/movie-edit",{dbCelebrity,movie})
    })
        
      
    })
    })
    .post((req, res)=>{
        const title = req.body.title
        const genre = req.body.genre
        const plot = req.body.plot
        const cast = req.body.celebrity
        const id = req.params.id

        Movie.findByIdAndUpdate(id, {title,genre,plot,cast}, {new: true})
        .then(()=>{
            res.redirect(`/movies/details/${id}`)
        })


    })
    
       


router.route("/create", )
.get((req, res)=>{
    Celebrity.find()
    .then((dbCelebrity)=>{
        
        res.render("../views/movies/new-movie",{dbCelebrity})
    })
})
.post((req,res)=>{
    const title = req.body.title
    const genre = req.body.genre
    const plot = req.body.plot
    const cast = req.body.celebrity

    Movie.create({title, genre, plot, cast})
    .then((newMovie)=>{
       
        //console.log("new movie:",newMovie,"celebriti: ", cast)
        Celebrity.findByIdAndUpdate(cast, {
           $push: {movies: newMovie._id},
        },{new: true})

        .then((celebriti)=>{

           // console.log("celeb pusheada", celebriti)
            res.redirect("/")
        })

    })
    .catch((err)=>{console.log(err)})
})


router.get("/", (req, res)=>{
    Movie.find()
    .populate({path: "cast",
    model: "Celebrity"})
    .then((movies)=>{
        console.log(movies)
        res.render("../views/movies/movies", {movies})
    })
})






module.exports= router;