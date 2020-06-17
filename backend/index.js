let express = require('express')
let app = express();
let port = process.env.PORT || 8080;

let apiRoutes = require('./api-routes');

app.use('/api', apiRoutes);

app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

app.listen(port, function() {
  console.log("Running Hangman API on port " + port);
})