import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import More from './More';
import Overview from './Overview';
import Transaction from './Transaction';

var MainScreen = createBottomTabNavigator({
    Transaction: {
        screen: Transaction,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name="list" size={30} color={tintColor} />
            )
        })
    },
    Overview: {
        screen: Overview,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name="show-chart" size={30} color={tintColor} />
            )
        })
    },
    
    More: {
        screen: More,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name="more-horiz" size={30} color={tintColor} />
            )
        })
    }
},
    {
        tabBarOptions: { "activeTintColor": 'green', showLabel: true, showIcon: true }
    }
);

export default createAppContainer(MainScreen)