import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoaHome from "./screens/doa/DoaHome";
import HadisHome from "./screens/hadis/HadisHome";
import Home from "./screens/Home";
import AboutUs from "./screens/quran/AboutUs";
import Splash from "./screens/Splash";
import TafsirHome from "./screens/tafsir/TafsirHome";
import QuranBottomTab from "./tabs/QuranBottomTab";
import MainSettings from "./screens/MainSettings";
import Notes from "./screens/Notes";

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="NobleQuran" component={QuranBottomTab} />
        <Stack.Screen name="Hadis" component={HadisHome} />
        <Stack.Screen name="Tafsir" component={TafsirHome} />
        <Stack.Screen name="Doa" component={DoaHome} />
        <Stack.Screen name="MainSettings" component={MainSettings} />
        <Stack.Screen name="Notes" component={Notes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
