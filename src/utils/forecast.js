const request = require('request');


const forecast =(longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=0e6b1cb0a738fe25812c63d5f9f5bc0d&query='+latitude+','+longitude
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(body.error){
            callback('Location is invalid please provide a valid one',undefined);

        }else{
            const Weather = body.current.temperature
            const FeelsLike = body.current.feelslike
            const WeatherDescription = body.current.weather_descriptions[0]

            callback(undefined,WeatherDescription +'. current Weather is '+Weather+' But it feels like '+FeelsLike+'. Humidity is '+ body.current.humidity+'%')
        
        }

    })
}
module.exports =forecast