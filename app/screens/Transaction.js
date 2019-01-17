import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { ActionSheet } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TransactionListItem from '../components/TransactionListItem'
import * as colors from '../config/colors'
import * as firebase from 'firebase'
import { getTransactions, getUser } from '../database/firebaseDB';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Moment from 'moment';
import DateRange, { indexDateCurrent } from '../components/DateRange';
var BUTTONS = ["Xem theo ngày", "Xem theo tuần", "Xem theo tháng", "Xem theo quý", "Khoảng thời gian", "Cancel"];
const dateCurrent = Moment().format('DD-MM-YYYY')
const monthCurrent = Moment(new Date()).format('MM')
const weekCurrent = Moment().startOf("isoWeek").format('DD') + Moment().endOf("isoWeek").format('DD/MM/YYYY')
const quarterCurrent = Math.ceil(Moment(new Date()).format('MM') / 3)
class Transaction extends Component {
  constructor(props) {
    super(props);
    this.actionSheet = null;
    this.state = {
      data: [],
      opendingAllAccount: 0,
      indexRange: indexDateCurrent('weeks'),
      typeRange: 'weeks',
      date: weekCurrent,
      dateStart: '27-12-2015',
      dateEnd: '30-12-2018',
      endingBlance: ''
    };
  }
  componentDidMount() {
    
    this.loadData()
  }
  showActionSheet() {
    if (this.actionSheet != null) {
      this.actionSheet._root.showActionSheet(
        {
          options: BUTTONS,
          title: "Select action"
        },
        buttonIndex => {
          switch (BUTTONS[buttonIndex]) {
            case 'Xem theo ngày': this.setState({ typeRange: 'days', indexRange: indexDateCurrent('days'), date: dateCurrent }); break;
            case 'Xem theo tháng': this.setState({ typeRange: 'months', indexRange: indexDateCurrent('months'), date: monthCurrent }); break;
            case 'Xem theo tuần': this.setState({ typeRange: 'weeks', indexRange: indexDateCurrent('weeks'), date: weekCurrent }); break;

            case 'Xem theo quý': this.setState({ typeRange: 'quarter', indexRange: indexDateCurrent('quarter'), date: quarterCurrent }); break;
            case 'Khoảng thời gian': this.setState({ typeRange: 'range', indexRange: 0 }); this.props.navigation.navigate('CustomDate'); break;
          }
        }
      );
    }
  }
  loadData() {
    getUser().then((uID) => {
      firebase.database().ref(uID).on('value', () => {
        var dataTemp = []
        getTransactions().then((data) => {
          for (i = 0; i < data.length; i++) {
            if (data[i].account === this.props.account.key) {
              dataTemp.push(data[i])
            } if (this.props.account.key === '1111') {
              dataTemp = data
            }
          }
          this.setState({ data: dataTemp })
        })
      })
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account != this.props.account) {
      this.loadData()
    }
    if (prevProps.syncCalculate != this.props.syncCalculate) {
      this.loadData()
    }
    if (prevProps.dateStartEnd != this.props.dateStartEnd) {
      this.setState({
          dateStart:this.props.dateStartEnd.start,
          dateEnd:this.props.dateStartEnd.end,
   },()=>{
    this.loadData()
       //this.loadEndingBlance(this.state.dataTransactions)
   })
   


   }
   if (this.state.date != prevState.date) {
    this.loadData()
       //this.loadEndingBlance(this.state.dataTransactions)
   }
   if (this.state.typeRange != prevState.typeRange) {
    this.loadData()
      // this.loadEndingBlance(this.state.dataTransactions)
   }
  }
  renderItem(item) {



var date = ''

        switch (this.state.typeRange) {
            case 'days':
                date = item.date; break
            case 'months':
                date = item.date.slice(3, 5); break
            case 'weeks':
                date = parseInt(item.date.slice(0, 2));
                var weekSelect = parseInt(this.state.date.slice(0, 2))
                if (weekSelect <= date && date <= Number(weekSelect + 6))
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
                break;
            case 'quarter':
                date = 'Q' + Math.ceil(item.date.slice(3, 5) / 3)
            case 'range':
            
            date=new Date(Moment(item.date,'DD-MM-YYYY').format('MM/DD/YYYY'))
            var start=new Date(Moment(this.state.dateStart,'DD-MM-YYYY').format('MM/DD/YYYY'))
            var end=new Date(Moment(this.state.dateEnd,'DD-MM-YYYY').format('MM/DD/YYYY'))
            if(date>start&&date<end){
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
                
            }}

    /////
    // return (
    //   <TransactionListItem
    //     category={item.category.name}
    //     note={item.note}
    //     isExpense={item.category.isExpense}
    //     amount={item.amount}
    //     icon={item.icon}
    //     onPress={() => {
    //       this.props.onGetInfoTransaction(item)
    //       this.props.navigation.navigate('InfoTransaction')

    //     }}

    //   />
    // )
  }
  componentWillUnmount() {
    firebase.database().ref().off()
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <Header
          onPressAdd={() => this.props.navigation.navigate('AddTransaction')}
          onPressMenuDown={() => this.props.navigation.navigate('SelectAccount')} />
         <DateRange
                    dateStart={this.state.dateStart}
                    dateEnd={this.state.dateEnd}
                    type={this.state.typeRange}
                    index={this.state.indexRange}
                    onPressPre={(value, index) => {
                        if (index > 0) {
                            this.setState({ indexRange: index - 1, date: value })


                        }
                    }}
                    onPressNext={(value, index) => {
                        this.setState({ indexRange: index + 1, date: value })

                    }} />
        <TouchableOpacity onPress={() => this.showActionSheet()}>
          <ActionSheet ref={(c) => { this.actionSheet = c; }} />
          <MaterialIcons name='more-vert' size={30} color={'white'} />
        </TouchableOpacity>
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
    dateStartEnd: state.dateStartEnd

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