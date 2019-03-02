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
