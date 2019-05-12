import React from 'react';
import {ActivityIndicator, Colors, Text} from 'react-native-paper';
import {View} from "react-native";


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
            <View style={{justifyContent: 'center', flex: 1}}>
                <ActivityIndicator size='large' animating={true} color={Colors.red800} />
            </View>

        );
    }
}
