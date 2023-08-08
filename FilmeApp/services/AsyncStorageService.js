import AsyncStorage from "@react-native-async-storage/async-storage";

const storageName = {
    email: "userEmail", password: "userPass"
}

export async function saveLogin(email, password) {
    await AsyncStorage.setItem(storageName.email, email).then();
    await AsyncStorage.setItem(storageName.password, password).then();
}

export function getLogin(setEmail, setPassword) {
    try {
        Promise.all([AsyncStorage.getItem(storageName.email), AsyncStorage.getItem(storageName.password)]).then(value => {
            setEmail(value[0]);
            setPassword(value[1]);
        })
    } catch (e) {
        console.log('error at getting saved username and password');
    }
}

export function setAllSongs(songs){
    return new Promise((resolve, reject) => {
    AsyncStorage.setItem('RecentlySongs', songs)
        .then(() => resolve)
        .catch((error) => {
            reject(error);
        });
});
}

export function getAllSongs(){
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('RecentlySongs')
        .then((value) => {
            resolve(value);
        })
        .catch((error) => {
            reject(error);
        });
    })
}
