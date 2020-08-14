let router = require('express').Router();
const wordsController = require ('./controllers/allWords');
let mongoose = require('mongoose');
const Words = require('./models/wordsModel');

router.get('/', function(req, res) {
  res.json({
    status: 'API is working',
    message:'Welcome to Hangman API'
  });
});


router.get('/words', wordsController.allWords);
router.get('/words/categories',wordsController.categoryWord);

module.exports = router;