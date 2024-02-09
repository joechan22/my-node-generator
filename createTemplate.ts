import fs from 'fs'
import path from "path";
import shell from 'shelljs';

const createTemplate = (
    templatePath: string, projectPath: string
) => {
    let templateName = fs.readdirSync(templatePath);

    const skipFiles = ['node_modules', 'build', '.git'];
    templateName = templateName.filter(
        (item: string) => !skipFiles.includes(item)
    )
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath)
    } else {
        console.error('Directory already exists')
        return
    }

    templateName.forEach()
}