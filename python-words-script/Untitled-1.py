from bs4 import BeautifulSoup
import requests

# Website base url
base_url = 'https://www.enchantedlearning.com/wordlist/'
# Path to store text files of words
local_path = "/Users/Andre/Documents/development/hangman-api/python-words-script/wordlists/"

# Words to append to base url. To get page with words list
url_word_path = ['art', 'animals','beach','christmas','clothes','cooking','fruit','furniture','jobs','plants','reptiles','science','shapes','transportation']

# Iterate over the word path to get words from each page
for entry in url_word_path:
  r = requests.get(base_url + entry)

  soup = BeautifulSoup(r.content, 'html.parser')
  
  # Get only the words in the word list
  words = soup.select('.wordlist-item')
  
  # Open file
  outFile = open(local_path + entry + ".csv", "a")
  outFile.write("[")
  for num, word in enumerate(words):
    utf8_encoded = word.getText().encode('utf8')
    word_string = '"' + utf8_encoded + '"'

    # Don't add a ',' and newline in the last entry in file
    if num < len(words) - 1:
      outFile.write(word_string + ",")
      # outFile.write(utf8_encoded + ",\n")
    else:
      outFile.write(word_string)
  
  outFile.write("]")
  outFile.close()