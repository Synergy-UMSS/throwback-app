import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from "./screens/SearchScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator  screenOptions={{
            tabBarStyle:{
                backgroundColor:"rgba(0,0,0,0.5)",
                position:"absolute",
                bottom:0,
                left:0,
                right:0,
                shadowOpacity:4,
                shadowRadius:4,
                elevation: 4,
                shadowOffset:{
                    width:0,
                    height:-4,
                },
                borderTopWidth:0
            }
        }}>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
                tabBarLabel:"Home",
                headerShown: false,
                tabBarLabelStyle: { color: "silver" },
                tabBarIcon:({focused}) =>
                focused ? (
                    <Ionicons name="home" size={30} color="white"/>
                ) : (
                    <Ionicons name="home" size={30} color="silver"/>
                ),
                }} 
            />
            
            <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
                tabBarLabel:"Search",
                headerShown: false,
                tabBarLabelStyle: { color: "silver" },
                tabBarIcon:({focused}) =>
                focused ? (
                    <Ionicons name="search" size={30} color="white"/>
                ) : (
                    <Ionicons name="search" size={30} color="silver"/>
                ),
                
            }}
            />
        </Tab.Navigator>
    );
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