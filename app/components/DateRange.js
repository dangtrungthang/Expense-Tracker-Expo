import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import * as colors from '../config/colors';
import M from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment(M);


export default class DateRange extends Component {
    static propTypes = {
        data: PropTypes.array,
        index: PropTypes.number,
        onPress: PropTypes.func,
        onPressPre: PropTypes.func,
        type: PropTypes.string,
        dateStart: PropTypes.any,
        dateEnd: PropTypes.any
    }
    static defaultProps = {
        data: [],
        index: 6,
        onPress() { },
        onPressPre() { },
        type: 'days'
    }
    //  khoảng thời gian  
    rangeDay(type) {
        let range = moment().range("2018-01-01", "2018-12-31")
        let array = []
        let data = []
        switch (type) {
            case 'days':
                array = Array.from(range.by("days"))
                array.map(m => { data.push(m.format("DD-MM-YYYY")) })
                return data
            case 'weeks':
                array = Array.from(range.by('weeks'))
                array.map(m => { data.push(m.format('DD')+'-'+m.day(7).format('DD/MM/YYYY'))})
                return data
            case 'months':
                array = Array.from(range.by("months"))
                array.map(m => { data.push(m.format("MM")) })
                return data
            case 'range':
               
                let start=this.props.dateStart
                let end=this.props.dateEnd
                let SE=start+' - '+end
                array.push('',SE,'')
                return array
            case 'quarter':
                return ['Q1', 'Q2', 'Q3', 'Q4']
            default: return []
        }



    }


    render() {
        let value = this.rangeDay(this.props.type).slice(this.props.index, this.props.index + 3)
        let index = this.props.index

        return (

            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.wrapperItem}
                    onPress={() => this.props.onPressPre(value[0], index)}>
                    <Text style={{ opacity: 0.5 }}>{this.rangeDay(this.props.type).slice(index, index + 3)[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapperItem}
                    onPress={() => this.props.onPress}>
                    <Text >{this.rangeDay(this.props.type).slice(index, index + 3)[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapperItem}
                    onPress={() => this.props.onPressNext(value[2], index)}>
                    <Text style={{ opacity: 0.5 }} >{this.rangeDay(this.props.type).slice(index, index + 3)[2]}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: colors.colorHeader
    },
    wrapperItem: {
        marginHorizontal: 10,
        // width:Dimensions.get('window').width/3,



    }
});
export function indexDateCurrent(type) {
    switch (type) {
        case 'days': var date1, date2
            date1 = new Date()
            date2 = new Date('2018-01-01')
            var res = Math.abs(date1 - date2) / 1000;
            var days = Math.floor(res / 86400);

            return days
        case 'weeks':
        var date1, date2
            date1 = new Date()
            date2 = new Date('2018-01-01')
            var res = Math.abs(date1 - date2) / 1000;
            var days = Math.floor(res / 86400);
           return days/7-1
        case 'months':
            return Number(M(new Date()).format('MM'))-2
        case 'quarter':
            return Math.ceil(Number(M(new Date()).format('MM')) / 3 - 2)
            case 'range':
            return 0
        default: return 5
    }

}