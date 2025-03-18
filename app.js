require('dotenv').config({path: `${process.cwd()}/.env`}); //linking the .env file so that we can access its variables

const express = require('express')
const authRouter = require('./route/authRoute')




const app = express()

//middleware tp parse json bodies
app.use(express.json())



app.get('/', (req,res) =>{
    res.status(200).json({
        status: "success",
        message: "RestAPIs running"
    });

});


//all routes will be here

app.use('/api/v1/auth',authRouter)

app.use('*', (req,res,next) => {
    res.status(404).json({
        status:"fail",
        message:"Route not found"

    })
})

const PORT = process.env.APP_PORT || 4000;



app.listen(PORT, ()=>{
    console.log('Server up and Running',PORT);
});