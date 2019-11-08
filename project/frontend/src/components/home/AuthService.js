import decode from 'jwt-decode';

class AuthService {

    constructor(domain) {
        // this.domain = domain || 'http://localhost:8080'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.hasTokenInLocalStorage = this.hasTokenInLocalStorage.bind(this)
    }

    login(email, password) {

        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        return fetch('api/token/', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => {
            return res.json()
                .then((json) => {
                    if (res.ok) {
                        return Promise.resolve(json)
                    }
                    //nothing handles these, percolates up to the caller which catches the err
                    else if (res.status === 400) {
                        throw new Error('No account found with that username and password')
                    } else {
                        throw new Error(json)
                    }
                }).then((res) => {
                    this.setToken(res.access)
                    this.setRefreshToken(res.refresh)
                }).catch((e) => {
                    //will only be called if there is error in setters
                    console.log(e)
                })
        })
    }

    register(email, gender, political_party, ethnicity, education, salary, age, password1, password2) {

        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        return fetch('api/register/', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                email,
                gender,
                political_party,
                ethnicity,
                education,
                salary,
                age,
                password1,
                password2
            })
        }).then((res) => {
            return res.json()
                .then((json) => {
                    if (res.ok) {
                        return this.login(email, password1)
                    } throw new Error(json)
                })
        })
    }

    //try to get new access token if token is expired
    refresh() {
        const refresh = this.getRefreshToken()
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return fetch('api/token/refresh/', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                refresh
            })

        }).then(res => {
            if (!response.ok) {
                throw Error(res.statusText)
            }
            const token = res.json();
            this.setToken(token.access)
            return Promise.resolve(token);

        }, err => {
            console.log(err)
        }
        )
    }

    // main functionality of AuthService service, responsible for performing authenticated
    //  http requests and handling most errors/not-happy paths (e.g. expired token)
    fetch(url, options) {
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        //read-only access fetch, user not logged in
        if (!this.hasTokenInLocalStorage()) {
            return fetch(url, { headers, ...options }).then((res) => {
                return res.json()
            });
        }

        //logged in, token invalid, try to get new access token
        else if (!this.loggedIn()) {
            return this.refresh().then((res) => {
                headers['Authorization'] = 'Bearer ' + this.getToken()
                const result = fetch(url, {
                    headers,
                    ...options
                })
                    .then(this._checkStatus)
                    .then(response => {
                        const x = response;
                        return x.json();
                    }
                    );
                return result;
            }, err => {
                this.logout;
                location.reload();
            })
        }

        //logged in and token is valid
        else {
            headers['Authorization'] = 'Bearer ' + this.getToken()
            return fetch(url, {
                headers,
                ...options
            })
                .then(this._checkStatus)
                .then(response => {
                    return response.json();
                })
        }
    }

    //analogous to this.fetch(), but performs 3 fetch operations
    fetch_3(url, url2, url3, options) {
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        if (!this.hasTokenInLocalStorage()) {
            return Promise.all([
                fetch(url, { headers, ...options }),
                fetch(url2, { headers, ...options }),
                fetch(url3, { headers, ...options }),

            ])
                .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
                .then(([data1, data2, data3]) => {
                    return ([data1, data2, data3]);
                }
                );
        }

        else if (!this.loggedIn()) {
            return this.refresh().then((res) => {
                headers['Authorization'] = 'Bearer ' + this.getToken()
                const result = fetch(url, {
                    headers,
                    ...options
                })
                    .then(this._checkStatus)
                    .then(response => {
                        const x = response;
                        return x.json();
                    }
                    );
                return result;
            }, err => {
                this.logout();
                location.reload();
            })
        }

        else {
            headers['Authorization'] = 'Bearer ' + this.getToken()
            return Promise.all([
                fetch(url, { headers, ...options }),
                fetch(url2, { headers, ...options }),
                fetch(url3, { headers, ...options }),
            ])
                .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
                .then(([data1, data2, data3]) => {
                    return ([data1, data2, data3]);
                }
                );
        }
    }

    hasTokenInLocalStorage() {
        return localStorage.getItem("id_token") != null && localStorage.getItem("refresh_token") != null;
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    setRefreshToken(refreshToken) {
        localStorage.setItem('refresh_token', refreshToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }
    getRefreshToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('refresh_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('refresh_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

}

export default AuthService;