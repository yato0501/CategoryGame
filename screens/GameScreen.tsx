import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { connect } from 'react-redux';

class GameScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category Game</Text>
        {
          getCurrentCard(this.props.availableCards)
        }
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }
}

// TODO: do better here and handle the undefined type
function getCurrentCard(cards: Card[]) {
  let card = cards.pop();
  return <Text>{card?.suite} {card?.value}</Text>
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
  const { availableCards, rules } = state.gameState
  return { availableCards, rules }
};

export default connect(mapStateToProps)(GameScreen);
