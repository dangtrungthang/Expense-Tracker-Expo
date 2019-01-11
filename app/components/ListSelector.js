import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../config/colors';
import PropTypes from 'prop-types';
import { DatePicker } from 'native-base';
export default class ListSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
showDatePicker(isDate){
    switch(isDate){
        case true:
        return(
            <View style={{flex:3}}>
                <DatePicker 
             placeHolderTextStyle={{ color: "#d3d3d3",marginLeft:-10 }}
             onDateChange={this.props.onDateChange}/>
            </View>
            
        )
        case false:
        return(
            <Text style={styles.configText}>{this.props.title}</Text>

        )
    }
    
}
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
                <Image style={styles.configIcon} source={this.props.icon} />

                <View style={styles.wrapper}>
                    {this.showDatePicker(this.props.isShowDatePicker)}
                    <MaterialIcons
                        size={28}
                        name={"chevron-right"}
                        style={{opacity:0.2}}
                    />
                </View>

            </TouchableOpacity>

        );
    }
}
ListSelector.defaultProps={
    isShowDatePicker:false
}
ListSelector.propTypes = {
    title:PropTypes.string,
    onPress:PropTypes.func,
    icon:PropTypes.number,
    isShowDatePicker:PropTypes.bool
 }
 const styles = StyleSheet.create({
     container: {
         flexDirection: 'row',
         marginVertical: 10,
     },
     wrapper: {
         flexDirection: 'row',
         borderBottomColor: 'gray',
         borderBottomWidth: StyleSheet.hairlineWidth,
         flex:1,
         marginLeft:10,
     },
     configIcon: {
         width: 40,
         height: 40,
         marginLeft: 10
     },
     configText: {
         fontSize: 20,       
         flex: 3,
         
         
     }
 })
