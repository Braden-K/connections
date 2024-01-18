import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayStackNavigator from "./PlayStackNavigator";
import CreateStackNavigator from "./CreateStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsStackNavigator from "./FriendsStackNavigator";
import { TouchableOpacity, View, Text } from "react-native";
import { COLOR_THREE, TILE_TEXT_COLOR } from "../styles/constants";
import Icon from "react-native-vector-icons/AntDesign";
import { TabIconNames } from "../types/navigation";

const BaseTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Play" component={PlayStackNavigator} />
      <Tab.Screen
        name="Create"
        component={CreateStackNavigator}
        options={{ tabBarLabel: "Create", unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsStackNavigator}
        options={{ tabBarLabel: "Friends", unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile", unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const TabBar = (props: { state: any; descriptors: any; navigation: any }) => {
  return (
    <View
      style={{
        borderColor: COLOR_THREE,
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "space-evenly",
        alignContent: "space-between",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      {props.state.routes.map((route: any, index: number) => {
        const { options } = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", padding: 10 }}
          >
            <Text
              style={{
                color: TILE_TEXT_COLOR,
                fontFamily: "poppins",
                fontSize: 12,
              }}
            >
              <Icon name={TabIconNames[index]} size={22} color={COLOR_THREE} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BaseTabNavigator;
