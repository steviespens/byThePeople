import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.use
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

        }).then(res => res.json()).then(res => {
            this.setToken(res.access)
            this.setRefreshToken(res.refresh)
            return Promise.resolve(res);
        })
    }


    register(email, gender, politicalParty, password1, password2) {
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
       
        console.log('register called');
        return fetch('api/register/', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                email,
                gender,
                politicalParty,
                password1,
                password2
            })
        }).then(() => {
            // this.setToken(res.access)
            return this.login(email, password1);
        })

    }

    

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
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

        }).then(res => res.json(), res => {
            console.log('error in refresh from fetch to api/token/refresh')
            console.log(res)
        }).then(res => {
            this.setToken(res.access)
            return Promise.resolve(res);
            }, (res) => {
                console.log('error in refresh from fetch to api/token/refresh after .json() called')
                console.log(res)
        })
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }

        // if (this.loggedIn()) {
        //     headers['Authorization'] = 'Bearer ' + this.getToken()            
        // }

        //fix so that if refresh token expires, it just logs you out
        if (!this.loggedIn()) {
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
            })
        }
        else {
            headers['Authorization'] = 'Bearer ' + this.getToken()
            return fetch(url, {
                headers,
                ...options
            })
                .then(this._checkStatus)
                .then(response => {
                    return response.json();
                }
            )
        }
       
    }
    // Promise.all([
    //     fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent'),
    //         fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    //     ])
    //     .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    // .then(([data1, data2]) => this.setState({
    //     recentInfo: data1,
    //     alltimeInfo: data2
    //         }));
    fetch_3(url, url2, url3, options) {
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
        if (!this.loggedIn()) {
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

            // return Promise.all([
            //     fetch(url, { headers, ...options }),
            //     fetch(url2, { headers, ...options }),
            // ])
            //     // .then(this._checkStatus)
            //     .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            // .then()
            //         return response.json();
            //     })
            // )
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


