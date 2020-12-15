import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { connect } from 'react-redux';

class SetRulesScreen extends React.Component {
  render(){
    return (
      
      <View style={styles.container}>
        {/* TODO: Sets the rule of the card here */}
        {
          //<Text>{JSON.stringify(this.props)}</Text>
          // this.props.availableCards.map((card: Card ) => 
          //   <Text>{card.suite} {card.value}</Text>
          // )
        }
        <Text style={styles.title}>Setting Rules</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

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

export default connect(mapStateToProps)(SetRulesScreen);
