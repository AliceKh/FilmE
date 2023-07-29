
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");


const CONFIRM_REQUIRED = "Confirm Password is required";
const PASSWORD_REQUIRED = "Password is required";
const PASSWORD_LENGTH = "Password length should be between 6 and 20";
const PASSWORD_MATCH = "Passwoad does not match confirm password.";
const PASSWORD_TEMPLATE = "Passwoad must include lowercase & uppercase letters and a number"
const USERNAME_REQUIRED = "User name is required"
const USERNAME_LENGTH = "User's name length should be between 3 and 20"
const EMAIL_REQUIRED = "Email is required"
const EMAIL_TEMPLATE = "Invalid email"

export function passwordValidation(password) {
    if (!password || password.length == 0) {
        return PASSWORD_REQUIRED;
    } 
    
    if (password.length < 6 ||  password.length > 20) {
        return PASSWORD_LENGTH;
    }

    if(!passwordRegex.test(password)) {
        return PASSWORD_TEMPLATE;
    }

    return '';
}

export function confirmValidation(confirmPassword, password) {
    if (!confirmPassword || confirmPassword.length == 0) {
        return CONFIRM_REQUIRED;
    }

    if (password !== confirmPassword ) {
        return PASSWORD_MATCH;
    }

    return '';
}

export function usernameValidation(username) {
    if(!username || username.length == 0) {
        return USERNAME_REQUIRED;
    }

    if(username.length < 3 || username.length > 20) {
        return USERNAME_LENGTH;
    }

    return '';
}

export function emailValidation(email) {
    if(!email || email.length == 0) {
        return EMAIL_REQUIRED;
    }

    if(!emailRegex.test(email)) {
        return EMAIL_TEMPLATE;
    }

    return '';
}