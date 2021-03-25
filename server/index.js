const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
require('./routes/randomPicker')(app);

const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Running on ${PORT}`));