import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './components/LoginPage';
import Register from './components/RegistrationPage'
import ImageGrid from './components/ShowContentPage';

const stackNavigatorOptions = {
    headerShown:false
}
const AppNavigator = createStackNavigator({
    Login:{screen:Login},
    Register:{screen:Register},
    ImageGrid:{screen:ImageGrid},
},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);