import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import {SwipeRow,Button,Icon} from 'native-base';
import HeaderAdd from '../components/HeaderAdd';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {AccountIcon} from '../config/icon';
import { getAccount,deleteItem } from '../database/firebaseDB'
import * as firebase from 'firebase'

 class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],          
            icon:AccountIcon
           


        };
    }
    componentDidMount() {
        firebase.database().ref().on('value', () => {
            getAccount().then((account) => {
              this.setState({ data: account })
            })
          })
    }
    componentWillUnmount(){
        firebase.database().ref().off()
    }
   
    removeAccount(item){
        Alert.alert(
            'Cảnh báo',
            'Xoá account này bạn sẽ xoá luôn các giao dịch sử dụng chúng. Bạn có chắc muốn xoá không',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        deleteItem(item.key,'Account').then(() => {

                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }
    renderItems(item) {

        return (
            <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-75}
            left={
              <Button success onPress={() => {
                  this.props.onGetInfoAccount(item)
                  this.props.navigation.navigate('EditAccount')
                  }}>
                <Icon active name="ios-information-circle" />
              </Button>
            }
            body={
                <TouchableOpacity
                onPress={(event) => {
                    this.props.onGetAccount(item)
                    this.props.navigation.goBack()
                }}
                style={styles.wrapperRow}>
                <Image style={styles.icon} source={item.icon} />
                <Text style={styles.lineRow}>{item.name}</Text>

            </TouchableOpacity>
            }
            right={
              <Button danger onPress={() => this.removeAccount(item)}>
                <Icon active name="trash" />
              </Button>
            }
          />
            
            
        )
    }
    render() {
        return (
            <View>
                <HeaderAdd 
                titleLeft='Cancel'
                titleRight='Add'
                title='Account'
                onPressLeft={()=>this.props.navigation.goBack()}
                onPressRight={()=>this.props.navigation.navigate('AddAccount')}/>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => this.renderItems(item)}
                    keyExtractor={item => item.key}>
                </FlatList>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    wrapperRow: {
        flexDirection: 'row',
       
       
        alignItems: 'center',
       
        
    },
    lineRow: {
       
        marginLeft: 15,
        flex: 1,
        fontSize: 20
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft:10
    },
    
});

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAccount: (account) => {
            dispatch(actions.account(account))
        },
        onGetInfoAccount: (data) => {
            dispatch(actions.getInfoAccount(data))
        }
    }
}


export default connect(null, mapDispatchToProps)(Account);