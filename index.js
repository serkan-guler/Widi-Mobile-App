/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import {install} from 'react-native-quick-crypto';
install();

AppRegistry.registerComponent(appName, () => App);
