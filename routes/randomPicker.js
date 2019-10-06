'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('zqu6rA6DFZHinP0SJbhZCyY3b4XI8Sdi5P8tmmPlfglgJ3L4tUmGIX8ndSuz7c2jIEmUdxn6KXXbq6HuNumZ2KVza5queU9l5p0RwUKM0t8wZKa1NvlLkIKQCiKZXXYx');


module.exports = app => {

    let address = "";
    let foodType = "";


    app.get('/', (req, res) => {
        res.send('Hacked into the mainframe');
    })



    app.post('/api/inputFields', (req, res) => {
        address = req.body.address.replace(', USA', '');
        foodType = req.body.foodType;
        console.log('INSIDE POST', address, foodType);
    })



    app.get('/api/getPlace', async (req, res) => {
        const response = await client.search({
            searchType: "Coffe",
            location: "San Francisco, CA",
        })

        const foodPlace = response.jsonBody.businesses[9];

        console.log(foodPlace);
        res.json(foodPlace)
    })

}