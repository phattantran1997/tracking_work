import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenA, ScreenB } from './Screens';
import GenerateQRScreen from './GenerateQRScreen';

const Tab = createBottomTabNavigator();

function HomeManager() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
      <Tab.Screen name="ScreenB" component={ScreenB} />
    </Tab.Navigator>
  );
}
export default HomeManager;