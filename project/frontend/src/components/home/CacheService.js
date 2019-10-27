export default class CacheService {
    constructor() {

    }


    // saveStateToLocalStorage() {
    //     // for every item in React state
    //     for (let key in this.state) {
    //         // save to localStorage
    //         sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    //     }
    // }

    // hydrateStateWithLocalStorage() {
    //     // for all items in state
    //     for (let key in this.state) {

    //         // if the key exists in localStorage
    //         if (sessionStorage.hasOwnProperty(key)) {
    //             // get the key's value from localStorage
    //             let value = sessionStorage.getItem(key);
    //             // console.log(value)
    //             // parse the localStorage string and setState
    //             try {
    //                 value = JSON.parse(value);
    //                 this.setState({ [key]: value });
    //                 // console.log({[key]:value})
    //             } catch (e) {
    //                 // handle empty string
    //                 this.setState({ [key]: value });
    //             }
    //         }
    //     }
    // }
    saveStateToLocalStorage(state) {
        console.log(state)
        // for every item in React state
        for (let key in state) {
            // save to localStorage
            sessionStorage.setItem(key, JSON.stringify(state[key]));
        }
    }

    hydrateStateWithLocalStorage(state, setState) {
        // for all items in state
        for (let key in state) {

            // if the key exists in localStorage
            if (sessionStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = sessionStorage.getItem(key);
                // console.log(value)
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    console.log('before')
                    setState({ [key]: value });
                    console.log('after')
                } catch (e) {
                    // handle empty string
                    setState({ [key]: value });
                }
            }
        }
    }




}


