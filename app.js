const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


//handlebars set up always the same template
//look in the views folder for index.hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//public set up
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// THESE ARE the routes here:
app.get('/', (req, res) => {

    let nav = {

        home: 'Home',
        beers: 'Beers',
        randomBeers: 'Random Beer'

    }

    res.render('index', nav);

})





app.get('/beers', (req, res) => {

    // get me the beers and oly when you have them execut then part
    punkAPI
        .getBeers()
        .then((beers) => {

            /// while we are waiting for beers this is what's happening first, and then once it retreives the beers, we go to .this

            // you can also place the object below, and dont have to make the variable.
            // always pass the object here

            // console.log(beers)

            let data = { allMyBeersArray: beers }

            res.render('beers', data)
            // pass an objest if you want an array
            // rest.render passes it to the site

            // .catch(error => console.log(error));
        })

});




app.get('/random-beers', (req, res) => res.render('random-beers'));



app.get('/beer/:identifier', (req, res) => {
    // giving identifier name with :
    // they have to be the same in the parameters

    console.log('req.parms.identifier', req.parms.identifier)


    punkAPI.getBeers(req.parms.identifier).then((myBeer) => {

        console.log(beers[0])

        res.render('beer', { beer: myBeer[0] })


    })

})








// const randomBeer = PunkAPI.getRandom()

// randomBeer
// .then(beer => {
//   alert(beer[0].name)
// }) 
// .catch(error => console.log(error));


/// this part??
// punkAPI
//     .getBeers()
//     .then(beersFromApi => {


//         console.log('Beers from the database: ', beersFromApi))
//         res.render('beers', {beersArray: beersFromApi})

//     .catch(error => console.log(error));


app.listen(3000, () => console.log('🏃‍ on port 3000'));
