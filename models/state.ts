interface State {
    availableCards: Card[],
    seenCards: Card[],
    rules: ValueRule[],
    currentCard: Card,
    isFirstCardDrawn: boolean,
    isCardsDepleted: boolean,
    currentRule: ValueRule
}