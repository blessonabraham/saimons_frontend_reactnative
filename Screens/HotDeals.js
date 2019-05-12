import React from 'react';
import {View, FlatList} from 'react-native';
import ClientListItem from '../Components/ClientListItem';
import {Text} from "react-native-paper";


export default class HotDeals extends React.Component {

    constructor() {
        super();
        this.state = {
            response: {}
        };
    }

    async componentDidMount() {
        let response = await NetworkGet('client/get_clients_list_hot');
        this.setState({response: response.content});
        if (response.content.length === 0) {
            this.setState({NoData: true});
        }
    }


    render() {
        return (
            <View>
                {this.state.NoData &&
                <View style={{marginTop: 50, justifyContent: 'center', flex: 1}}>
                    <Text style={{textAlign: 'center'}}>No Contacts</Text>
                </View>
                }
                <FlatList
                    data={this.state.response}
                    renderItem={({item}) => <ClientListItem response={item} navigation={this.props.navigation}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}