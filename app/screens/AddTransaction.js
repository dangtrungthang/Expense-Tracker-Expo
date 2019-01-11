import React, { Component } from 'react';
import { View } from 'react-native';
import HeaderAdd from '../components/HeaderAdd';
import ListSelector from '../components/ListSelector';
import InputComponent from '../components/InputComponent';
import { connect } from 'react-redux';
import Moment from 'moment';
import { addTransaction} from '../database/firebaseDB'
class AddTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            amount:0
            
        }
    }
    onPressAdd = () => {
        const data={
            amount:this.state.amount,
            category:this.props.category.key,
            note:this.props.note,
            date:Moment(this.state.date).format('DD-MM-YYYY'),
            account:this.props.account.key           
        }
     addTransaction(data).then(()=>{})
       
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <HeaderAdd
                    titleLeft='Cancel'
                    titleRight='Save'
                    title='Add Transaction'
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => this.onPressAdd()} />
                
                <InputComponent
                    title='Amount'
                    placeholder='0'
                    icon={require('../assets/icons/VND.png')}
                    keyboardType='decimal-pad'
                    onChangeText={(text)=>this.setState({amount:text})}
                />
                <ListSelector
                    title={this.props.category.name}
                    icon={this.props.category.icon}
                    onPress={() => this.props.navigation.navigate("Category")}
                />
                <ListSelector
                    title={this.props.note?this.props.note:'Note'}
                    onPress={()=>this.props.navigation.navigate('Note')}
                    icon={require('../assets/icons/note.png')} />
                <ListSelector
                    title='Today'
                    icon={require('../assets/icons/calendar.png')}
                    isShowDatePicker={true}
                   
                    onDateChange={(date) => this.setState({ date: date })}>

                </ListSelector>
                <ListSelector
                    title={this.props.account.name}
                    icon={this.props.account.icon}
                    onPress={() => this.props.navigation.navigate("Account")}/>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
       category: state.category,
       account:state.account,
       note:state.note
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
     
    }
  }

export default connect(mapStateToProps,mapDispatchToProps )(AddTransaction);