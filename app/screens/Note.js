import React, { Component } from 'react';
import { View, Text,TextInput } from 'react-native';
import HeaderAdd from '../components/HeaderAdd';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
 class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
        note:''
    };
  }

  componentWillUnmount(){
      this.props.onGetNote(this.state.note)
  }

  render() {
    return (
      <View>
          <HeaderAdd
          titleLeft='Cancel'
          onPressLeft={()=>this.props.navigation.goBack()}/>
        <TextInput
        placeholder='Please enter note...'
        placeholderTextColor='#ECECEC'
        multiline
        onChangeText={(text)=>this.setState({note:text})}/>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onGetNote: (note) => {
            dispatch(actions.note(note))
        }
    }
}


export default connect(null, mapDispatchToProps)(Note);