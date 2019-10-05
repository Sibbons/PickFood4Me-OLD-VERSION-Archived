module.exports = app => {

    let address = "";
    let foodType = ""
    app.get('/', (req, res) => {
        res.send('Hacked into the mainframe');
    })

    app.post('/api/inputFields', (req, res) => {
        address = req.body.address;
        foodType = req.body.address
        console.log(address, foodType);
    })

}