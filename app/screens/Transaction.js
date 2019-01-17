import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import TransactionListItem from '../components/TransactionListItem'
import * as colors from '../config/colors'
import * as firebase from 'firebase'
import { getTransactions } from '../database/firebaseDB';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    firebase.database().ref().on('value', () => {
      alert('da thay doi')
      getTransactions().then((data) => {
        this.setState({ data: data })
      })
    })

  } 
  mapToArrayCategoryIcon(nameIcon) {
    for (i = 0; i < CategoryIcon.length; i++) {
        if (CategoryIcon[i].name === nameIcon) {
            return CategoryIcon[i].icon
        }
    }
}
  renderItem(item) {
    return (
      <TransactionListItem
        category={item.category.name}
        note={item.note}
        isExpense={item.category.isExpense}
        amount={item.amount}
        icon={item.icon}
        onPress={() => {
          this.props.onGetInfoTransaction(item)
          this.props.navigation.navigate('InfoTransaction')

        }}

      />
    )
  }
  componentWillUnmount(){
    firebase.database().ref().off()
}
  render() {
    return (
      <View style={styles.rootContainer}>
        <Header
          onPressAdd={() => this.props.navigation.navigate('AddTransaction')}
          onPressMenuDown={()=>this.props.navigation.navigate('SelectAccount')} />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderItem(item)} />
      </View>

    );
  }
}
const styles = StyleSheet.create({
  rootContainer: {

  },

})
const mapStateToProps = (state) => {
  return {

      account: state.selectAccount,
      category: state.category,
      syncCalculate: state.syncCalculate,
      dateStartEnd:state.dateStartEnd

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      onGetInfoTransaction: (data) => {
          dispatch(actions.getInfoTransaction(data))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction);