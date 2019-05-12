import React from 'react';
import {View} from 'react-native';
import {Text} from "react-native-paper";

export default class MyTADA extends React.Component {


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log('geolocation: ', position.coords.longitude);
            },
            error => console.log(error.message),
            { enableHighAccuracy: false, timeout: 20000 }
        );
    }


    render() {
        return (
            <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={{textAlign: 'center'}}>Under Development</Text>
            </View>
        );
    }
}
