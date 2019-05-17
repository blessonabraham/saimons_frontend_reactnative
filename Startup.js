import {createStackNavigator, createAppContainer, createDrawerNavigator,} from 'react-navigation';
import HomeScreen from "./Screens/Home";
import LoginScreen from "./Authentication/Login";
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import Authentication from "./Authentication/Authentication";
import React from "react";
import {Button} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from "./Authentication/Logout";
import HotDeals from "./Screens/HotDeals";
import MyTADA from "./Screens/MyTADA";
import NearBy from "./Screens/NearBy";
import AddClient from "./Screens/AddClient";
import ClientInDetail from "./Screens/ClientInDetail";
import Register from "./Authentication/Register";
import EditClient from "./Screens/EditClient";

let apiURL = "https://saimons-y6o6lhzgsa-uc.a.run.app/";

console.disableYellowBox = true;

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

global.NetworkGetSilent = (url) => {
    return new Promise(async function (resolve, reject) {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                Snackbar.dismiss();
                console.log(JSON.stringify(responseJson));
                resolve(responseJson);
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

global.GetLocationAddress = () => {
    return new Promise(async function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                let response = await NetworkGetSilent(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCL8N61HDLyUN_-bUqW0Qd3Dg8_QTa1Yws`);
                resolve(response.plus_code.compound_code);
            },
            error => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000,}
        );
    });
};

global.GetLocationAddressByCords = (lat, long) => {
    return new Promise(async function (resolve, reject) {
        console.log("one");
        let response = await NetworkGetSilent(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCL8N61HDLyUN_-bUqW0Qd3Dg8_QTa1Yws`);
        console.log(response);
        resolve(response.plus_code.compound_code);
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
    const {routeName} = navigation.state.routes[navigation.state.index];

    return {
        headerLeft: (
            <Button mode='text' onPress={() => navigation.toggleDrawer()}><Icon name="menu" size={25}
                                                                                color="white"/></Button>
        ),
        headerStyle: {
            backgroundColor: '#6f008f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: 'white',
        },
        title: routeName
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
    Register: {
        screen: Register, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Register',
            }
        },
    }

}, {initialRouteName: 'Login', navigationOptions: navigationOptionsHeader,});

const EmployeeStack = createDrawerNavigator({
    Home: {
        screen: HomeScreen, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Home',
                drawerIcon: () => <Icon name="home" size={25} color="grey"/>
            }
        }
    },
    HotDeals: {
        screen: HotDeals, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Hot Deals',
                drawerIcon: () => <Icon name="fire" size={25} color="grey"/>
            }
        }
    },

    MyTADA: {
        screen: MyTADA, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'My TA/DA',
                drawerIcon: () => <Icon name="account-box" size={25} color="grey"/>
            }
        }
    },
    NearBy: {
        screen: NearBy, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Near By Clients',
                drawerIcon: () => <Icon name="map" size={25} color="grey"/>
            }
        }
    },
    Logout: {
        screen: Logout, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => 'Logout',
                drawerIcon: () => <Icon name="power" size={25} color="grey"/>
            }
        }
    },
    AddClient: {
        screen: AddClient, navigationOptions: ({navigation}) => {
            return {
                drawerLabel: () => null,
            }
        }
    },
}, {initialRouteName: 'Home', navigationOptions: navigationOptionsHeader,});

const AppContainer = createAppContainer(createStackNavigator(
    {
        AuthLoading: {
            screen: Authentication,
            navigationOptions: {
                header: null,
            }
        },
        Employee: EmployeeStack,
        Login: AuthStack,
        ClientInDetail: {
            screen: ClientInDetail, navigationOptions: ({navigation}) => {
                return {
                    drawerLabel: () => null,
                }
            }
        },
        EditClient: {
            screen: EditClient, navigationOptions: ({navigation}) => {
                return {
                    drawerLabel: () => null,
                }
            }
        }
    },
    {
        initialRouteName: 'AuthLoading', defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6f008f',
            },
            headerTintColor: '#ffffff'
        }
    }));

export default class Startup extends React.Component {
    render() {
        return <AppContainer/>;
    }
}