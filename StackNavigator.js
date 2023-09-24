import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
                tabBarLabel:"Home",
                headerShown: false,
                tabBarLabelStyle: { color: "white" },
                tabBarIcon:({focused}) =>
                focused ? (
                    <Ionicons name="home" size={24} color="black"/>
                ) : (
                    <Ionicons name="heart-outline" size={30} color="black"/>
                ),
                }} 
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();
function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation