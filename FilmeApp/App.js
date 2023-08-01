import AppNavigator from './Navigator';


export default function App() {
    global.server = "192.168.144.40";
    console.log(global.server);
    return (<AppNavigator/>);
}
