# Hangman API

# About

Hangman API is a REST API built with node and mongoDB that allows you to pull words for use in the game of hangman. It provides words from the following categories:

- Animals
- Art
- Beach
- Christmas
- Clothes
- Cooking
- Fruit
- Furniture
- Jobs
- Plants
- Reptiles
- Science
- Shapes
- Transportation

Words returned may have spaces like `soft boil` and/or other punctuation like `pressure-cook`. You should take care to handle these words as you see fit. For example automatically uncover or remove punction, spacing or other special characters when the game begins.

---
# API Routes
**Only `GET` requests are supported at this time.**

1. *https://<server_name>/api/words* - This endpoint will randomly select a category and send back a random word from that categories list of words. The response will be a JSON object with two `key:value` pairs. `categoryKey` is the category the word is selected from, `word` is the random word from the `categoryKey`. For example, below, the `animals` category was randomly selected and the word `mammel` was the random word from the `animals` category returned.

    ```JSON
    {
      "categoryKey": "animals",
      "word": "mammel"
    }
    ```

2. *https://<server_name>/api/words/categories?category=<category_name>* - This endpoint you control which category you want a random word selected from, so you must supply the category you would like the random word picked from. For example:

    `https://<server_name>/api/words/categories?category=art` would send back a random word from the `art` category. The response will be a JSON object where the `key` is the category and the `value` is the random word.

    ```JSON
      {
        "art": "pottery"
      }
    ```
