import {createStackNavigator, createAppContainer, createDrawerNavigator,} from 'react-navigation';
import HomeScreen from "./Screens/Home";
import LoginScreen from "./Screens/Login";
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Authentication from "./Authentication/Authentication";
import React from "react";
import {Button} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import Logout from "./Authentication/Logout";
import HotDeals from "./Screens/HotDeals";
import MyTADA from "./Screens/MyTADA";
import NearBy from "./Screens/NearBy";

let apiURL = "https://saimons-y6o6lhzgsa-uc.a.run.app/";

global.NetworkGet = (url) => {
    Snackbar.show({
        title: 'Connecting...',
        duration: Snackbar.LENGTH_INDEFINITE,
    });
    return new Promise(async function (resolve, reject) {
        fetch(apiURL + url,
            {
                method: 'GET',
                headers: {
                    'x-auth-token': await StorageGet('login_token')
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Snackbar.dismiss();
                console.log(JSON.stringify(responseJson));
                if (responseJson.status === 'error') {
                    Snackbar.show({
                        title: responseJson.content.toString(),
                        duration: Snackbar.LENGTH_LONG,
                    });
                    resolve('');
                } else {
                    resolve(responseJson);
                }
            })
            .catch((error) => {
                Snackbar.dismiss();
                Snackbar.show({
                    title: error.toString(),
                    duration: Snackbar.LENGTH_LONG,
                });
            });
    });
};

global.NetworkPost = (url, data) => {
    Snackbar.show({
        title: 'Connecting...',
        duration: Snackbar.LENGTH_INDEFINITE,
    });
    console.log(JSON.stringify(data));
    return new Promise(async function (resolve, reject) {
        fetch(apiURL + url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': await StorageGet('login_token')
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Snackbar.dismiss();
                console.log(JSON.stringify(responseJson));
                if (responseJson.status === 'error') {
                    Snackbar.show({
                        title: responseJson.content.toString(),
                        duration: Snackbar.LENGTH_LONG,
                    });
                    resolve('');
                } else {
                    resolve(responseJson);
                }
            })
            .catch((error) => {
                Snackbar.dismiss();
                Snackbar.show({
                    title: error.toString(),
                    duration: Snackbar.LENGTH_LONG,
                });
            });
    });
};

global.StorageGet = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return '';
        }
    } catch (error) {
        Snackbar.show({
            title: error.toString(),
            duration: Snackbar.LENGTH_LONG,
        });
    }
};

global.StoragePut = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        Snackbar.show({
            title: error.toString(),
            duration: Snackbar.LENGTH_LONG,
        });
    }
};

const navigationOptionsHeader = ({navigation}) => {
    return {
        headerLeft: (
            <Button mode='text' onPress={() => navigation.toggleDrawer()}><Icon name="bars" fontSize="40"
                                                                                color="white"/></Button>
        ),
        headerStyle: {
            backgroundColor: '#5483f4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white',
        },
        title: 'Saimons Hydro Solutions'
    };
};

const AuthStack = createDrawerNavigator({
    Login: {
        screen: LoginScreen, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Login',
            }
        },
    },

}, {initialRouteName: 'Login', navigationOptions: navigationOptionsHeader,});

const EmployeeStack = createDrawerNavigator({
    Home: {
        screen: HomeScreen, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Home',
            }
        }
    },
    HotDeals: {
        screen: HotDeals, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Hot Deals',
            }
        }
    },
    MyTADA: {
        screen: MyTADA, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'My TA/DA',
            }
        }
    },
    NearBy: {
        screen: NearBy, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Near By Clients',
            }
        }
    },
    Logout: {
        screen: Logout, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Logout',
            }
        }
    }

}, {initialRouteName: 'Home', navigationOptions: navigationOptionsHeader,});


// const AppStack = createStackNavigator({RootStack: {screen: RootStack}});

const AppContainer = createAppContainer(createStackNavigator(
    {
        AuthLoading: Authentication,
        Employee: EmployeeStack,
        Login: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }));

export default class Startup extends React.Component {
    render() {
        return <AppContainer/>;
    }
}