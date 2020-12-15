import * as React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { Text, View } from '../components/Themed';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextCard } from '../actions/game.actions';

class GameScreen extends React.Component {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category Game</Text>
        {/* {
          getCurrentCard(this.props.availableCards)
        } */}
        <TouchableHighlight onPress={() => this.getNextCard(this.props.availableCards)}>
          {/* <Image style={styles.imagestyle} source={require('./ic_action_name.png')} /> */}
          {/* <Text>{this.currentCard?.suite} {this.currentCard?.value} area</Text> */}

            <CardArea cardAvailableCount={this.props.availableCards.length} currentCard={this.props.currentCard} />
        </TouchableHighlight>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }


 

  // TODO: do better here and handle the undefined type
  getNextCard(cards: Card[]) {
    let currentCard = cards.pop();
    this.props.nextCard(currentCard);
  }
}

function CardArea(props: any) {
  const cardAvailableCount = props.cardAvailableCount;
  const currentCard = props.currentCard;

  // We want to show the back of a card image if we haven't started yet.
  if (cardAvailableCount == 52) {
    return <BackOfCard />;
  }
  return <FrontOfCard currentCard={currentCard}/>;
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
  const { availableCards, rules, currentCard } = state.gameState
  return { availableCards, rules, currentCard }
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    nextCard,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
