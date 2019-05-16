import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import ClientListItem from '../Components/ClientListItem';
import {Grid, Row} from "react-native-easy-grid";
import {Text} from "react-native-paper";
import BottomMenuCommon from "../Components/BottomMenuCommon";


export default class NearBy extends React.Component {

    constructor() {
        super();
        this.state = {
            response: {}
        };
        this.SendRequest()
    }

    SendRequest() {
        navigator.geolocation.getCurrentPosition(
            async position => {
                let response = await NetworkGet('client/get_clients_geo/' + position.coords.latitude + '/' + position.coords.longitude);
                this.setState({response: response.content});
                if (response.content.length === 0) {
                    this.setState({NoData: true});
                }
            },
            error => console.log(error.message),
            {enableHighAccuracy: false, timeout: 20000,}
        );
    }


    render() {
        return (
            <Grid>
                <Row size={80}>
                    {this.state.NoData &&
                    <View style={{marginTop: 50, justifyContent: 'center', flex: 1}}>
                        <Text style={{textAlign: 'center'}}>No Contacts</Text>
                    </View>
                    }
                    <ScrollView style={{flex: 1}}>
                        <FlatList
                            data={this.state.response}
                            renderItem={({item}) => <ClientListItem response={item} navigation={this.props.navigation}/>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </Row>
                <Row size={15}>
                    <BottomMenuCommon LoadData={()=>this.SendRequest()} navigation={this.props.navigation} />
                </Row>
            </Grid>
        );
    }
}
