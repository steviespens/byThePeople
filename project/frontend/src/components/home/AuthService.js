import decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import { tsExpressionWithTypeArguments } from '@babel/types';
// import { isLoggedin } from '../utilities/helpers';

class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.hasTokenInLocalStorage = this.hasTokenInLocalStorage.bind(this)
        // this.use
    }
    hasTokenInLocalStorage() {
        return localStorage.getItem("id_token") != null && localStorage.getItem("refresh_token") != null; 
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
            //putting res.json() returns the json to this next function, but bc is in higher scope then, still have access to actual res object
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
        }
            
            
            // res => res.json()).then(res => {
            // this.setToken(res.access)
            // this.setRefreshToken(res.refresh)
            // return Promise.resolve(res);
        )
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
            // console.log(res.json())
            return res.json()
                .then((json) => {
                    if (res.ok) {
                    return Promise.resolve(json)
                } throw new Error(json)
            })
            // try {
            //     if (res.ok) {
            //         return this.login(email, password1);
            //     } else {
            //         throw new Error(res.body)
            //     }
            // }
            // catch (err) {
            //     console.log(err)
            // }
            // if (!res.ok) {
            //     r = res.json()
            //     console.log(r)
            //     e = JSON.parse(res.json())
            //     console.log(e)
            //     if ('password2' in e) {
            //         console.log('passwords dont match')
            //     }
            //     // console.log(data)
            //     throw new Error()
            // }
            // // this.setToken(res.access)
            // else {
            //     return this.login(email, password1);
            // }
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

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const csrftoken = this.getCookie('csrftoken');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
        if (!this.hasTokenInLocalStorage()) {
            return fetch(url, { headers, ...options }).then((res) => {
                // if (response.status === 401) {
                //     // do what you need to do here
                // }
                return res.json()
            });
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
                    // console.log(err)
                    this.logout;
                    location.reload();
                    
                    
                    // window.location.replace("/");

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
                    // console.log(err)
                    this.logout();
                    location.reload();
                    // window.location.replace("/");
                    // return fetch(url, { headers, ...options }).then((r) => r.json());
       

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
export default AuthService;
// export default withRouter(AuthService);

