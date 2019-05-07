import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.CheckLogin();
    }

    async CheckLogin() {
        let isLogin = await StorageGet('login_status');
        if (isLogin === "yes") {
            this.props.navigation.navigate('Employee');
        } else {
            this.props.navigation.navigate('Login');
        }
    }


    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
