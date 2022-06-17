# Hello! #

This is a Wordle clone I created to mimic the original! The game is fully functioning, the only changes that can be made at this point are styling and better sorting the game into different files to make it look a little cleaner. Below will be the instructions for those who have not played, the two api's I utilize, and reasoning as to why I did some of the things I did. 

### `npm start` ###

Runs in localhost:3000
Reloading the page or hitting the Restart button will start a new game with a new word.

# Instructions #

Once the app loads, a random 5-letter word is chosen as the answer. 

Each time you make a guess, the letters of your guess will either be:

Green - This letter is in the correct place in the answer. If you guess "STOMP" and the T is green, that means T is the second letter of the answer. 

Yellow - This letter is in the answer, but not in the right place. Using "STOMP" as our guess again, if the O is yellow, O is in the answer but it is not in the third position. 

Grey - This letter is not in the answer at all.

*Notes/Tips*

***

# Duplicate letters are possible! 

If the answer was "STEEP" and you guessed "CLEAN" the E would turn green but you would receive no hint saying there is another E in the answer. However, if the answer was "APPLE" and you guessed "STEEP" only one of the E's would turn yellow, informing you there is exactly one E in the answer. 

If the answer was "APPLE" and you guessed "PLUMP" both P's would turn yellow, informing you there are at least two P's in the answer. 

***

# You don't need to use green/yellow letters once you know them!

If you know the answer is "S?O??" (S and O are green in previous answer) you do not have to use those letters moving forward. You can guess something like "STOMP" and you will at least have the S and O green again, however, you are allowed to guess "CLEAN" knowing the first and third letters will be wrong. Sometimes it's better to guess 5 new letters to maybe get another green/yellow to use in combination with what you know from previous guesses!

***

# API's used

*https://random-word-api.herokuapp.com/word?length=5* 

This is used to grab the random word that is used as the answer. The 'length' argument can be adjusted or removed, however, for the purpose of this game only 5 letter words are used. 

*https://api.dictionaryapi.dev/api/v2/entries/en/${guess}* 

This checks the user's guess using a dictionary api. If the guess is not a word, an error message will show, prompting a new guess. If the api recognizes the guess as a word, the guess will move forward through the rest of the code. The api returns much more information on the word sent, but for the purpose of this game, we only use it to check the validity of the word.

# Logic and whatnot

*State*

## answer & guess

The first two useStates make the most sense, setting the answer from the first api call and setting the user guess from their input. 

***

## counter

Counter is used to cycle through each of the guesses and appropriately set each guess to answer1, answer2, etc. 

***

## answer1 ... answer6

Answer1-Answer6 are used to set each answer in its respective row. There may be a way to only need one state for answer and set each row to that answer, however, I decided to give each "cell" a unique id to help with setting the color when an answer was submitted, so using a different state and a counter helped a lot. Each cell has a <p> with one letter of its row's answer (e.g. answer[0], answer[1]) so once that state is set, the letters fill in. 

***

## win & lose

Win/Lose are used to end the game, both remove the ability to submit further answers, show a restart button, and end the game. Each has it's own message that displays, and the app uses a ternary to check if the game is won/lost to toggle the display. 

***

## notWord

NotWord is another toggle that displays a message informing the user their guess is not a word and asks them to submit a different guess. This uses the second api, and if that response is an error, notWord is set to true. When valid response returns from that api call, notWord is set to false once again, removing the message. 

***

*Using ids for each cell*

I chose to use ids to help with changing the background colors of the cells. Looping through the guess, if that letter needs to be either green or yellow, I find the unique id using the counter and the index we are on in the loop (either i or j) to find the id (ids are formatted in a way that counter-i/j +1 will find it, e.g. 1-1 through 6-5) and setAttribute to the appropriate color. By doing this, I can also have each <p> filled in with the row's answer, since they are already declared. Doing this does have a large chunk of divs and ps but it solved a lot of issues I ran into. 

*How the guess is checked*

The logic for checking the answers took a few tries to get right, but I used a few tricks to help. The basic logic is as follows: check for letters that should be green, check for answers that should be yellow, mark everything else grey. I'll breakdown each color below. 

## Green Letters

Green letters are the easiest, we simply loop and check if the letter in the guess index matches the answer. We use tempAnswer to make the answer all uppercase without changing the answer itself, and we also declare goldAnswer as an empty string. The purpose of goldAnswer will be explained in the section below. 

If the letter matches it needs to be green, so I use counter and the looping variable to target that specific cell id and set the background color and border color to green. Example:

*document.getElementById(`${counter}-${i+1}`).setAttribute("style", "background-color:green")*
*document.getElementById(`${counter}-${i+1}`).style.borderColor = "green"*

We then add an "!" to goldAnswer. If the letter is not green, we simply add that letter to goldAnswer. 

## Yellow Letters

Yellow letters are where things get a little more complicated. Letters become yellow when they are in the answer but are not in the correct position. The easiest way to do this is to use indexOf and check that it isn't -1. Because we already checked for green letters, we know each remaining letter is either yellow or grey, so as long as the indexOf isn't -1, we can make that letter yellow. 

For the yellow letters I used an array created from goldAnswer to loop through, because when we make a letter yellow we need to remove it as an option for future letters, else we run into bugs with duplicates. When a letter is yellow, we make that index in goldArr equal to "!" so it can't trigger any accidents. If the answer was "OTHER" and our guess was "STOOP", without using an array and overriding the letters with "!", both our O's would be yellow, because both would return an indexOf that isn't -1. By changing the second index (first O) into a non letter, we ensure the second O turns grey as it's supposed to, as the indexOf will be -1 on the second O. 