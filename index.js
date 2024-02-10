#!/usr/bin/env node
import prompts from "prompts";
import createTemplate from './createTemplate.js'

const defaultDesc = 'production API'

const promptMsg = [
    {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        validate: name => isValidProjectName(name.trim()) || 'Project name is required (2-20 length)'
    },
    {
        type: 'text',
        name: 'authorName',
        message: 'Author:'
    },
    {
        type: 'text',
        name: 'description',
        message: `Description: (${defaultDesc})`
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

function isEmpty(variable) {
    console.log(variable)
}

prompts(promptMsg)
    .then((answers) => {
        const projectName = answers.projectName
        const templateName = answers.templateName

        const authorName = answers.authorName
        const description = answers.description || defaultDesc

        console.log(authorName, description)

        createTemplate(templateName, projectName)
    }
    )
    .catch(error => console.error(error.message))