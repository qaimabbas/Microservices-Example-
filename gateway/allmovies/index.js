const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine","ejs");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/allmovies", { useUnifiedTopology:true})
.then(()=> console.log('Connected to db '));

const moviesSchema= new mongoose.Schema({
   
    moviename : String,
    category: String

}) 

const AllMovies= new mongoose.model('AllMovies',moviesSchema);

// add data 

const insertmovie= new AllMovies({
    moviename: 'Little angle',
    category: 'Kids'
})

//insertmovie.save();//


const FindMovies = async ()  => {
   return await AllMovies.find({});
}




app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use('/static', express.static('public'))


app.use('/',async (req,res,next)=>{

    const test = await FindMovies()
         
         res.render('index', { records:test, success:''})
 
         
        
    })










app.listen(8002, () => {
    console.log('Top Movies is Listening to Port 8002')
})
