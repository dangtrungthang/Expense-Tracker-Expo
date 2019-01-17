import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SwipeRow, Button, Icon } from 'native-base';
import * as firebase from 'firebase'
import HeaderAdd from '../components/HeaderAdd';
import Segment from '../components/Segment';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { AccountIcon } from '../config/icon';
import { getAccount,deleteItem } from '../database/firebaseDB'
const AllAccount={
    key:'1111',
    icon:require('../assets/icons/symbol.png'),
    name:'All account'
}
class SelectAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            icon: AccountIcon



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
    
    renderItems(item) {

        return (
            <SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                    <Button success onPress={() => alert('Add')}>
                        <Icon active name="trash" />
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
                    <Button danger onPress={() => alert('Trash')}>
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
                    title='Select Wallet'
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => this.props.navigation.navigate('AddAccount')} />
                {/** */}
                <SwipeRow
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                        <Button success onPress={() => alert('Add')}>
                            <Icon active name="trash" />
                        </Button>
                    }
                    body={
                        <TouchableOpacity
                            onPress={(event) => {
                                this.props.onGetAccount(AllAccount)
                                this.props.navigation.goBack()
                            }}
                            style={styles.wrapperRow}>
                            <Image style={styles.icon} source={require('../assets/icons/symbol.png')} />
                            <Text style={styles.lineRow}>Total Wallet</Text>

                        </TouchableOpacity>
                    }
                    right={
                        <Button danger onPress={() => alert('Trash')}>
                            <Icon active name="trash" />
                        </Button>
                    }
                />
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
        marginLeft: 10
    },

});

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAccount: (account) => {
            dispatch(actions.selectAccount(account))
        }
    }
}


export default connect(null, mapDispatchToProps)(SelectAccount);