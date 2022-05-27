const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine","ejs");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/kidsmovies", { useUnifiedTopology:true})
.then(()=> console.log('Connected to db '));

const moviesSchema= new mongoose.Schema({
   
    moviename : String,
    category: String

}) 

const KidsMovies= new mongoose.model('KidsMovies',moviesSchema);

// add data 

const insertmovie= new KidsMovies({
    moviename: 'careem hunter',
    category: 'Kids'
})

insertmovie.save();


const FindMovies = async ()  => {
   return await KidsMovies.find({});
}




app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/static', express.static('public'))


app.use('/',async (req,res,next)=>{

    const test = await FindMovies()
         
         res.render('index', { records:test, success:''})
 
         
        
    })










app.listen(8003, () => {
    console.log('Kids Movies microservice is Listening to Port 8003')
})
