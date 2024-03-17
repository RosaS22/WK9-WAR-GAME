// Class representing a playing card
class Card {
  constructor(suit, rank) {
      this.suit = suit; // Suit of the card
      this.rank = rank; // Rank of the card
  }

  // Method to represent the card as a string
  toString() {
      return `${this.rank} of ${this.suit}`;
  }
}

// Class representing a deck of cards
class Deck {
  constructor() {
      this.cards = []; // Array to store cards in the deck
  }

  // Method to initialize the deck with standard 52 cards
  initialize() {
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']; // Possible suits
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']; // Possible ranks

      // Generating all possible cards and adding them to the deck
      for (const suit of suits) {
          for (const rank of ranks) {
              this.cards.push(new Card(suit, rank));
          }
      }
  }

  // Method to shuffle the cards in the deck
  shuffle() {
      // Fisher-Yates shuffle algorithm
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Swapping cards
      }
  }

  // Method to deal a card from the top of the deck
  dealCard() {
      return this.cards.pop(); // Removing and returning the last card in the deck
  }
}

// Class representing a player
class Player {
  constructor(name) {
      this.name = name; // Name of the player
      this.hand = []; // Array to store player's hand of cards
  }

  // Method to add a card to the player's hand
  addCard(card) {
      this.hand.push(card);
  }

  // Method to play a card from the player's hand
  playCard() {
      return this.hand.pop(); // Removing and returning the last card in the player's hand
  }
}

// Class representing a game of cards
class Game {
  constructor(player1Name, player2Name) {
      this.player1 = new Player(player1Name); // First player
      this.player2 = new Player(player2Name); // Second player
      this.deck = new Deck(); // Deck of cards
  }

  // Method to start the game
  startGame() {
      this.deck.initialize(); // Initializing the deck
      this.deck.shuffle(); // Shuffling the deck

      // Dealing cards to each player until the deck is empty
      while (this.deck.cards.length > 0) {
          this.player1.addCard(this.deck.dealCard());
          this.player2.addCard(this.deck.dealCard());
      }

      this.playRound(); // Starting the first round
  }

  // Method to play a round of the game
  playRound() {
      const card1 = this.player1.playCard(); // Player 1 plays a card
      const card2 = this.player2.playCard(); // Player 2 plays a card

      // Displaying the cards played by each player
      console.log(`${this.player1.name} plays: ${card1}`);
      console.log(`${this.player2.name} plays: ${card2}`);

      this.compareCards(card1, card2); // Comparing the cards played
  }

  // Method to compare the cards played in a round
  compareCards(card1, card2) {
      const rank1 = card1.rank; // Rank of card played by player 1
      const rank2 = card2.rank; // Rank of card played by player 2

      // Determining the winner of the round
      if (rank1 === rank2) {
          console.log('It\'s a tie!');
      } else if (rank1 > rank2) {
          console.log(`${this.player1.name} wins the round!`);
          this.player1.addCard(card1);
          this.player1.addCard(card2);
      } else {
          console.log(`${this.player2.name} wins the round!`);
          this.player2.addCard(card1);
          this.player2.addCard(card2);
      }

      // Checking if both players have cards remaining
      if (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
          this.playRound(); // Playing the next round
      } else {
          this.endGame(); // Ending the game if a player runs out of cards
      }
  }

  // Method to end the game and determine the winner
  endGame() {
      // Comparing the number of cards each player has
      if (this.player1.hand.length > this.player2.hand.length) {
          console.log(`${this.player1.name} wins the game!`);
      } else if (this.player2.hand.length > this.player1.hand.length) {
          console.log(`${this.player2.name} wins the game!`);
      } else {
          console.log('It\'s a tie!');
      }
  }
}

// Example usage
const game = new Game('Player 1', 'Player 2'); // Creating a new game instance with two players
game.startGame(); // Starting the game
