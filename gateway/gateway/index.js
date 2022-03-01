const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());



app.use('/topmovies', proxy('http://localhost:8001'))
app.use('/allmovies', proxy('http://localhost:8002'))
app.use('/kidsmovies',proxy('http://localhost:8003'))
 
app.use('/',(req,res,next)=>{

    res.sendFile(__dirname + "/public/index.html");
})


app.listen(8080, () => {
    console.log('Gateway is Listening to Port 8080')
})



