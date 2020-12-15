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