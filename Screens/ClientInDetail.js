import {Avatar, Button, Card, Title, Paragraph, Text} from 'react-native-paper';
import React from 'react';
import {NavigationActions} from "react-navigation";
import {ScrollView} from "react-native";
import {Row} from "react-native-easy-grid";

let {IndianStates, IndianDistricts, Sales_Filter_Array, Breaker_Array, Deal_Array} = require('../Globals/global');


export default class ClientInDetail extends React.PureComponent {

    render() {
        let response = this.props.navigation.state.params.response;
        return (
            <ScrollView style={{flex: 1}}>
            <Card style={{
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#a7a8ab', margin: 10
            }} elevation={1}>
                <Card.Content>
                    <Text style={TextStyle}>Name: {response.name}</Text>
                    <Text style={TextStyle}>Mobile: {response.mobile}</Text>
                    <Text style={TextStyle}>State: {IndianStates[response.state]}</Text>
                    <Text style={TextStyle}>District: {IndianDistricts[response.district]}</Text>
                    <Text style={TextStyle}>Address: {response.address}</Text>
                    <Text style={TextStyle}>Location: {response.geolocation}</Text>
                    <Text style={TextStyle}>Staff Name: {response.staff_name}</Text>
                    <Text style={TextStyle}>Staff Contact Number: {response.staff_contact_number}</Text>
                    <Text style={TextStyle}>Email ID: {response.email_id}</Text>
                    <Text style={TextStyle}>Base Machine: {response.base_machine}</Text>
                    <Text style={TextStyle}>Breaker: {response.breaker}</Text>
                    <Text style={TextStyle}>Deal: {response.deal}</Text>
                    <Text style={TextStyle}>Followup Date: {response.followup_date}</Text>
                    <Text style={TextStyle}>Comment: {response.comment}</Text>
                    <Text style={TextStyle}>Sales Filter: {response.sales_filter}</Text>
                </Card.Content>
                <Button mode='outlined' onPress={() => {
                    this.props.navigation.push('EditClient', {response});
                }}>Edit Client</Button>
            </Card>
            </ScrollView>
        );
    }
}
const TextStyle = {
    fontSize: 18,
};