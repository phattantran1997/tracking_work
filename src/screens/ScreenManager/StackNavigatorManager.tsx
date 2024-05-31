import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GenerateQRScreen from './GenerateQRScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListAllJobtimings from './JobtimingsScreen';
import ProductScreen from './ProductsScreen';

const Tab = createBottomTabNavigator();

function HomeManager() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Generate QR') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Jobtimings') {
            iconName = focused ? 'time' : 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Generate QR" component={GenerateQRScreen} />
      <Tab.Screen name="Products" component={ProductScreen} />
      <Tab.Screen name="Jobtimings" component={ListAllJobtimings} />
    </Tab.Navigator>
  );
}
export default HomeManager;