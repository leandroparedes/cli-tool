/* eslint-disable no-console */

const chalk = require("chalk");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const replace = require("replace-in-file");
const log = console.log;

ncp.limit = 16;

async function create(moduleName, options) {
    const cwd = process.cwd();

    if (!fs.existsSync(path.join(cwd, ".templates"))) {
        console.log(chalk.red("The src/templates folder does not exists"));
        process.exit(1);
    }

    if (!fs.existsSync(path.join(cwd, ".templates", "module"))) {
        console.log(chalk.red("The src/templates/module folder does not exists"));
        process.exit(1);
    }

    if (!fs.existsSync(path.join(cwd, "src", "app"))) {
        console.log(chalk.yellow("The src/app folder does not exists. Creating it..."));
        fs.mkdirSync(path.join(cwd, "src", "app"));
        console.log(chalk.green("src/app folder created successfully"));
    }

    const modulePath = path.join("src", "app", moduleName);

    if (fs.existsSync(modulePath)) {
        console.log(chalk.red(`The module already exists in path ${modulePath}`));
        process.exit(1);
    }

    log(`Creating module ${chalk.yellow(moduleName)} in path ${chalk.yellow(modulePath)}`);

    const templatesPath = path.join(".", ".templates", "module");

    log(`Using module template from ${chalk.yellow(templatesPath)}`);

    ncp(templatesPath, modulePath, (err) => {
        if (err) {
            throw err;
        }

        const options = {
            files: [path.join(modulePath, "pages", "*.vue"), path.join(modulePath, "*.js")],
            from: /{!moduleName!}/g,
            to: moduleName,
        };

        replace.sync(options);

        console.log(chalk.green("Module created successfully"));
    });
}

module.exports = (...args) => {
    return create(...args).catch((err) => {
        console.log("Error while creating a new module", err);
        process.exit(1);
    });
};
