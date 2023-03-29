import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, } from 'react-navigation';
import Login from './components/LoginPage';
import Register from './components/RegistrationPage'
import Home from './components/MainPage';
import ImageGrid from './components/ShowContentPage';

const stackNavigatorOptions = {
    headerShown:false,
    cardStyle: {
        backgroundColor: 'rgba(246, 230, 255, 0.1)'
        
    }
    
}
const AppNavigator = createStackNavigator({
    Home: {screen:Home},
    Login:{screen:Login},
    Register:{screen:Register},
    ImageGrid:{screen:ImageGrid},
},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);