import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{marginTop:42}}>
        <TouchableOpacity onPress={()=>{
          firebase.auth().signOut()
        }}>
        <Text> Log Out </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}
