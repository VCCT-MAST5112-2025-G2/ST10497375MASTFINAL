import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './screens/HomeScreen'; //adding a new page
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import MenuScreen from "./screens/MenuScreen";
// defining the menu item types in order to be able to use them

const Stack = createNativeStackNavigator();


export default function App() {
  const [menu, setMenu] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Menu">
          {(props) => <MenuScreen {...props} menu={menu} setMenu={setMenu as unknown as () => void} />}
        </Stack.Screen>

        
        <Stack.Screen name="Home">
         {(props) => <HomeScreen {...props} menu={menu} setMenu={setMenu as unknown as () => void} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}