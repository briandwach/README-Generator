// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdownAsync = require('./utils/generateMarkdown.js');

var licenseNames = ['None'];

// List of licenses as suggested by GitHub
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


// TODO: Create an array of questions for user input
// Each question is an array of Inquirer prompt members.
// Index 1: type, Index 2: name, Index 3: message, 
// Index 4: choices, Index 5: loop, Index 6: default
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

// Inquirer function for collecting user input
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

async function sendToMarkdownFile(readmeContent, licenseData) {
    if (readmeContent.license !== 'None') {
        var licenseKey = getLicenseKey(readmeContent.license, licenseData);
    } else {
        var licenseKey = 'None';
    }
    let markdownContent = await generateMarkdownAsync(readmeContent, licenseKey);
    writeToFile(markdownContent);
}

function getLicenseKey(licenseName, licenseData) {
    let keyIndex = (licenseNames.indexOf(licenseName) - 1);
    let licenseKey = licenseData[keyIndex].key;
    return licenseKey;
}

// TODO: Create a function to write README file
function writeToFile(markdownContent) {
    fs.writeFile('./generated/README.md', markdownContent, (err) =>
        err ? console.error(err) : console.log('README successfully generated!'))
};

// TODO: Create a function to initialize app
function init() {
    requestLicensesAsync();
};

// Function call to initialize app
init();