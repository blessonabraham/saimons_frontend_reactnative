import {Avatar, Button, Card, Title, Paragraph, Text} from 'react-native-paper';
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
let {IndianStates, IndianDistricts, Sales_Filter_Array, Breaker_Array, Deal_Array} = require('../Globals/global');


export default class ClientInDetail extends React.PureComponent {

    render() {
        let response = this.props.navigation.state.params.response;
        return (
            <Card style={{
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#a7a8ab', margin: 10
            }} elevation={1}>
                <Card.Content>
                    <Text>Name: {response.name}</Text>
                    <Text>Address: {response.mobile}</Text>
                    <Text>state: {IndianStates[response.state]}</Text>
                    <Text>district: {IndianDistricts[response.district]}</Text>
                    <Text>address: {response.address}</Text>
                    <Text>staff_name: {response.staff_name}</Text>
                    <Text>staff_contact_number: {response.staff_contact_number}</Text>
                    <Text>email_id: {response.email_id}</Text>
                    <Text>base_machine: {response.base_machine}</Text>
                    <Text>breaker: {response.breaker}</Text>
                    <Text>deal: {response.deal}</Text>
                    <Text>followup_date: {response.followup_date}</Text>
                    <Text>comment: {response.comment}</Text>
                    <Text>sales_filter: {response.sales_filter}</Text>
                </Card.Content>
            </Card>
        );
    }
}