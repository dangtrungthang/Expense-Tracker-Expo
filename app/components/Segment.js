import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as colors from '../config/colors';
export default class Segment extends Component {
    static propTypes = {
        data: PropTypes.array,
        selected: PropTypes.number,
        onPress: PropTypes.func,
        width:PropTypes.number,
        textColorActived:PropTypes.string,
        activedColor:PropTypes.string
    }
    static defaultProps = {
        data: ['Tab1', 'Tab2','Tab3'],
        selected: 0,
        onPress() { },
        width:60,
        textColorActived:'green',
        activedColor:colors.colorHeader
    }

    renderItems(tab, index) {
        const isTabActived = this.props.selected === index;
        const activedColor={backgroundColor:this.props.activedColor}
        const inActivedColor={}
        const styleTabItem={borderRightWidth: 0.5,}
        const widthTabItem={width:this.props.width}
        const textStyle={textAlign:'center',color:this.props.textColorActived}
        return (
            
                <TouchableOpacity key={index}
                    onPress={() => this.props.onPress(index)}
                    style={[ widthTabItem,index==this.props.data.length-1?{}:styleTabItem,isTabActived ? activedColor : inActivedColor]}>
                    <Text style={[textStyle]}>{tab}</Text>
                </TouchableOpacity>
            

        )
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {this.props.data.map((item, index) => this.renderItems(item, index))}

                </View>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',


    },
    wrapper: {
        borderRadius: 4,
        flexDirection: 'row',
        borderWidth: 1,

    },
   
});
