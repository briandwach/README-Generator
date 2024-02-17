// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    ['input', 'title', 'What is the title of your project?'],
    ['input', 'description', 'What is the description of your project?'],
    ['input', 'installation', 'What are the installation instructions?'],
    ['input', 'usage', 'What is the usage information?'],
    ['input', 'contribution', 'What are the contribution guidelines?'],
    ['input', 'test', 'What are the test instructions?'],
    ['select', 'license', 'What license are you using?'],
    ['input', 'github', 'What is your GitHub username?'],
    ['input', 'email', 'What is your email address?']
];

// Inquirer function for collecting user input
function collectInformation() {
    let questionsArray = [];
    for (q = 0; q < questions.length; q++) {
        let question = questions[q];
        let [type, name, message, choices] = question;
        questionsArray[q] = {type: type, name: name, message: message, choices: choices};
    };

    console.log(questionsArray);

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