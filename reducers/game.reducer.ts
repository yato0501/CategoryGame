import { combineReducers } from 'redux';


const suites: string[] = ['club', 'diamond', 'spade', 'heart'];
const valueRule: ValueRule[] = [{value: 'a', ruleTitle: 'Waterfall', ruleDescription: 'Once an ace is drawn, everyone starts to drink. The player who picked the card can stop whenever he/she wants, but others have to keep drinking. Once he/she decides to stop, the player on his/her right can stop and so on. The last player in the ring has to finish last.'},
{value: '2', ruleTitle: 'Give 2', ruleDescription: 'The player can make another player take two sips'},
{value: '3', ruleTitle: 'Drink 3', ruleDescription: 'The player who picks this card has to drink 3 sips'},
{value: '4', ruleTitle: 'Girls drink!', ruleDescription: 'All the girls in the game have to drink!'},
{value: '5', ruleTitle: 'Bust a jive!', ruleDescription: 'The person who picks the card has to come up with a dance move. The next person has to do that dance move and add to it. This continues until someone makes a mistake and has to drink.'},
{value: '6', ruleTitle: 'Guys drink', ruleDescription: 'All the guys in the game have to drink!'},
{value: '7', ruleTitle: 'Heaven', ruleDescription: 'All players reach for the sky. The last person to do so has to drink.'},
{value: '8', ruleTitle: 'Mate', ruleDescription: 'The player who picks the card chooses another player to be their mate. This means when one of them drinks they both drink.'},
{value: '9', ruleTitle: 'Bust a Rhyme', ruleDescription: 'The player who picks this card says a word and all the players after him/her has to say a word that rhymes with this word. First one to not come up with a word has to drink.'},
{value: '10', ruleTitle: 'Categories', ruleDescription: 'The player who picked the card chooses a category. Then everyone goes around and says something that fits in the chosen category. Whoever cannot think of anything in the category has to drink. Good categories to use include types of liquor, car companies, and types of cereal.'},
{value: 'j', ruleTitle: 'Thumb', ruleDescription: 'Drawing a Jack makes you the Thumb Master. Whenever you choose you can put your thumb on the table causing all players to race to do the same. Last player to do so has to drink. You remain Thumb Master until a new Jack is drawn.'},
{value: 'q', ruleTitle: 'Question', ruleDescription: 'Ask a question from any other player, who must in turn ask a different player a question. Whoever doesn’t answer with a question has to drink, and you can’t ask a question back to the person who last asked you.'},
{value: 'k', ruleTitle: 'New rule', ruleDescription: 'The player who picks a King gets to create a new rule for the game. If the rule is not followed the person who broke the rule has to drink. A good rule is to for example only be allowed to hold the drink in your left hand.'}];

/*
10: Categories – The player who picked the card chooses a category. Then everyone goes around and says something that fits in the chosen category. Whoever cannot think of anything in the category has to drink. Good categories to use include types of liquor, car companies, and types of cereal.
Jack: Thumb – Drawing a Jack makes you the Thumb Master. Whenever you choose you can put your thumb on the table causing all players to race to do the same. Last player to do so has to drink. You remain Thumb Master until a new Jack is drawn.
Queen: Question – Ask a question from any other player, who must in turn ask a different player a question. Whoever doesn’t answer with a question has to drink, and you can’t ask a question back to the person who last asked you.
King: New rule – The player who picks a King gets to create a new rule for the game. If the rule is not followed the person who broke the rule has to drink. A good rule is to for example only be allowed to hold the drink in your left hand.
Ace: Waterfall – Once an ace is drawn, everyone starts to drink. The player who picked the card can stop whenever he/she wants, but others have to keep drinking. Once he/she decides to stop, the player on his/her right can stop and so on. The last player in the ring has to finish last.
*/

const initialAvailableCards = () : Card[] => {
  let cards : Card[] = [];
  suites.forEach(suite => {
    valueRule.forEach(value => {
      let valueOfImage = value.value === '10' ? 'T' : value.value.toUpperCase();
      cards.push({suite: suite, value: value.value, image: valueOfImage + suite.substr(0, 1).toUpperCase() + '.svg'});
    });
  });

  cards = shuffleCards(cards);

  return cards;
}

// citation: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
function shuffleCards(cards: Card[]): Card[] {
  for(let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  return cards;
}

const INITIAL_STATE: State = {
  availableCards: initialAvailableCards(),
  seenCards: [],
  rules: valueRule,

  //images comes from https://www.me.uk/cards/makeadeck.cgi?view
  currentCard: {suite: '', value: '', image: '1B.svg'},
  currentRule: {value: '', ruleTitle: '', ruleDescription: ''},
  isFirstCardDrawn: false,
  isCardsDepleted: false,
};



const gameReducer = (state = INITIAL_STATE, action : any) => {
  switch (action.type) {
    case 'NEXT_CARD': {
      let seenCards = [...state.seenCards];
      seenCards.push(action.payload);
      let currentRule = valueRule.find(x => x.value === action.payload.value);
      return {...state, currentCard: action.payload, seenCards: seenCards, currentRule: currentRule};
    }
    case 'FIRST_CARD_DRAWN':
      return {...state, isFirstCardDrawn: true};
    case 'CARDS_DEPLETED':
      return {...state, isCardsDepleted: true};
    case 'RESET_GAME':
      return {...INITIAL_STATE, availableCards: initialAvailableCards()};
    default:
      return state;
  }
};

export default combineReducers({
  gameState: gameReducer
});