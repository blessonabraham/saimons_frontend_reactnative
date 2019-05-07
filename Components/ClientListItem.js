import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import React from 'react';
import {} from 'react-native'


export default class ClientListItem extends React.PureComponent {

    render() {
        return (
                <Card style={{ margin: 10}} elevation={5}>
                    <Card.Content>
                        <Title>{this.props.response.name}</Title>
                        <Paragraph>{this.props.response.address}</Paragraph>
                    </Card.Content>
                </Card>
        );
    }
}
