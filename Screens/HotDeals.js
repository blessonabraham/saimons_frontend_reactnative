import React from 'react';
import {View, FlatList} from 'react-native';
import ClientListItem from '../Components/ClientListItem';


export default class HotDeals extends React.Component {

    constructor() {
        super();
        this.state = {
            response: {}
        };
    }

    async componentDidMount() {
        let response = await NetworkGet('client/get_clients_list_hot');
        this.setState({response: response.content})
    }


    render() {
        return (
            <View style={{
                backgroundColor: '#e5e1e0',
            }}>
                <FlatList
                    data={this.state.response}
                    renderItem={({item}) => <ClientListItem response={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
