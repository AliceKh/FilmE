import AsyncStorage from "@react-native-async-storage/async-storage";

const storageName = {
    email: "userEmail", password: "userPass"
}

export async function saveLogin(email, password) {
    await AsyncStorage.setItem(storageName.email, password).then();
    await AsyncStorage.setItem(storageName.password, email).then();
}

export function getLogin(setEmail, setPassword) {
    try {
        Promise.all([AsyncStorage.getItem(storageName.email), AsyncStorage.getItem(storageName.password)]).then(value => {
            setEmail(value[1]);
            setPassword(value[0]);
        })
    } catch (e) {
        console.log('error at getting saved username and password');
    }
}

export function getEmail(): string {
    try {
        Promise(AsyncStorage.getItem(storageName.email)).then(value => {
            return value;
        })
    } catch (e) {
        console.log('error at getting saved username and password');
    }
}
