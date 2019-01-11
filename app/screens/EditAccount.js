import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import HeaderAdd from '../components/HeaderAdd';
import Button from '../components/Button';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { AccountIcon } from '../config/icon';
import { updateAccount } from '../database/firebaseDB'
const Height = Dimensions.get('window').height / 2;


class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: '',
            opendingBlance: this.props.data.opendingBlance,
            isActiveColor: 'gray',
            modalVisible: false,
            dataIcon: AccountIcon,
            paramIcon: {
                name: this.props.data.iconName,
                icon: this.props.data.icon,
            },
            name: this.props.data.name,
            icon: this.props.data.icon,

        };
    }
    onSaveAccount() {
        const data = {
            icon: this.state.paramIcon.name,
            name: this.state.name,
            opendingBlance: this.state.opendingBlance,
            endingBlance: 0,
        }
        updateAccount(this.props.data.key, data).then(() => { })

        this.props.navigation.goBack();
    }
    componentDidMount() {
        this.props.syncCalculate(false)
    }
    componentWillUnmount() {
        this.props.syncCalculate(true)
    }

    render() {
        return (
            <View>
                <HeaderAdd
                    titleLeft='Cancel'
                    title='Edit Account'
                    titleRight='Save'
                    onPressRight={() => this.onSaveAccount()}
                    onPressLeft={() => this.props.navigation.goBack()} />
                <View style={styles.wrapperRow}>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}>
                        <Image
                            style={styles.icon}
                            source={this.state.paramIcon.icon}
                        />
                        <Text style={{ color: 'gray', opacity: 0.5, marginLeft: 8 }}>Choose Icon</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.name}
                        placeholderTextColor='gray'
                        onChangeText={(text) => this.setState({ name: text })}
                    />

                </View>

                <TextInput

                    value={this.state.opendingBlance.toString()}
                    style={[styles.textInput, { flex: 0 }]}
                    onChangeText={(text) => this.setState({ opendingBlance: text })}
                    keyboardType='decimal-pad'
                />


                <Modal
                    isVisible={this.state.modalVisible}
                    // deviceHeight={Height}
                    style={styles.Modal}>
                    <View style={styles.ModalChildWarapper}>
                        <FlatList
                            data={this.state.dataIcon}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.setState({ paramIcon: item, modalVisible: false })}>
                                        <Image style={styles.iconItems} source={item.icon} />
                                    </TouchableOpacity>
                                )
                            }}
                            numColumns={7}
                            keyExtractor={item => item.name} />
                        <Button title='Close'
                            onPress={() => this.setState({ modalVisible: false })}
                            style={styles.ButtonCloseModal} />
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapperRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    icon: {
        width: 45,
        height: 45,
        marginHorizontal: 20,
    },
    iconItems: {
        width: 45,
        height: 45,
        margin: 5,
    },
    textInput: {
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 4,
        flex: 1,
        height: 45,
        marginHorizontal: 20,
        color: 'black',
        fontWeight: 'bold',

    },

    Modal: {
        marginHorizontal: 0, marginBottom: 0, marginTop: Height,
        backgroundColor: 'transparent'
    },
    ModalChildWarapper: {
        backgroundColor: 'white',
        flex: 1
    },
    ButtonCloseModal: {
        opacity: 0.5,
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    }
});

const mapStateToProps = (state) => {
    return {

        account: state.selectAccount,
        data: state.getInfoAccount

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        syncCalculate: (bool) => {
            dispatch(actions.syncCalculate(bool))
        },

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);

