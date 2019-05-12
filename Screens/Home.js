import React from 'react';
import {View, FlatList, Container, ScrollView} from 'react-native';
import ClientListItem from '../Components/ClientListItem';
import {Col, Row, Grid} from "react-native-easy-grid";
import BottomMenu from "../Components/BottomMenu";
import {Text} from "react-native-paper";


export default class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            response: {},
            CheckIn: false,
            NoData: false
        };
    }

    componentDidMount() {
        this.LoadData();
    }

    async LoadData() {
        let response = await NetworkGet('client/get_my_clients_list');
        this.setState({response: response.content});
        if (response.content.length === 0) {
            this.setState({NoData: true});
        }
    }

    render() {
        return (
            <Grid>
                <Row size={80}>
                    <ScrollView style={{flex: 1}}>
                        {this.state.NoData &&
                        <View style={{marginTop: 50, justifyContent: 'center', flex: 1}}>
                            <Text style={{textAlign: 'center'}}>No Contacts Added Yet</Text>
                        </View>
                        }
                        <FlatList
                            data={this.state.response}
                            renderItem={({item}) => <ClientListItem response={item}
                                                                    navigation={this.props.navigation}/>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </Row>
                <Row size={15}>
                    <BottomMenu LoadData={() => this.LoadData()} navigation={this.props.navigation}/>
                </Row>
            </Grid>
        );
    }
}
