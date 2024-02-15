/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Karoly Nemeth Student ID: 021949144 Date: Sat feb 3
*
********************************************************************************/

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        sets = [];
        setData.forEach(set => {
            const theme = themeData.find(theme => theme.id === set.theme_id);
            if (theme) {
                sets.push({
                    ...set,
                    theme: theme.name
                });
            }
        });
        resolve();
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("sets not available");
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const set = sets.find(set => set.set_num === setNum);
        if (set) {
            resolve(set);
        } else {
            reject("not found");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const lowercaseTheme = theme.toLowerCase();
        const matchingSets = sets.filter(set => set.theme.toLowerCase().includes(lowercaseTheme));
        if (matchingSets.length > 0) {
            resolve(matchingSets);
        } else {
            reject("sets not found");
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };