import axios from "axios";

function setToken(token) {
    localStorage.setItem('currentUserToken', token);
}

export function login({ email, password }) {
    //TODO::Clean up subscription with Abort controller
    return new Promise(resolve => {
        axios.post('https://reqres.in/api/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                resolve(true)
                setToken(response.data)
            })
            .catch(function (error) {
                console.log(error);
                resolve(false)
            });
    })
}

export function signUp(email, password) {
    return new Promise(resolve => {

        axios.post(`https://reqres.in/api/register`, {
            email,
            password
        })
            .then(function (response) {
                console.log(response)
                resolve(true)
                setToken(response.data)
            })
            .catch(function (error) {
                resolve(false)
                console.log(error);
            })
    })
}

export function validEntries(emailEntry, passwordEntry) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValidEmail = emailRegex.test(emailEntry);

    const isValidPassword = (passwordEntry.length > 4) ? true : false

    return isValidEmail && isValidPassword
}

export function isLoggedIn() {
    const token = localStorage.getItem('currentUserToken');
    if (token) {
        return true
    } else {
        return false
    }
}

export function validUserDetails(name, job) {
    const validName = (name.length > 0) ? true : false;
    const validJob = (job.length > 0) ? true : false;
    return validName && validJob
}