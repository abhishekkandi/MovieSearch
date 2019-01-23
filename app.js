const express = require('express');
const app = express();
const request = require('request');
const config = require('./config');
const portNumber = 3000;
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("search")
})

app.get("/results",function(req,res){
    let searchValue = req.query.searchvalue;
    let url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${config.APIKey}`
    request(url,function(error, response, body){
        if(!error && response.statusCode == 200) {
            let moviesMetaData = JSON.parse(body)
            res.render("results", { movies : moviesMetaData })
        }
    })
})

app.listen(portNumber, function(){
    console.log(`Server started running at port - ${portNumber}`)
})