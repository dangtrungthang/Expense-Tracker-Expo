import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as firebase from 'firebase'
export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  componentWillMount() {
    const uID=firebase.auth().currentUser.uid
    firebase.database().ref(uID+'/Account').on('value', (snap) => {
      const data = []
      snap.forEach((doc) => {
       data.push({
         key:doc.key,
        name:doc.toJSON().name,
        icon:doc.toJSON().icon
       })
      })
      this.setState({data})
    })
  }
  render() {
    return (
      <View style={{ marginTop: 44 }}>
        <FlatList
        data={this.state.data}
          renderItem={({ item }) => {
            return (
              <Text>{item.name}</Text>
            )
          }} 
          keyExtractor={(item)=>item.key}/>
      </View>
    );
  }
}
