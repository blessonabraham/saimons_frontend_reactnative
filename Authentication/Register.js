import React, {Component} from 'react';
import {Text, TextInput, Button, Divider} from 'react-native-paper';
import {View} from 'react-native';
import {NavigationActions} from "react-navigation";


export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    async onRegister() {
        let data = this.state;
        let response = await NetworkPost('/employee/register', data);
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
                <TextInput
                    style={{
                        marginTop: 20,
                    }}
                    value={this.state.name ? this.state.name : ''}
                    onChangeText={(name) => this.setState({name})}
                    label='Name'
                    mode='outlined'
                />
                <Divider/>
                <Divider/>
                <TextInput
                    value={this.state.email ? this.state.email : ''}
                    onChangeText={(email) => this.setState({email})}
                    label='Email'
                    mode='outlined'
                />
                <Divider/>
                <Divider/>
                <TextInput
                    keyboardType='phone-pad'
                    value={this.state.mobile ? this.state.mobile : ''}
                    onChangeText={(mobile) => this.setState({mobile})}
                    label='Mobile'
                    mode='outlined'
                />
                <Divider/>
                <Divider/>
                <TextInput
                    value={this.state.password ? this.state.password : ''}
                    onChangeText={(password) => this.setState({password})}
                    label='Password'
                    mode='outlined'
                    secureTextEntry={true}
                />
                <Button style={{
                    marginTop: 10,
                }} mode="contained" onPress={()=>this.onRegister()}>Register Now</Button>
                <Button style={{
                    marginTop: 10,
                }} mode="outlined" onPress={() => {
                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Login',
                        params: {},
                        action: NavigationActions.navigate({routeName: 'Login'}),
                    });
                    this.props.navigation.dispatch(navigateAction);
                }}>or Login Here</Button>
            </View>
        );
    }
}