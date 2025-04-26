import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { FriendsScreen } from '../screens/FriendsScreen';
import { ChatUniqueCodeScreen } from '../screens/ChatUniqueCodeScreen';
import { SetPasswordScreen } from '../screens/SetPasswordScreen';
import { EnterNameScreen } from '../screens/EnterNameScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="ChatUniqueCode" component={ChatUniqueCodeScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 