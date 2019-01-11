import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';

import Header from '../components/Header'
import * as colors from '../config/colors'
import * as firebase from 'firebase'
import { getAccount } from '../database/firebaseDB'
export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    firebase.database().ref().on('value', () => {
      getAccount().then((account) => {
        this.setState({ data: account })
      })
    })

  }
  render() {
    return (
      <View style={styles.rootContainer}>
       <Header
       onPressAdd={()=>this.props.navigation.navigate('AddTransaction')}/>
       <FlatList
       data={this.state.data}
       renderItem={({item})=>{
         return(
           <Text>{item.name}</Text>
         )
       }}/>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  rootContainer: {

  },
 
})
