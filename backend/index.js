require('dotenv').config();

let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const Words = require('./models/wordsModel');

let app = express();
let port = process.env.PORT || 8080;

let apiRoutes = require('./api-routes');

// Base URL for API
app.use('/api', apiRoutes);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Connect to DB
mongoose.connect(process.env.DBCONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to the DB');
})

app.get('/', async (req, res) => {
  let words = await Words.find({"words": { $exists: true }});
    res.json(words[0].words.science);
});


app.listen(port, function() {
  console.log("Running Hangman API on port " + port);
})