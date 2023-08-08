import AppNavigator from './Navigator';


export default function App() {
    global.server = "localhost";
    console.log(global.server);
    return (<AppNavigator/>);
}
