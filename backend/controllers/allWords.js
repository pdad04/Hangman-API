let mongoose = require('mongoose');
// const Words = require('./models/wordsModel');
const Words = require('../models/wordsModel');

const wordsController = {
  async allWords(req, res) {

    try {
      const randomWord = await Words.aggregate([
        {
          $project: {
            words: {
              $reduce: {
                input: {
                  $objectToArray: "$words"
                },
                initialValue: [],
                in: {
                  $concatArrays: [
                    "$$value",
                    {
                      $map: {
                        input: "$$this.v",
                        as: "w",
                        in: {
                          categoryKey: "$$this.k",
                          word: "$$w"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          $unwind: "$words"
        },
        {
          $replaceWith: "$words" // For MongoDB v3.4 $replaceRoot:{newRoot:"$words"}
        },
        {
          $sample: {
            size: 1
          }
        }
      ]);
  
      res.json(randomWord[0]);
    } catch (error) {
      res.status(500)
      res.json({message: "A server error occurred. Try again later"})
    }
  },


  async categoryWord(req, res) {
    const wordKeys = ["art", "animals","beach","christmas","clothes","cooking","fruit","furniture","jobs","plants","reptiles","science","shapes","transportation"]
    const queryParam =  req.query.category.toLowerCase();
    
    if(!wordKeys.includes(queryParam)) {
      res.status(400);
      res.json({message: `Invalid category supplied. '${queryParam}' category does not exist`})
      return;
    }
    
    
    // Construct an object to use in the mongo aggregation query
    const projectionQuery = {};
    projectionQuery[`words.${queryParam}`] = 1;

    try {
      const categoryWord = await Words.aggregate([
        {
          '$project': projectionQuery
        }, {
          '$unwind': {
            'path': '$words.' + queryParam, 
          }
        }, {
          '$sample': {
            'size': 1
          }
        }
      ]);

      res.json(categoryWord[0].words);

    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
}

module.exports = wordsController;