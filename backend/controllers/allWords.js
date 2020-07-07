let mongoose = require('mongoose');
// const Words = require('./models/wordsModel');
const Words = require('../models/wordsModel');

const wordsController = {
  async allWords(req, res) {
    // const wordKeys = ["art", "animals","beach","christmas","clothes","cooking","fruit","furniture","jobs","plants","reptiles","science","shapes","transportation"]
    
    // // Get a random key to return
    // const randomKey = Math.floor(Math.random() * ((wordKeys.length - 1) - 0 + 1)) + 0;
    // const randomWordKey = wordKeys[randomKey];

    // const words = await Words.find({ "words": { $exists: true }});

    // const selectedKey = words[0].words[randomWordKey];
    // const randomWordIndex = Math.floor(Math.random() * (selectedKey.length - 1) - 0 + 1) + 0;

    // const selectedCategoryAndWord = {
    //   category: randomWordKey,
    //   word: selectedKey[randomWordIndex]
    // }

    // res.json(selectedCategoryAndWord);

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
                        key: "$$this.k",
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
  },

}

module.exports = wordsController;