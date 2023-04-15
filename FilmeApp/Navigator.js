import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,} from 'react-navigation';
import Login from './components/LoginPage';
import Register from './components/RegistrationPage'
import Home from './components/MainPage';
import ImageGrid from './components/ShowContentPage';
import GraphPage from './components/GraphPage';
import ProfilePage from './components/ProfilePage'
import ExplorePage from './components/ExplorePage';
import VideoReactionPage from './components/VideoReactionPage';
import UploadPage from "./components/UploadPage";

const stackNavigatorOptions = {
    headerShown: false,
    cardStyle: {
        backgroundColor: 'rgba(246, 230, 255, 0.1)'
    }

}
const AppNavigator = createStackNavigator({
    Uploadpage: {screen: UploadPage},
    Home: {screen:Home},
    Login:{screen:Login},
    Register:{screen:Register},
    ImageGrid:{screen:ImageGrid},
    GraphPage:{screen:GraphPage},
    ProfilePage:{screen:ProfilePage},
    ExplorePage:{screen:ExplorePage},
    VideoReactionPage:{screen:VideoReactionPage}
},
{
    defaultNavigationOptions : stackNavigatorOptions
}  
);
export default createAppContainer(AppNavigator);