// TODO: give rule a type
export const addRule = (rule: any) => (
    {
      type: 'ADD_RULE',
      payload: rule,
    }
  );
  export const nextCard = (card: Card) => (
    {
      type: 'NEXT_CARD',
      payload: card,
    }
  );
  export const firstCardDrawn = () => ({
    type: 'FIRST_CARD_DRAWN'  
  });

  export const cardsDepleted = () => ({
    type: 'CARDS_DEPLETED'
  });

  export const resetGame = () => ({
    type: 'RESET_GAME'
  });
