import prompts, { PromptObject } from "prompts";
import fs from 'fs'
import path from "path";
import shell from 'shelljs';
import minimist from "minimist";

const argv = minimist(process.argv.slice(2), { string: ["_"] });

const promptMsg: PromptObject[] = [
    {
        type: 'text',
        name: 'name',
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