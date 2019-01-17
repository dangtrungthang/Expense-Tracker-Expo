import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import LoginWithNumPhone from './app/screens/LoginWithNumPhone';
import MainScreen from './app/screens/MainScreen';
import AddTransaction from './app/screens/AddTransaction';
import InfoTransaction from './app/screens/InfoTransaction';
import SelectAccount from './app/screens/SelectAccount';
import Account from './app/screens/Account';
import AddAccount from './app/screens/AddAccount';
import Category from './app/screens/Category';
import AddCategory from './app/screens/AddCategory';
import EditAccount from './app/screens/EditAccount';
import EditCategory from './app/screens/EditCategory';
import Note from './app/screens/Note';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from 'firebase'
import { Provider } from 'react-redux';
import allReducers from './app/reducers/allReducers';
import { createStore } from 'redux';
import selectAccount from './app/reducers/selectAccount';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCjksPh7k6I5N_96XaAjA0qALv2T0fGGPY",
  authDomain: "expense-tracker-34818.firebaseapp.com",
  databaseURL: "https://expense-tracker-34818.firebaseio.com",
  projectId: "expense-tracker-34818",
  storageBucket: "expense-tracker-34818.appspot.com",
  messagingSenderId: "70285161265"
};
firebase.initializeApp(config);

const AppNavigatorLogged = createStackNavigator({

  Main: { screen: MainScreen },
  AddTransaction: { screen: AddTransaction },
  Account: { screen: Account },
  AddAccount:{screen:AddAccount},
  Category:{screen:Category},
  AddCategory:{screen:AddCategory},
  EditAccount:{screen:EditAccount},
  EditCategory:{screen:EditCategory},
  Note:{screen:Note},
  InfoTransaction:{screen:InfoTransaction},
  SelectAccount:{screen:SelectAccount}
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {
    initialRouteKey: 'Main'
  }
);
const AppNavigatorLogin = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  LoginWithNumPhone: { screen: LoginWithNumPhone }


},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  },
  {
    initialRouteKey: 'Login'
  }
);
const NavLogged = createAppContainer(AppNavigatorLogged)
const NavLogin = createAppContainer(AppNavigatorLogin)
let store = createStore(allReducers);
export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    };
  };
  componentDidMount() {
    /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
  componentWillUnmount() {
    /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
    this.authSubscription();
  }
  render() {

    // The application is initialising
    if (this.state.loading) return null;
    // The user is an Object, so they're logged in
    if (this.state.user) return (
      <Provider store={store}>
        <NavLogged />
      </Provider>);
    // The user is null, so they're logged out
    return (
      <Provider store={store}>
        <NavLogin />
      </Provider>);



    <Provider store={store}>
      <NavLogged />
    </Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
