const storageName = {
    email: "userEmail", password: "userPass"
}
export async function saveLogin(email, password) {
    await localStorage.setItem(storageName.email, password).then();
    await localStorage.setItem(storageName.password, email).then();
}

export function getLogin(setEmail, setPassword) {
    try {
        Promise.all([localStorage.getItem(storageName.email), localStorage.getItem(storageName.password)]).then(value => {
            setEmail(value[1]);
            setPassword(value[0]);
            console.log(value);
        })
    } catch (e) {
        console.log(e);
    }
}
