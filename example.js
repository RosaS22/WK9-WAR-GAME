//Global Constants, Values, and Arrays

const suits = ["♣", "♠", "♥", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let player1Deck, player2Deck;
const CARD_VALUES = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
};
let player1Card
let player2Card
let player1DeckCount =''
let player2DeckCount = ''
let roundCount = ''
let reshuffleCount = ''
let reRoundCount = ''
// Classes

class Deck {
    constructor(cards = deckOne()) {     // cards equal the function so that the cards passing through don't create a new deck for every card
        this.cards = cards
    }
    pop() {
        return this.cards.shift();
    }
    push(card) {
        this.cards.push(card);
    }
    shuffle() {     // use the de-facto unbiased shuffle algorithm called the Fisher-Yates (aka Knuth) Shuffle.
        let currentIndex = this.cards.length,  randomIndex;
        while (currentIndex > 0) {     // While there remain elements to shuffle.
          randomIndex = Math.floor(Math.random() * currentIndex);     // Pick a remaining element.
          currentIndex--;
          [this.cards[currentIndex], this.cards[randomIndex]] = [     // And swap it with the current element.
            this.cards[randomIndex], this.cards[currentIndex]];
        }
        return this.cards;
      }
}

class Card {
    constructor (suit, value) {
        this.suit = suit
        this.value = value
    }
    describe() {
        return `${this.value} of ${this.suit}`;
    }
} 

// Major Functions

document.addEventListener('click', () => {     //start a new game with every click on the webpage
    startGame();
    })


startGame()
function startGame() {
    console.log(`New Game!`);
    roundCount = 0     //needed to include these for the 'click' startGame(); it would not reset, so I ensured the count was back at zero at start
    reshuffleCount = 0
    reRoundCount = 0
    let deck = new Deck();
    deck.shuffle();
    let deckMidpoint = Math.ceil(deck.cards.length / 2);
    player1Deck = new Deck (deck.cards.slice(0, deckMidpoint));     //determining the player's decks by slicing the OG deck in half
    player2Deck = new Deck (deck.cards.slice(deckMidpoint, deck.cards.length));
    checkCards();     //starts the loop between checkCards() and nextRound()
}

function nextRound() {     //a natural win happens once ever 10 or so games, otherwise, the reshuffle limit forces the game to finish
    if (player1Deck.cards.length == 0 || player2Deck.cards.length == 0 || reshuffleCount == 5) {     //had to have a limit, so added a reshuffle
        declareWinner();     //declares winner if any of the above conditions have been met 
    } else if (reRoundCount == 300) {
        player1Deck.shuffle();     //shuffles the player's decks, in case there is a draw loop happening, or other reason
        player2Deck.shuffle();
        reshuffleCount++;     //reshuffle count referenced earlier. created because it was easily exceeding the console's capacity
        reRoundCount = 0;     // restarting the reRound count, counts the rounds between when the decks are reshuffled
        checkCards();
    } else {
        checkCards();
    }
}

function checkCards() {
    roundCount++;     //increases the roundcount by 1
    reRoundCount++;     // increases the reRoundCount by 1
    let player1Card = player1Deck.pop();    //references the pop() function in the Deck Class
    let player2Card = player2Deck.pop();
    if (CARD_VALUES[player1Card.value] > CARD_VALUES[player2Card.value]) {     //Player1 Wins
        player1Deck.push(player1Card);      //pushes the cards to player 1 when they win
        player1Deck.push(player2Card);
        console.log(`Player 1 Wins`);
    } else if (CARD_VALUES[player1Card.value] < CARD_VALUES[player2Card.value]){     //Player2 Wins
        player2Deck.push(player1Card);
        player2Deck.push(player2Card) ;   
        console.log(`Player 2 Wins`) ;   
    }else {     //draw
        player1Deck.push(player1Card);     //returns cards to the bottom of their decks in a draw
        player2Deck.push(player2Card);
        console.log(`Draw`);
    }

    console.log(`
    Round: ${roundCount}
    Player 1: ${player1Card.describe()}
    Deck: ${player1Deck.cards.length}
    -------------
    Player 2: ${player2Card.describe()}
    Deck: ${player2Deck.cards.length}
    
    `)
    nextRound();     //sends back to the nextRound to determine how to proceed
}



//Reference Functions

function declareWinner() {
    if (player1Deck.cards.length > player2Deck.cards.length) {     //utilizing the value of the deck amount to determine winners
        console.log(`
        After ${roundCount} rounds,
        Player 1 Wins the War!`);

    } else if (player1Deck.cards.length < player2Deck.cards.length) {
        console.log(`
        After ${roundCount} rounds,
        Player 2 Wins the War!`);
    } else {
        console.log(`
        After ${roundCount} rounds, 
        It's a Draw! No one Wins the War!`)
    }
}

function deckOne() {
    return suits.flatMap(suit => {    // flatmap maps all array elements within it to create a new, singular, flat array, without it there would be 4 arrays
        return values.map(value => {     // here, the values are looped through to create an array
            return new Card(suit, value);     // new card is created for every mapped element, with a suit, and a value applied to it
        })
    })
}
