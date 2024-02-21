const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdownAsync = require('./utils/generateMarkdown.js');

// Will store array of license names retrieved from Github API for the Inquirer prompt
var licenseNames = ['None'];

// Fetches list of common licenses from Github API
async function requestLicensesAsync() {
    try {
        let response = await fetch('https://api.github.com/licenses?per_page=100');
        let licenseData = await response.json();
        for (license of licenseData) {
            licenseNames.push(license.name);
        }
        collectInformation(licenseData);
    } catch (error) {
        console.log('Error retrieveing license data:', error);
    }
}

// Each question is an array fed into Inquirer to be prompt object members.
// Index 0: type, Index 1: name, Index 2: message, 
// Index 3: choices, Index 4: loop, Index 5: default
const questions = [
    ['input', 'title', 'What is the title of your project?'],
    ['input', 'description', 'What is the description of your project?'],
    ['input', 'installation', 'What are the installation instructions?'],
    ['input', 'usage', 'What is the usage information?'],
    ['input', 'contribution', 'What are the contribution guidelines?'],
    ['input', 'test', 'What are the test instructions?'],
    ['list', 'license', 'What license are you using?', licenseNames, false],
    ['input', 'github', 'What is your GitHub username?'],
    ['input', 'email', 'What is your email address?']
];

// Inquirer function for collecting user input: iterates through array to render questions
function collectInformation(licenseData) {
    let questionsArray = [];
    for (var question of questions) {
        let [type, name, message, choices, loop] = question;
        questionsArray.push({ type: type, name: name, message: message, choices: choices, loop: loop });
    };

    inquirer
        .prompt(questionsArray)
        .then((readmeContent) => {
            sendToMarkdownFile(readmeContent, licenseData);
        });
};

// Calls function from generateMarkdown.js to generate markdown
async function sendToMarkdownFile(readmeContent, licenseData) {
    if (readmeContent.license !== 'None') {
        var licenseKey = getLicenseKey(readmeContent.license, licenseData);
    } else {
        var licenseKey = 'None';
    }
    let markdownContent = await generateMarkdownAsync(readmeContent, licenseKey);
    writeToFile(markdownContent);
}

// Matches selected license name to index of licenseNames array to store the license key
function getLicenseKey(licenseName, licenseData) {
    let keyIndex = (licenseNames.indexOf(licenseName) - 1);
    let licenseKey = licenseData[keyIndex].key;
    return licenseKey;
}

// Writes final README file to the generated directory
function writeToFile(markdownContent) {
    fs.writeFile('./generated/README.md', markdownContent, (err) =>
        err ? console.error(err) : console.log('README successfully generated!'))
};

// Calls the API request to GitHub for license information when the application initializes
function init() {
    requestLicensesAsync();
};

// Calls initiliazation of application
init();