import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "../screens/Home";
import Details from "../screens/Details";

const Navigator = createStackNavigator(
    {
        Home: Home,
        Details: Details,
    },
    {
        navigationOptions: {
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#2f3640",
            },
        },
    },
);

export default Navigator;
