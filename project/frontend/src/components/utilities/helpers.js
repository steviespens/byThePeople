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
