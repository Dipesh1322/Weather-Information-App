const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
// const GetGoogleFonts = require('get-google-fonts');
// new GetGoogleFonts().download("https://fonts.googleapis.com/css2?family=Gloock&family=Montserrat&display=swap");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})


app.post("/", function (req, res) {

    const query = req.body.cityName;
    let firstLetter = query.slice(0,1);
    let capital = firstLetter.toUpperCase();
    let restLetters = query.slice(1,query.nameLength);
    let small = restLetters.toLowerCase();

   
    const unit = "metric";
    const apiKey = "c2ca0829723140bd88bf0985e3e3c642";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const feelsLike = weatherData.main.feels_like;
            const windSpeed = weatherData.wind.speed; 
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write(`<style type="text/css">
                body {
                    background-color: rgb(188, 215, 218);
                    text-align: center;
                    margin: 0;
                }
                svg{
                    display: inline-block;
                }
                h1 {
                    display: inline-block;
                    font-family: 'Gloock', serif;
                    font-size: 5rem;
                }
                div{
                    background-color: rgb(149, 187, 189);
                    height: 20rem;
                    width: 60rem;
                    margin: 0.5rem auto;
                    padding: 2rem;
                    border-radius: 1.5rem;
                    position: relative;
                }
                h2{
                    font-family: 'Gloock', serif;
                    font-size: 3rem;
                    margin-top: 1rem;
                }
                img{
                    background-color: rgb(188, 215, 218);
                    border-radius: 50%; 
                    float: left;
                    width: 8rem;
                    height: 8rem;
                    position: absolute;
                    bottom: 7.5rem;
                    left: 4rem;
                }
                h3{
                    font-family: 'Montserrat', sans-serif;
                    font-size: 2rem;
                    position: absolute;
                    bottom: 8.5rem;
                    left: 14rem;
                }
                p{
                    margin-left: 28rem;
                    text-decoration: underline;
                    font-size: 1.3rem;
                    
                }
                button{
                    margin-top: 10rem;
                    font-size: 2rem;
                    border-radius: 0.5rem;
                    background-color: rgb(188, 215, 218);
                }
                a{
                    text-decoration: none;
                    color: black;
                }
                a>svg{
                    margin-left: 0.5rem;
                }
                table{
                    text-align: left;
                    line-height: 1.5;
                    position: absolute;
                    top: 8.2rem;
                    right: 2rem;
                    font-size: 1.8rem;
               }
               td{
                padding-left: 2rem;
               }
            </style>`);

            res.write(`<svg class="mb-5" xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-cloud-lightning-rain-fill" viewBox="0 0 16 16">
            <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z"/>
          </svg><h1>My Weather App</h1>`)

            res.write("<div><h2>"+capital+small+"</h2><img src=" + iconURL + "><h3>" + temp + " &degC</h3>")
            res.write(
            `<table>
                <tr>
                    <th>Feels Like</th>
                    <td>`+feelsLike+`&degC</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>`+weatherDescription+`</td>
                </tr>
                <tr>
                    <th>Wind Speed</th>
                    <td>`+windSpeed+` km/hr</td>
                </tr>
            </table>`)

            res.write(`<button type="submit"><a href="https://weather-app-9pda.onrender.com/">Search another City<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg></a>
            </button>`)
            res.send();
        })
    })
})



app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running.");
})
