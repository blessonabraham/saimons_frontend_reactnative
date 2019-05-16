import React from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import ClientListItem from '../Components/ClientListItem';
import {Text} from "react-native-paper";
import {Grid, Row} from "react-native-easy-grid";
import BottomMenuCommon from "../Components/BottomMenuCommon";


export default class HotDeals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: {}
        };
        this.getData()
    }


    async getData() {
        let response = await NetworkGet('client/get_clients_list_hot');
        this.setState({response: response.content});
        if (response.content.length === 0) {
            this.setState({NoData: true});
        }
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
                            renderItem={({item}) => <ClientListItem response={item}
                                                                    navigation={this.props.navigation}/>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </Row>
                <Row size={15}>
                    <BottomMenuCommon LoadData={() => this.getData()} navigation={this.props.navigation}/>
                </Row>
            </Grid>
        );
    }
}