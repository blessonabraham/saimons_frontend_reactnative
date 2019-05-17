import {Avatar, Button, Card, Title, Paragraph, Divider, Text} from 'react-native-paper';
import React from 'react';
import {Col, Grid, Row} from "react-native-easy-grid";
import {NavigationActions} from "react-navigation";
import {View, FlatList, ScrollView} from 'react-native';


export default class BottomMenuHome extends React.Component {

    constructor() {
        super();
        this.state = {
            geolocation: '',
            AttdnStatus: "out"
        };
        this.GetLocation();
        this.AttendanceCheck();
    }

    async GetLocation() {
        let Response = await GetLocationAddress();
        this.setState({geolocation: Response})
    }

    async AttendanceCheck() {
        let AttdnStatus = await StorageGet('Att_Status');
        if (AttdnStatus === "check_in") {
            this.setState({AttdnStatus: "check_in"})
        } else {
            this.setState({AttdnStatus: "check_out"})
        }
    }

    async AttendancePut() {
        let AttdnStatus = await StorageGet('Att_Status');
        if (AttdnStatus === "check_in") {
            let response = await NetworkPost('/attendance/add_new', {event: "check_out"});
            if (response.status === 'success') {
                await StoragePut('Att_Status', 'check_out');
                this.setState({AttdnStatus: "check_out"})
            }
        } else {
            let response = await NetworkPost('/attendance/add_new', {event: "check_in"});
            if (response.status === 'success') {
                await StoragePut('Att_Status', 'check_in');
                this.setState({AttdnStatus: "check_in"})
            }
        }
    }


    render() {
        return (
            <Grid>
                <Row onPress={() => {
                    this.GetLocation()
                }} size={5} style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 10}}>
                        {this.state.geolocation ? this.state.geolocation : 'Turn on your GPS and click here'}
                    </Text>
                </Row>

                <Row size={10}>
                    <Col size={1} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => {
                        this.props.LoadData()
                    }}>
                        <Avatar.Icon size={40} icon="refresh"/>
                        <Divider/>
                        <Text style={{fontSize: 10}}>Sync Data</Text>
                    </Col>
                    <Col onPress={() => this.AttendancePut()} size={1} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.state.AttdnStatus === "check_in" ? (
                            <Button style={{margin: 10}} color="red" mode="contained">Check Out</Button>
                        ) : (
                            <Button style={{margin: 10}} color="green" mode="contained">Check In</Button>

                        )
                        }
                    </Col>
                    <Col size={1} style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => {
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'Employee',
                            params: {},
                            action: NavigationActions.navigate({routeName: 'AddClient'}),
                        });
                        this.props.navigation.dispatch(navigateAction);
                    }}>
                        <Avatar.Icon size={40} icon="person-add"/>
                        <Divider/>
                        <Text style={{fontSize: 10}}>Add Client</Text>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
