import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenA, ScreenB } from './Screens';
import GenerateQRScreen from './GenerateQRScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListAllJobtimings from './ListAllJobtimingScreen';

const Tab = createBottomTabNavigator();

function HomeManager() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'GenerateQRScreen') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'ScreenB') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Jobtimings') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
      <Tab.Screen name="ScreenB" component={ScreenB} />
      <Tab.Screen name="Jobtimings" component={ListAllJobtimings} />
    </Tab.Navigator>
  );
}
export default HomeManager;