import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colors from '../config/colors'
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                    style={{flexDirection:'row'}}
                    onPress={this.props.onPressMenuDown}>
                        <MaterialCommunityIcons name='menu-down' size={30} color={'white'} />
                        <Image  style={{width:30,height:30}} source={require('../assets/icons/symbol.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.titleHeader}> Add Transactions</Text>
                    <TouchableOpacity onPress={this.props.onPressAdd}>
                        <MaterialIcons name='add' size={30} color={'white'} />
                    </TouchableOpacity>


                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    rootContainer: {

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.colorHeader,
        height: 80
    },
    titleHeader:{
        fontSize:20,
        color:colors.titleHeader
    }
})