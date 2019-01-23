var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/scrape', function(req, res) {

    // Url que vamos a srapear

    url = 'http://www.imdb.com/title/tt1229340/';

    //Sacando atributos 
    request(url, function(error, response, html) {



        if (!error) {

            // cargar el Html con Cheerio para facil manjeo del DOM
            var $ = cheerio.load(html);

            // Variables scrapeadas
            var titulo, lanzamiento, rating;
            var json = { titulo: "", lanzamiento: "", rating: "" };

            // Inicio titulo y lanzamiento
            $('.title_wrapper').filter(function() {

                    var data = $(this);

                    titulo = data.first().text();

                    lanzamiento = data.children().children().text();

                    json.titulo = titulo;

                    json.lanzamiento = lanzamiento;

                }) // Fin titulo



        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')

    });



})

app.listen('8081')

console.log('La magia ocurre en el puerto 8081');


exports = module.exports = app;