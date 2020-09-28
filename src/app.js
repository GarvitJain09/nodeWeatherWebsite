const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');


const app = express()
// define paths for express config
const publicDir =path.join(__dirname,'../public')

const viewPath = path.join(__dirname,'../templates/views')

const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Garvit Jain'
    })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About New',
        name:'Garvit Jain'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'I need help',
        name:'Garvit Jain'
    })

})
app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'Please provide Location'
       })
   }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){
            return res.send({
                error
            });
        }
       forecast(longitude,latitude,(error,forecast)=>{
        if(error){
            return res.send({
                error
            });
        }  
        return res.send({
               forecast,
               location,
               address:req.query.address
           })
       })
    })
})



app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:'Garvit Jain',
        errorMessage:'Page not Found'


    }

    )
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})