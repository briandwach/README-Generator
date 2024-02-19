// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

var licenseData = [];
var licenseNames = ['None'];

// List of licenses as suggested by GitHub
function requestLicenses() {
    fetch('https://api.github.com/licenses?per_page=100')
        .then(function (response) {
            return response.json();
        })
        .then(function (licenseRequest) {
            licenseData = licenseRequest;
            for (license of licenseRequest) {
                licenseNames.push(license.name);
            }
            collectInformation();
        })
};

// TODO: Create an array of questions for user input
// Each question is an array of Inquirer prompt members.
// Index 1: type, Index 2: name, Index 3: message, 
// Index 4: choices, Index 5: loop, Index 6: default
const questions = [
    // ['input', 'title', 'What is the title of your project?'],
    // ['input', 'description', 'What is the description of your project?'],
    // ['input', 'installation', 'What are the installation instructions?'],
    // ['input', 'usage', 'What is the usage information?'],
    // ['input', 'contribution', 'What are the contribution guidelines?'],
    // ['input', 'test', 'What are the test instructions?'],
    ['list', 'license', 'What license are you using?', licenseNames, false],
    // ['input', 'github', 'What is your GitHub username?'],
    // ['input', 'email', 'What is your email address?']
];

// Inquirer function for collecting user input
function collectInformation() {
    let questionsArray = [];
    for (var question of questions) {
        let [type, name, message, choices, loop] = question;
        questionsArray.push({ type: type, name: name, message: message, choices: choices, loop: loop });
    };

    inquirer
        .prompt(questionsArray)
        .then((readmeContent) => {
            sendToMarkdownFile(readmeContent);
        });
};

function sendToMarkdownFile(readmeContent) {
    if (readmeContent.license !== 'None') {
        var licenseKey = getLicenseKey(readmeContent.license);
    } else {
        var licenseKey = 'None';
    }
    generateMarkdown(readmeContent, licenseKey);
}

function getLicenseKey(licenseName) {
    let keyIndex = (licenseNames.indexOf(licenseName) - 1);
    let licenseKey = licenseData[keyIndex].key;
    return licenseKey;
}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writefile(fileName, data, (err) =>
        err ? console.error(err) : console.log('README successfully generated!'))
};

// TODO: Create a function to initialize app
function init() {
    requestLicenses();
};

// Function call to initialize app
init();