/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Startup from './Startup';
import {name as appName} from './app.json';
import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import codePush from "react-native-code-push";

export default function Main() {
    return (
        <PaperProvider>
            <Startup />
        </PaperProvider>
    );
}

let MyApp = codePush(Main);

AppRegistry.registerComponent(appName, () => MyApp);