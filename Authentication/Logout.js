import React from 'react';
import {View} from 'react-native';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.LogoutNow();
    }


    async LogoutNow() {
        await StoragePut('login_status', 'no');
        this.props.navigation.navigate('Login');
    }


    render() {
        return (
            <View>
            </View>
        );
    }
}
