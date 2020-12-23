import * as React from 'react';
import { StyleSheet, TouchableHighlight, Button, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextCard, firstCardDrawn, cardsDepleted, resetGame } from '../actions/game.actions';

class GameScreen extends React.Component<any> {

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category Game</Text>
        <Button
          onPress={() => this.resetGame()}
          title='Reset Game'
          color="#841584"
          accessibilityLabel='Reset Game'/>
        
        <TouchableHighlight onPress={() => this.getNextCard(this.props.availableCards)}>
          <Image source={require('../assets/images/card/' + this.props.currentCard.image)} style={styles.card}/>
        </TouchableHighlight>
        <CardArea isFirstCardDrawn={this.props.isFirstCardDrawn} currentCard={this.props.currentCard} isCardsDepleted={this.props.isCardsDepleted} currentRule={this.props.currentRule} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

  resetGame() {
    this.props.resetGame();
  }


  // TODO: do better here and handle the undefined type
  getNextCard(cards: Card[]) {
    let currentCard = cards.pop();
    if(currentCard == null) {
      this.props.cardsDepleted();
    } else {
      this.props.nextCard(currentCard);
    }
    
    if(!this.props.isFirstCardDrawn) {
      this.props.firstCardDrawn();
    }
  }
}

function CardArea(props: any) {
  const isFirstCardDrawn = props.isFirstCardDrawn;
  const currentCard = props.currentCard;
  const isCardsDepleted = props.isCardsDepleted;
  const currentRule = props.currentRule;

  // We want to show the back of a card image if we haven't started yet.
  if (!isFirstCardDrawn) {
    return <BackOfCard />;
  } else if (isCardsDepleted) {
    return <BlankCard />;
  }
  return <FrontOfCard currentCard={currentCard} currentRule={currentRule}/>;
}

function BlankCard(props: any) {
  return <Text>Blank Card</Text>;
}

function BackOfCard(props: any) {
  return <Text>Back of Card</Text>;
}

function FrontOfCard(props: any) {
  const currentCard = props.currentCard;
  //const currentRule = props.currentRule;
  return (
    <div>
      <Text>Front of Card is {currentCard.suite} {currentCard.value}</Text>
      <hr />
      {/* <Text> Rule is {currentRule.ruleTitle} - {currentRule.ruleDescription}</Text> */}
    </div>
  );
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
  card: {
    width:250,
    height:350
  }
});

const mapStateToProps = (state: any) => {
  const { availableCards, rules, currentCard, isFirstCardDrawn, isCardsDepleted, currentRule } = state.gameState
  return { availableCards, rules, currentCard, isFirstCardDrawn, isCardsDepleted, currentRule }
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
    nextCard, firstCardDrawn, cardsDepleted, resetGame
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
