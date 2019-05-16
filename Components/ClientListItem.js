import {Avatar, Button, Card, Title, Paragraph, Text} from 'react-native-paper';
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {NavigationActions} from "react-navigation";


export default class ClientListItem extends React.PureComponent {

    render() {
        return (
            <Card onPress={() => {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Employee',
                    action: NavigationActions.navigate({
                        routeName: 'ClientInDetail',
                        params: {response: this.props.response}
                    }),
                });
                this.props.navigation.navigate('ClientInDetail',{response: this.props.response});
            }} style={{
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#a7a8ab', margin: 10
            }} elevation={1}>

                <Card.Content>
                    <Grid>
                        <Col size={90}>
                            <Text>Name: {this.props.response.name}</Text>
                            <Text>Address: {this.props.response.address}</Text>
                            <Text>Contact No: {this.props.response.mobile}</Text>
                        </Col>
                        <Col style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} size={10}>
                            <Avatar.Icon size={40} icon="keyboard-arrow-right"/>
                        </Col>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}
