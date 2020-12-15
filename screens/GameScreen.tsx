import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextCard, firstCardDrawn, cardsDepleted } from '../actions/game.actions';

class GameScreen extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category Game</Text>
        {/* {
          getCurrentCard(this.props.availableCards)
        } */}
        <TouchableHighlight onPress={() => this.getNextCard(this.props.availableCards)}>
            <CardArea isFirstCardDrawn={this.props.isFirstCardDrawn} currentCard={this.props.currentCard} isCardsDepleted={this.props.isCardsDepleted} />
        </TouchableHighlight>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }


 

  // TODO: do better here and handle the undefined type
  getNextCard(cards: Card[]) {
    let currentCard = cards.pop();
    if(currentCard == null) {
      this.props.cardsDepleted();
    }
    this.props.nextCard(currentCard);
    this.props.firstCardDrawn();
  }
}

function CardArea(props: any) {
  const isFirstCardDrawn = props.isFirstCardDrawn;
  const currentCard = props.currentCard;
  const isCardsDepleted = props.isCardsDepleted;

  // We want to show the back of a card image if we haven't started yet.
  if (!isFirstCardDrawn) {
    return <BackOfCard />;
  } else if (isCardsDepleted) {
    return <BlankCard />;
  }
  return <FrontOfCard currentCard={currentCard}/>;
}

function BlankCard(props: any) {
  return <Text>Blank Card</Text>;
}

function BackOfCard(props: any) {
  return <Text>Back of Card</Text>;
}

function FrontOfCard(props: any) {
  const currentCard = props.currentCard;
return <Text>Front of Card is {currentCard.suite} {currentCard.value}</Text>;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

const mapStateToProps = (state: any) => {
  const { availableCards, rules, currentCard, isFirstCardDrawn, isCardsDepleted } = state.gameState
  return { availableCards, rules, currentCard, isFirstCardDrawn, isCardsDepleted }
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    nextCard, firstCardDrawn, cardsDepleted
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
