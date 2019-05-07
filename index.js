/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Startup from './Startup';
import {name as appName} from './app.json';
import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return (
        <PaperProvider>
            <Startup />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
