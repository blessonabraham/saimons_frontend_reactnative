import React, {Component} from 'react';
import {Text, TextInput, Button, Divider} from 'react-native-paper';
import {View, Image} from 'react-native';
import {NavigationActions} from "react-navigation";

export default class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            response: ''
        };
    }

    async onLogin() {
        let data = {email: this.state.email, password: this.state.password};
        let response = await NetworkPost('/employee/login', data);
        if (response.status === 'success') {
            await StoragePut('login_token', response.content);
            await StoragePut('login_status', 'yes');
            this.props.navigation.navigate('Employee');
        }
    }

    render() {
        return (
            <View style={{
                padding: 20,
            }}>
                <View style={{marginTop: 0, justifyContent: 'center',alignItems: 'center'}}>
                    <Image style={{width: 150, height: 80, marginTop: 20}} source={require('../Assists/saimons.jpeg')}/>
                </View>
                <TextInput
                    style={{
                        marginTop: 20,
                    }}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    label='Email'
                    mode='outlined'
                />
                <Divider/>
                <Divider/>
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    label='Password'
                    mode='outlined'
                    secureTextEntry={true}
                />
                <Button style={{
                    marginTop: 10,
                }} mode="contained" onPress={this.onLogin.bind(this)}>Login Now</Button>
                <Button style={{
                    marginTop: 10,
                }} mode="outlined" onPress={() => {
                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Login',
                        params: {},
                        action: NavigationActions.navigate({routeName: 'Register'}),
                    });
                    this.props.navigation.dispatch(navigateAction);
                }}>or Register Here</Button>
            </View>
        );
    }
}