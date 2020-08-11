import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsProvider from './src/SettingsProvider';
import SettingsScreen from './src/SettingsScreen';
import CommandsScreen from './src/CommandsScreen';
import EditCommandScreen from './src/EditCommandScreen';
import { MenuProvider } from 'react-native-popup-menu';


const Stack = createStackNavigator();

const App = () => {
  return (
    <SettingsProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Commands'>
            <Stack.Screen name='Commands' component={CommandsScreen} />
            <Stack.Screen name='EditCommand' component={EditCommandScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </SettingsProvider>
  );
};


export default App;
