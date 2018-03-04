var express = require('express');
var router = express.Router();
//var movies = require("../mock/movieData");
var mongoClient=require('mongodb').MongoClient
var db;

mongoClient.connect("mongodb://127.0.0.1:27017",function(err,connection){
    db=connection.db("projector");
})

/* GET users listing. */
router.get('/all', function(req, res,next) {
    //db.movie.find()
    var moviesCollection=db.collection("movie") //db.movie
    moviesCollection.find().toArray(function(err,data){
        res.json(data);
    })
 // res.send('my movie list');
});
router.get('/particular', function(req, res,next) {
    //db.movie.find()
    var moviesCollection=db.collection("movie") //db.movie
    moviesCollection.find({"year":"2017"}).toArray(function(err,data){
        res.json(data);
    })
 // res.send('my movie list');
});
router.post('/add', function(req, res, next) {
    var movie=req.body;
    console.log(movie);
    var moviesCollection=db.collection("movie");
    moviesCollection.insert(movie,function(err,data){
        if(!err){
            return res.json({
                isSucess:true
            });
        }
        else{
            return res.json({
                isSucess:false
            });
        }
    })
   // res.send('add to movies');
  });

router.get('/moviename', function(req, res, next) {
    console.log(req.params.movieName);
    res.send('my movie list');
  });


router.get('/avatar', function(req, res, next) {
    res.send('avatar');
  });
  router.post('/addmovies', function(req, res, next) {
    res.send('add to movies');
  });
  router.post('/am', function(req, res, next) {
      console.log(req.body);
      res.json({
          isSucess: true
     });
   // res.send('add to movies');
  });
  
router.get('/all', function(req, res, next) {
    res.json({
        "name" :"interstellar"
      });
  });
  
router.get('/avatar', function(req, res, next) {
    console.log(req.body);
    res.json({
        "name" :req.params.movieName
  });
});

module.exports = router;