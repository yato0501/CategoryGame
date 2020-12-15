interface State {
    availableCards: Card[],
    seenCards: Card[],
    rules: Rule[],
    currentCard: Card,
    isFirstCardDrawn: boolean,
    isCardsDepleted: boolean
}