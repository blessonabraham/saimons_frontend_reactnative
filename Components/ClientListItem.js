import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import React from 'react';
import {} from 'react-native'


export default class ClientListItem extends React.PureComponent {

    render() {
        return (
                <Card style={{ margin: 10}} elevation={5}>
                    <Card.Content>
                        <Title>Name: {this.props.response.name}</Title>
                        <Paragraph>Address: {this.props.response.address}</Paragraph>
                        <Paragraph>District: {this.props.response.district}</Paragraph>
                        <Paragraph>Contact No: {this.props.response.mobile}</Paragraph>
                    </Card.Content>
                </Card>
        );
    }
}
