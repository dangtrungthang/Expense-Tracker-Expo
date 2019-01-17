import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { CategoryIcon } from '../config/icon';
import { AccountIcon } from '../config/icon';
import { DatePicker } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import { getAccount} from '../database/firebaseDB';
import * as firebase from 'firebase'
class InfoTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bool:true,bool2:true,
            dataAccount: [],
            account: '',
            category:this.props.data.category,
            amount: this.props.data.amount,
            note: this.props.data.note,
            date: this.props.data.date
        };
    }
    mapToArrayCategoryIcon(nameIcon, data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].name === nameIcon) {
                return data[i].icon
            }
        }
    }
    mapToArray(id, data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].key == id) {
                this.setState({ account: data[i] })
            }
        }
    }
    getAccount() {
        firebase.database().ref().on('value', () => {
            getAccount().then((data) => {
              this.mapToArray(this.props.data.account, data)
            })
          })
    }
    onSave() {

    }
    onDelete() {
       
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.category!=this.props.category){
            this.setState({category:this.props.category,bool:false})
        }
        if(prevProps.account!=this.props.account){
            this.setState({account:this.props.account,bool2:false})
        }
    }
    componentWillMount() {
        this.getAccount()
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <TouchableOpacity style={{marginLeft:15}}
                    onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{color:'white'}}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Info Transaction</Text>
                    <TouchableOpacity style={styles.btnSave}>
                        <Text style={{ color: 'white' }}
                            onPress={() => this.onSave()}
                        >Save</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.wrapperRow, { marginTop: 15 }]}
                onPress={()=>this.props.navigation.navigate('Category')}>
                    <Image style={styles.icon}
                        source={this.state.bool?this.state.category.icon:this.state.category.icon} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.category.name} </Text>
                </TouchableOpacity>
                <View style={styles.wrapperRow}>
                    <Image style={styles.icon} />
                    <TextInput
                        style={{
                            fontSize: 25, marginLeft: -12,
                            color: this.props.data.category.isExpense ? 'red' : 'green',

                        }}

                        onChangeText={(text) => this.setState({ amount: text })}
                        value={this.state.amount} />
                </View>
                <View style={{ borderBottomWidth: 0.5, marginLeft: 85, opacity: 0.5 }} />
                <TouchableOpacity style={styles.wrapperRow}>
                    <MaterialCommunityIcons name='calendar' size={30} style={{ marginRight: 30 }} />
                    <DatePicker
                        placeHolderTextStyle={{ color: "#d3d3d3", fontWeight: 'normal', marginLeft: -10 }}
                        textStyle={{ color: 'black' }}
                        onDateChange={(date) => this.setState({ date: Moment(date).format('DD-MM-YYYY') })}
                        placeHolderText={this.state.date}
                        // formatChosenDate={(date)=>Moment(date).locale('vn').format('ddd DD, MM, YYYY')} 
                        />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.wrapperRow, { marginTop: 10 }]}
                 onPress={()=>this.props.navigation.navigate('Account')}>
                    <Image style={{ width: 30, height: 30, marginRight: 20 }}
                        source={this.state.bool2?this.state.account.icon:this.props.account.icon} />
                    <Text style={{ marginLeft: 10 }}>{this.state.account.name} </Text>
                </TouchableOpacity>
                <View style={styles.wrapperRow}>
                    <Image style={{ width: 30, height: 30, marginRight: 20 }} source={require("../assets/icons/note.png")} />
                    <TextInput
                        style={{
                            marginLeft: -2,

                        }}

                        onChangeText={(text) => this.setState({ note: text })}
                        value={this.state.note} />
                </View>

                <View style={styles.buttonDelete}>
                    <TouchableOpacity style={{ height: 40, justifyContent: 'center' }}>
                        <Text style={{ color: 'red', }}
                            onPress={() => this.onDelete()}>Delete transaction</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2ecc71',
        height: 85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    headerText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 20,

    }, btnSave: {
        marginRight: 15
    },
    wrapperRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    }, icon: { width: 40, height: 40, marginRight: 20 },
    buttonDelete: {
        alignItems: 'center',
        marginTop: 20,
        borderTopWidth: 30,
        borderColor: '#E1E5E8',
        borderBottomWidth: 500
    }
});
const mapStateToProps = (state) => {
    return {
        data: state.getInfoTransaction,
        category: state.category,
        account: state.account,


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onGetInfoTransaction: (data) => {
            dispatch(actions.getInfoTransaction(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoTransaction);