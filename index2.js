class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }

    initialize() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    addCard(card) {
        this.hand.push(card);
    }

    playCard() {
        return this.hand.pop();
    }
}

class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
    }

    startGame() {
        this.deck.initialize();
        this.deck.shuffle();

        while (this.deck.cards.length > 0) {
            this.player1.addCard(this.deck.dealCard());
            this.player2.addCard(this.deck.dealCard());
        }

        this.playRound();
    }

    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();

        console.log(`${this.player1.name} plays: ${card1}`);
        console.log(`${this.player2.name} plays: ${card2}`);

        this.compareCards(card1, card2);
    }

    compareCards(card1, card2) {
        const rank1 = card1.rank;
        const rank2 = card2.rank;

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

        if (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            this.playRound();
        } else {
            this.endGame();
        }
    }

    endGame() {
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
const game = new Game('Player 1', 'Player 2');
game.startGame();
