// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// List of licenses as suggested by GitHub
const licenses = [
    'None',
    'Apache License 2.0',
    'GNU General Public License v3.0',
    'MIT License',
    "BSD 2-Clause 'Simplified' License",
    "BSD 3-Clause 'New' or 'Revised' License", 
    'Boost Software License 1.0',
    'Creative Commons Zero v1.0 Universal',
    'Eclipse Publice License 2.0',
    'GNU Affero Public License v3.0',
    'GNU Genral Public License v2.0',
    'GNU Lesser General Public License v2.1',
    'Mozilla Public License 2.0',
    'The Unlicense'
];


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
    ['list', 'license', 'What license are you using?', licenses, false],
    ['input', 'github', 'What is your GitHub username?'],
    ['input', 'email', 'What is your email address?']
];

// Inquirer function for collecting user input
function collectInformation() {
    let questionsArray = [];
    for (var question of questions) {
        let [type, name, message, choices, loop] = question;
        questionsArray.push({type: type, name: name, message: message, choices: choices, loop: loop});
    };

    inquirer
        .prompt(questionsArray)
        .then((data) => {
            console.log(data);
        });
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writefile(fileName, data, (err) =>
        err ? console.error(err) : console.log('README successfully generated!'))
};


// TODO: Create a function to initialize app
function init() {
    collectInformation();
};

// Function call to initialize app
init();