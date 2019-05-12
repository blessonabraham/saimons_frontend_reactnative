import React, {Component} from 'react';
import {Text, TextInput, Button, Divider, Avatar} from 'react-native-paper';
import {View, ScrollView, Picker} from 'react-native';
import {NavigationActions} from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import {Col, Grid, Row} from "react-native-easy-grid";

let {IndianStates, IndianDistricts, Sales_Filter_Array, Breaker_Array, Deal_Array} = require('../Globals/global');


export default class AddClient extends React.Component {

    constructor() {
        super();
        this.state = {
            state: '',
            district: '',
            sales_filter: '',
            breaker: '',
            deal: '',
            latitude: '',
            longitude: '',
        };

        this.getLocation();
    }


    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    geolocation: [position.coords.latitude, position.coords.longitude]
                });
            },
            error => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000,}
        );
    }


    async onSubmit() {
        let response = await NetworkPost('/client/add_new', this.state);
        if (response.status === 'success') {
            const navigateAction = NavigationActions.navigate({
                routeName: 'Employee', params: {}, action: NavigationActions.navigate({routeName: 'Home'}),
            });
            this.props.navigation.dispatch(navigateAction);
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{padding: 10, flex: 1}}>
                    <TextInput
                        value={this.state.name ? this.state.name : ''}
                        onChangeText={(name) => this.setState({name})}
                        label='Name'
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

                    <Picker
                        selectedValue={this.state.state}
                        onValueChange={(itemValue, itemPosition) =>
                            this.setState({state: itemValue})
                        }>
                        {IndianStates.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>

                    <Divider/>
                    <Divider/>

                    <Picker
                        selectedValue={this.state.district}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({district: itemValue})
                        }>
                        {IndianDistricts.map((item, index) => {
                            return (<Picker.Item label={item} value={index} key={index}/>)
                        })}
                    </Picker>

                    <Divider/>
                    <Divider/>

                    <Grid>
                        <Col size={80}>
                            <TextInput
                                disabled={true}
                                value={this.state.geolocation ? this.state.geolocation + ',' : ''}
                                label='Location'
                                mode='outlined'
                            />
                        </Col>
                        <Col onPress={() => this.getLocation()} size={10} style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <Avatar.Icon size={30} icon="my-location" />
                        </Col>
                    </Grid>
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.address ? this.state.address : ''}
                        onChangeText={(address) => this.setState({address})}
                        label='Address'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        keyboardType='email-address'
                        value={this.state.email ? this.state.email : ''}
                        onChangeText={(email) => this.setState({email})}
                        label='Email'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.staff_name ? this.state.staff_name : ''}
                        onChangeText={(staff_name) => this.setState({staff_name})}
                        label='Staff Name'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        keyboardType='phone-pad'
                        value={this.state.staff_contact_number ? this.state.staff_contact_number : ''}
                        onChangeText={(staff_contact_number) => this.setState({staff_contact_number})}
                        label='Staff Contact Number'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        keyboardType='email-address'
                        value={this.state.email_id ? this.state.email_id : ''}
                        onChangeText={(email_id) => this.setState({email_id})}
                        label='Email Id'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.base_machine ? this.state.base_machine : ''}
                        onChangeText={(base_machine) => this.setState({base_machine})}
                        label='Base Machine'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.breaker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({breaker: itemValue})
                        }>
                        {Breaker_Array.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.deal}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({deal: itemValue})
                        }>
                        {Deal_Array.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <View style={{flexDirection: 'row'}}>
                        <DatePicker
                            style={{flex: 1}}
                            date={this.state.followup_date}
                            mode="datetime"
                            androidMode="spinner"
                            showIcon={false}
                            placeholder="Followup Date"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={(date) => {
                                this.setState({followup_date: date})
                            }}
                        />
                    </View>
                    <Divider/>
                    <Divider/>
                    <TextInput
                        value={this.state.comment ? this.state.comment : ''}
                        onChangeText={(comment) => this.setState({comment})}
                        label='Comment'
                        mode='outlined'
                    />
                    <Divider/>
                    <Divider/>
                    <Picker
                        selectedValue={this.state.sales_filter}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({sales_filter: itemValue})
                        }>
                        {Sales_Filter_Array.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>)
                        })}
                    </Picker>
                    <Divider/>
                    <Divider/>
                    <Button mode="contained" onPress={() => this.onSubmit()}>Add Contact</Button>
                </View>

            </ScrollView>
        );
    }
}