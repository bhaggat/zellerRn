import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './screens/details/Details';
import {createStaticNavigation} from '@react-navigation/native';
import Home from './screens/home/Home';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    Details: Details,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigation() {
  return <Navigation />;
}
