import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';

export default class TransactionListItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Image style={styles.icon}
        source={this.props.icon}/>
        <View style={styles.wrapperText}>
          <Text style={{fontWeight:'bold'}}>{this.props.category}</Text>
          <Text>{this.props.note}</Text>
        </View>
        <View style={styles.wrapperAmount}>
           <Text style={[this.props.isExpense?styles.expense:styles.income]}>{this.props.amount}</Text>
        </View>
      </TouchableOpacity>

    );
  }
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  icon:{
    width:45,
    height:45,
    marginRight: 15,
    
  },
  wrapperText:{
   
  },
  expense:{
    color:'red',
     },
  income:{
    color:'green',
  
  },
  wrapperAmount:{
    alignItems:'flex-end',
    
    flex:1
  }
});
