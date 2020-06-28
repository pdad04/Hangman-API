let router = require('express').Router();
let mongoose = require('mongoose');
const Words = require('./models/wordsModel');

router.get('/', function(req, res) {
  res.json({
    status: 'API is working',
    message:'Welcome to Hangman API'
  });
});

router.get('/words', async (req, res) => {
  const words = await Words.find({"words": {$exists: true}});
  res.json(words[0]);
})

module.exports = router;