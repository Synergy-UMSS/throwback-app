import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <Icon name="rocket" size={30} color="black" />
                ) : (
                    <Icon name="rocket" size={30} color="#900" />
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