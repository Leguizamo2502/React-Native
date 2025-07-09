import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Book screens
import BookListScreen from "../screens/BookList";
import BookRegisterScreen from "../screens/BookRegisterScreen";
import BookUpdateScreen from "../screens/BookUpdateScreen";

// Rol screens
import RolRegisterScreen from "../screens/Rol/RolRegisterScreen";
import RolListScreen from "../screens/Rol/RolListScreen";
import RolUpdateScreen from "../screens/Rol/RolUpdateScreen";

// Form screens
import FormListScreen from "../screens/Form/FormListScreen";
import FormRegisterScreen from "../screens/Form/FormRegisterScreen";
import FormUpdateScreen from "../screens/Form/FormUpdateScreen";

// Module screens
import ModuleListScreen from "../screens/Module/ModuleListScreen";
import ModuleRegisterScreen from "../screens/Module/ModuleRegisterScreen";
import ModuleUpdateScreen from "../screens/Module/ModuleUpdateScreen";

// Permission screens
import PermissionListScreen from "../screens/Permission/PermissionListScreen";
import PermissionRegisterScreen from "../screens/Permission/PermisionRegisterScreen";
import PermissionUpdateScreen from "../screens/Permission/PermissionUpdateScreen";

// Instancias de navegadores
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const BookStackNavigator = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();


// Stack anidado con todas las pantallas principales
function MyStack() {
  return (
    <BookStackNavigator.Navigator
      initialRouteName="BookList"
      screenOptions={{ headerShown: false }}
    >
      {/* Book */}
      <BookStackNavigator.Screen name="BookList" component={BookListScreen} />
      <BookStackNavigator.Screen name="BookRegister" component={BookRegisterScreen} />
      <BookStackNavigator.Screen name="BookUpdate" component={BookUpdateScreen} />

      {/* Rol */}
      <BookStackNavigator.Screen name="RolList" component={RolListScreen} />
      <BookStackNavigator.Screen name="RolRegister" component={RolRegisterScreen} />
      <BookStackNavigator.Screen name="RolUpdate" component={RolUpdateScreen} />

      {/* Form */}
      <BookStackNavigator.Screen name="FormList" component={FormListScreen} />
      <BookStackNavigator.Screen name="FormRegister" component={FormRegisterScreen} />
      <BookStackNavigator.Screen name="FormUpdate" component={FormUpdateScreen} />

      {/* Module */}
      <BookStackNavigator.Screen name="ModuleList" component={ModuleListScreen} />
      <BookStackNavigator.Screen name="ModuleRegister" component={ModuleRegisterScreen} />
      <BookStackNavigator.Screen name="ModuleUpdate" component={ModuleUpdateScreen} />

      {/* Permission */}
      <BookStackNavigator.Screen name="PermissionList" component={PermissionListScreen} />
      <BookStackNavigator.Screen name="PermissionRegister" component={PermissionRegisterScreen} />
      <BookStackNavigator.Screen name="PermissionUpdate" component={PermissionUpdateScreen} />
    </BookStackNavigator.Navigator>
  );
}


// Tabs anidados dentro del drawer
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="BookList"
      screenOptions={{ tabBarActiveTintColor: "purple" }}
    >
      <Tab.Screen
        name="BookList"
        component={MyStack}
        options={{
          tabBarLabel: "List",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="BookRegister"
        component={BookRegisterScreen}
        options={{
          tabBarLabel: "BookRegister",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


// Drawer con entradas principales visibles
function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
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
        name="Menu"
        component={MyTabs}
        options={{ drawerLabel: "Dashboard" }}
      />
      <Drawer.Screen
        name="FormList"
        component={FormListScreen}
        options={{ drawerLabel: "Formularios" }}
      />
      <Drawer.Screen
        name="RolList"
        component={RolListScreen}
        options={{ drawerLabel: "Roles" }}
      />
    </Drawer.Navigator>
  );
}


// Root stack unificado
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* App principal */}
        <RootStack.Screen name="MainApp" component={AppDrawer} />

        {/* Rutas individuales fuera del drawer */}
        <RootStack.Screen name="FormRegister" component={FormRegisterScreen} />
        <RootStack.Screen name="FormUpdate" component={FormUpdateScreen} />
        <RootStack.Screen name="RolRegister" component={RolRegisterScreen} />
        <RootStack.Screen name="RolUpdate" component={RolUpdateScreen} />
        <RootStack.Screen name="ModuleRegister" component={ModuleRegisterScreen} />
        <RootStack.Screen name="ModuleUpdate" component={ModuleUpdateScreen} />
        <RootStack.Screen name="PermissionRegister" component={PermissionRegisterScreen} />
        <RootStack.Screen name="PermissionUpdate" component={PermissionUpdateScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
