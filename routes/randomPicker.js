'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('zqu6rA6DFZHinP0SJbhZCyY3b4XI8Sdi5P8tmmPlfglgJ3L4tUmGIX8ndSuz7c2jIEmUdxn6KXXbq6HuNumZ2KVza5queU9l5p0RwUKM0t8wZKa1NvlLkIKQCiKZXXYx');


module.exports = app => {

    let address = "";
    const foodType = "restaurants";
    const choices = "Japanese,Sushi,Ramen,Chinese,Buffet,Mexican,Filipino,Indian,Nepalease";
    const range = 25000;





    app.post('/api/inputFields', (req, res) => {
        address = req.body.address.replace(', USA', '');
    })



    app.get('/api/getPlace', async (req, res) => {
        const response = await client.search({
            searchType: foodType,
            location: address,
            categories: choices,
            radius: range,
            open_now: true,
        })

        let randomNum = Math.floor((Math.random() * response.jsonBody.businesses.length));
        const randomfoodPlace = response.jsonBody.businesses[randomNum];
        let locationCombined = `${randomfoodPlace.location.address1}, ${randomfoodPlace.location.city} ${randomfoodPlace.location.zip_code} ${randomfoodPlace.location.state}`;
        const finalPlace = {
            name: randomfoodPlace.name,
            price: randomfoodPlace.price,
            location: locationCombined,
            phone: randomfoodPlace.display_phone
        }

        res.json(finalPlace);

    })

}