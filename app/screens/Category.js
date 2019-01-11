import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SwipeRow, Button, Icon, Header } from 'native-base';
import * as firebase from 'firebase'
import HeaderAdd from '../components/HeaderAdd';
import Segment from '../components/Segment';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { CategoryIcon } from '../config/icon';
import { getCategory, deleteCategory } from '../database/firebaseDB'

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataExpense: [],
            dataIncome: [],
            icon: CategoryIcon,
            selectedTab: 0


        };
    }
    componentDidMount() {

        firebase.database().ref().on('value', () => {
            const dataEx = []
            const dataIn = []
            getCategory().then((data) => {
                data.forEach((data) => {
                    if (data.isExpense) {
                        dataEx.push(data)
                    } else {
                        dataIn.push(data)

                    }
                })
                this.setState({ dataExpense: dataEx, dataIncome: dataIn })
            })

        })

    }
    componentWillUnmount() {
        firebase.database().ref().off
    }

    removeCategory(item) {
        Alert.alert(
            'Cảnh báo',
            'Xoá category này bạn sẽ xoá luôn các giao dịch sử dụng chúng. Bạn có chắc muốn xoá không',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        deleteCategory(item.key).then(() => {

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
                        this.props.onGetInfoCategory(item)
                        this.props.navigation.navigate('EditCategory')
                    }}>
                        <Icon active name="ios-information-circle" />
                    </Button>
                }
                body={
                    <TouchableOpacity
                        onPress={(event) => {
                            this.props.onGetCategory(item)
                            this.props.navigation.goBack()
                        }}
                        style={styles.wrapperRow}>
                        <Image style={styles.icon} source={item.icon} />
                        <Text style={styles.lineRow}>{item.name}</Text>

                    </TouchableOpacity>
                }
                right={
                    <Button danger onPress={() => this.removeCategory(item)}>
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
                    title='Category'
                    onPressLeft={() => this.props.navigation.goBack()}
                    onPressRight={() => this.props.navigation.navigate('AddCategory')} />
                <Segment
                    data={['Expense', 'Income']}
                    selected={this.state.selectedTab}
                    onPress={(index) => {

                        this.setState({ selectedTab: index })

                    }}
                />
                <FlatList
                    data={this.state.selectedTab == 1 ? this.state.dataIncome : this.state.dataExpense}
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
        // marginTop: 10,
        marginLeft: 15,
        // height: 40,
        alignItems: 'center',
    },
    lineRow: {
        // borderBottomWidth: 1,
        marginLeft: 15,
        flex: 1,
        fontSize: 20
    },
    icon: {
        width: 35,
        height: 35
    },
    containerSegment: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 30,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCategory: (category) => {
            dispatch(actions.category(category))
        },
        onGetInfoCategory: (category) => {
            dispatch(actions.getInfoCategory(category))
        }
    }
}


export default connect(null, mapDispatchToProps)(Category);