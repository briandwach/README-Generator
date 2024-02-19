// TODO: Create a function that returns the license link
// If there is no license, return an empty string
async function renderLicenseLinkAsync(licenseKey) {
  if (licenseKey !== 'None') {
    let response = await fetch(`https://api.github.com/licenses/${licenseKey}`)
    let licenseInfo = await response.json();
    return licenseInfo.html_url;
  } else {
    return '';
  }
}


// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(licenseKey, licenseLink) {
  if (licenseKey !== 'None') {
    let alteredKey = licenseKey.replaceAll('-', '--');
    return `[![License](https://img.shields.io/badge/License-${alteredKey}-blue.svg)](${licenseLink})`
  } else {
    return '';
  }
}


// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(licenseName) {
  if (licenseName !== 'None') {
    return `This application is covered under the following license: ${licenseName}`;
  } else {
    return 'This application is not covered under a license.';
  }
}


// TODO: Create a function to generate markdown for README
async function generateMarkdownAsync(readmeContent, licenseKey) {
  try {
    var licenseLink = await renderLicenseLinkAsync(licenseKey);
  } catch (error) {
    console.log('Error generating markdown:', error);
  }

  var licenseBadge = renderLicenseBadge(licenseKey, licenseLink);
  var licenseSection = renderLicenseSection(readmeContent.license);


  return `# ${readmeContent.title} 

${licenseBadge}

## Description
${readmeContent.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${readmeContent.installation}

## Usage
${readmeContent.usage}

## License
${licenseSection} 

## Contributing
${readmeContent.contribution}

## Tests
${readmeContent.test}

## Questions
Please email me with any questions regarding this application at: 
${readmeContent.email}

Additionally, checkout more of my work on GitHub:
[${readmeContent.github}](https://github.com/${readmeContent.github})`;
}

module.exports = generateMarkdownAsync;