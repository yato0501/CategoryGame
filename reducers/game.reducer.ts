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
  return cards;
}

const INITIAL_STATE: State = {
  availableCards: initialAvailableCards(),
  seenCards: [],
  rules: []
};



const gameReducer = (state = INITIAL_STATE, action : any) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  gameState: gameReducer
});