import React, {Component} from 'react';
import {Text, TextInput, Button} from 'react-native-paper';
import { View } from 'react-native';


export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            response: ''
        };
    }

    async onLogin() {
        let data = {email: this.state.email, password: this.state.password};
        let response = await NetworkPost('/employee/login',data);
        if (response.status === 'success'){
            await StoragePut('login_token',response.content);
            await StoragePut('login_status','yes');
            this.props.navigation.navigate('Employee');
        }
    }

    render() {
        return (
            <View style={{
                padding: 20,
            }}>
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'Username'}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                />

                <Button mode="contained"
                    onPress={()=>this.onLogin.bind(this)}
                >Login</Button>
            </View>
        );
    }
}