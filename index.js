const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
require('./routes/randomPicker')(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 4000;


app.listen(PORT, console.log("In the mainframe"));