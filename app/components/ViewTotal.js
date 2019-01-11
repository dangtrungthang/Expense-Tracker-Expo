import React, { Component } from 'react';
import { View, Text,StyleSheet,Dimensions } from 'react-native';

export default class ViewTotal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperColumnLeft}>
            <Text>Opending Blance</Text>
            <Text>Ending Blance</Text>
        </View>
        <View style={styles.wrapperColumnRight}>
            <Text>{this.props.opendingBlance}</Text>
            <Text>{this.props.endingBlance}</Text>
            <View style={styles.line}/>
            <Text>{this.props.netIncome}</Text>
            <View style={styles.space}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
        flexDirection: 'row',
        marginTop:10
    },
    wrapperColumnLeft:{
        flexDirection:'column'
    },
    wrapperColumnRight:{
        flexDirection:'column',
        flex: 1,
        alignItems: 'flex-end',
    },
    line:{
        borderBottomWidth:0.5,
        width:100,
        height:5,
        
    },
    space:{
        backgroundColor:'#E1E5E8',
        width:Dimensions.get('window').width,
        height:20,marginRight: -10,marginTop: 10,
        
    }
})