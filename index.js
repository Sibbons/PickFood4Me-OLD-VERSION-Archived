const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
require('./routes/randomPicker')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve production asset
    app.use(express.static('client/build'));
    //Express will serve index.html if it doesnt rezonize route
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;


app.listen(PORT, console.log("In the mainframe"));