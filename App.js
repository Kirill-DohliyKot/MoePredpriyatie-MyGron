import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Импорт экранов
import HomeScreen from './screens/HomeScreen';
import CommunitiesScreen from './screens/CommunitiesScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityDetailScreen from './screens/CommunityDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CommunitiesList" component={CommunitiesScreen} options={{ title: 'Сообщества' }} />
    <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} options={{ title: 'Сообщество' }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Главная') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Сообщества') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Проекты') {
              iconName = focused ? 'briefcase' : 'briefcase-outline';
            } else if (route.name === 'Профиль') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Сообщества" component={CommunityStack} />
        <Tab.Screen name="Проекты" component={ProjectsScreen} />
        <Tab.Screen name="Профиль" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}