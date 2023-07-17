import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import Icon from "./Icon";
import SingleSurah from "../screens/quran/SingleSurah";
import Bookmark from "../screens/quran/Bookmark";
import QuranHome from "../screens/quran/QuranHome";
import FavouriteSurah from "../screens/quran/FavouriteSurah";
import Settings from "../screens/quran/Settings.jsx";

const Tab = createBottomTabNavigator();

const QuranBottomTab = () => {
  const { color } = useSelector((state) => state.theme);
  return (
    <Tab.Navigator
      initialRouteName="QuranHome"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: color.bgColor1,
        },
      }}
    >
      <Tab.Screen
        name="SingleSurah"
        component={SingleSurah}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="book-open" focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="bookmark" solid focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="QuranHome"
        component={QuranHome}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="home" focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="FavouriteSurah"
        component={FavouriteSurah}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return <Icon name="heart" solid focused={focused} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ _color, focused }) => {
            return (
              <Ionicon
                name="settings"
                size={20}
                color={focused ? color.activeIconColor : color.txtColor}
              />
            );
          },
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default QuranBottomTab;
