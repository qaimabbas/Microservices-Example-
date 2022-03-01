const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/static', express.static('public'))




const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/topmovies", { useUnifiedTopology:true})
.then(()=> console.log('Connected to db '));

const topmoviesSchema=new mongoose.Schema({
   
    moviename : String,
    category: String

}) 

const TopMovies= new mongoose.model('TopMovies',topmoviesSchema);

// add data 

const insertmovie= new TopMovies({
    moviename: 'Fairy Love',
    category: 'Love'
})



//var FindTopMovies = TopMovies.find({});

const FindTopMovies = async () => { 
    return await TopMovies.find({});
  }




app.use('/',async (req,res,next)=>{

    const topMovies = await FindTopMovies()
    console.log(topMovies, 'asdbhsaka')
    res.render('index', { records:topMovies, success:''})
         
        
    })















app.listen(8001, () => {
    console.log('All Movies microservice is Listening to Port 8001')
})
