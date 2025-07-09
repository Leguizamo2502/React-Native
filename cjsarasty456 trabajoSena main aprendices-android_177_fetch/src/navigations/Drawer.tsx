import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import RolListScreen from "../screens/Rol/RolListScreen";
import FormListScreen from "../screens/Form/FormListScreen";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

  

  return (
    <Drawer.Navigator
      initialRouteName="UserStack"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#1E90FF",
        drawerInactiveTintColor: "#555",
        drawerStyle: { backgroundColor: "#f0f8ff" },
        headerStyle: { backgroundColor: "#1E90FF" },
        headerTintColor: "#fff",
        
      }}
    >
      <Drawer.Screen
        name="UserStack"
        component={RolListScreen}
        options={{
          drawerLabel: "List Users",
          
        }}
      />
      <Drawer.Screen
        name="RolStack"
        component={FormListScreen}
        options={{
          drawerLabel: "List Roles",
          
        }}
      />
    </Drawer.Navigator>
  );
}
