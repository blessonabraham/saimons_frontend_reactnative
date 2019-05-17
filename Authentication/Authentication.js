import React from 'react';
import {ActivityIndicator, Colors, Text} from 'react-native-paper';
import {Image, View} from "react-native";
import {version as app_version}  from '../package.json';


export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(()=>this.CheckLogin(), 1000);
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
                <View style={{marginTop: 0, justifyContent: 'center', alignItems: 'center',flex: 1}}>
                    <Image style={{width: 150, height: 80, marginTop: 20}} source={require('../Assists/saimons.jpeg')}/>
                    <View style={{margin: 10,}} />
                    <Text style={{color: 'grey'}}>v{app_version}</Text>
                    <View style={{margin: 10,}} />
                    <ActivityIndicator size='small' animating={true} color={Colors.red800} />
                </View>
        );
    }
}
