const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();



app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})



app.post("/",function(req,res){
    
    const query = req.body.cityName; 
    const unit = "metric";
    const apiKey = "c2ca0829723140bd88bf0985e3e3c642";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;

    https.get(url,function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        })
    })
})



app.listen(process.env.PORT||3000,function(){
    console.log("Server is up and running.");
})