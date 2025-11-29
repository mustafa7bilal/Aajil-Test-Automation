// cypress/support/utils.js

export const CITIES = ["Paris", "Buenos Aires", "Boston", "Berlin", "Rome", "London"];

export function getRandomCity(excludeCity) {
    let options = CITIES.filter(c => c !== excludeCity);
    return options[Math.floor(Math.random() * options.length)];
}

export function getRandomFlightSeq(max = 3) {
    return Math.floor(Math.random() * max) + 1; 
}

export function getRandomString(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
}
