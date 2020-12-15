import { combineReducers } from 'redux';


const suites: string[] = ['club', 'diamond', 'spade', 'heart'];
const values: string[] = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];

const initialAvailableCards = () : Card[] => {
  let cards : Card[] = [];
  suites.forEach(suite => {
    values.forEach(value => {
      cards.push({suite: suite, value: value});
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
  rules: [],
  currentCard: {suite: '', value: ''},
  isFirstCardDrawn: false,
  isCardsDepleted: false
};



const gameReducer = (state = INITIAL_STATE, action : any) => {
  switch (action.type) {
    case 'NEXT_CARD':
      return {...state, currentCard: action.payload};
    case 'FIRST_CARD_DRAWN':
      return {...state, isFirstCardDrawn: true};
    case 'CARDS_DEPLETED':
      return {...state, isCardsDepleted: true};
    case 'RESET_GAME':
      return {...INITIAL_STATE};
    default:
      return state;
  }
};

export default combineReducers({
  gameState: gameReducer
});