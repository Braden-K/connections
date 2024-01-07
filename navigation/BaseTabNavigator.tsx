import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayStackNavigator from "./PlayStackNavigator";
import CreateStackNavigator from "./CreateStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsStackNavigator from "./FriendsStackNavigator";

const BaseTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen name="Create" component={CreateStackNavigator} />
      <Tab.Screen name="Friends" component={FriendsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BaseTabNavigator;
