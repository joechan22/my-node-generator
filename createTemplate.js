import fs from 'fs'
import path from "path";
import commandExists from 'command-exists';
import { execSync } from 'child_process';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { Spinner } from "@topcli/spinner";

const _filename = fileURLToPath(import.meta.url);
const _directory = dirname(_filename);

const repoURL = 'https://gitlab.com/skchan222/node-generator.git'

const mkdir = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    } else {
        console.error('Directory already exists')
        return 1
    }
}

function preCheck() {
    if (!commandExists.sync('git')) {
        console.error('Cannot detect git command in system')
        process.exit(1)
    }
}

function copyFile(source, destination) {
    let srcContent = fs.readdirSync(source);
    srcContent.forEach((name) => {
        const originPath = path.join(source, name)
        const destinationPath = path.join(destination, name)
        const stats = fs.statSync(originPath)
        if (stats.isFile()) {
            const content = fs.readFileSync(originPath, 'utf8')
            fs.writeFileSync(destinationPath, content)

        } else if (stats.isDirectory()) {
            mkdir(destinationPath)
            copyFile(originPath, destinationPath)
        }
    })
}



const createTemplate = (
    templatePath, projectPath
) => {
    const spinner = new Spinner()
      .start("Start working!");
    
    spinner.text = "Pre-checking...";
    preCheck();
    spinner.succeed(`Pre-check success (${spinner.elapsedTime.toFixed(2)}ms) !`);

    let res = mkdir(projectPath);
    if (res == 1)
        process.exit(1)

    spinner.start("Cloning template from Github...")
    const _path = path.join(process.cwd(), projectPath)
    const _temp_dir = path.resolve(process.cwd(), templatePath)

    execSync(`git clone --depth=1 ${repoURL} ${_path}`)

    spinner.succeed(`template clone completed (${spinner.elapsedTime.toFixed(2)}ms) !`);

    spinner.start("Cleaning up...")
    const templateLocation = path.join(_path, 'templates', templatePath)
    mkdir(_temp_dir);
    copyFile(templateLocation, _temp_dir)

    fs.rmSync(_path, { recursive: true })

    fs.rename(_temp_dir, _path,
        () => { spinner.succeed(`Finished (${spinner.elapsedTime.toFixed(2)}ms) !`); })

}

export default createTemplate