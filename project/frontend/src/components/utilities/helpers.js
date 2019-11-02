const API_BASE = "/api/";
const CHOICES = "choices/";
const QUESTIONS = "questions/";
const VOTE = "/vote/";

export const uppercaseFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const randomElement = function (arr) {
    return Math.floor(Math.random() * arr.length);
}


export function VoteChoice(choiceId) {
    return fetch(API_BASE + CHOICES + choiceId + VOTE, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json())
}




//format: hr525-116
export function parseBillID(id) {
    let prefix = ''
        , billNumber = ''
        , congressNumber = '';
    let i = 0;
    //get prefix (e.g. 'hr' or 'hres')
    while (isNaN(id.charAt(i))) {
        prefix += id.charAt(i);
        i++;
    }
    //get number (e.g. '204' or '1191')
    while (id.charAt(i) != '-') {
        billNumber += id.charAt(i);
        i++;
    }
    i++;
    //get congress number (e.g. '115' or '116')
    for (i; i < id.length; i++) {
        congressNumber += id.charAt(i);
    }
    return {prefix: prefix, billNumber: billNumber, congressNumber: congressNumber};
    
}


export function saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
        // save to localStorage
        sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    }
}

export function hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {

        // if the key exists in localStorage
        if (sessionStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = sessionStorage.getItem(key);
            // console.log(value)
            // parse the localStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ [key]: value });
                // console.log({[key]:value})
            } catch (e) {
                // handle empty string
                this.setState({ [key]: value });
            }
        }
    }
}

export function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
}


export const isLoggedIn = () => {
    return localStorage.getItem("id_token") != null && localStorage.getItem("refresh_token") != null
}


