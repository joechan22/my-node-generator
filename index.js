#!/usr/bin/env node
import prompts from "prompts";
import createTemplate from './createTemplate.js'
// import minimist from "minimist";

// const argv = minimist(process.argv.slice(2), { string: ["_"] });

const promptMsg = [
    {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        validate: name => isValidProjectName(name.trim()) || 'Project name is required (2-20 length)'
    },
    {
        type: 'select',
        name: 'templateName',
        message: 'Template name:',
        choices: [
            {
                title: 'Basic Express API',
                value: 'basic-express'
            },
            {
                title: 'dummy',
                value: 'dummy'
            },
        ]
    },
    {
        oncancel: () => {
            console.error("Operation cancel!");
            process.exit(1);
        }
    }
];

function isValidProjectName(projectName) {
    return /^[^\s]{2,20}$/.test(projectName);
}

prompts(promptMsg)
    .then((answers) => {
        const projectName = answers.projectName
        const templateName = answers.templateName

        console.log(templateName, projectName)

        createTemplate(templateName, projectName)
    }
    )
    .catch(error => console.error(error.message))