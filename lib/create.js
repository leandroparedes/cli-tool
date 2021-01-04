/* eslint-disable no-console */

const chalk = require("chalk");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const log = console.log;

ncp.limit = 16;

async function create(moduleName, options) {
    const cwd = process.cwd();

    const modulePath = path.join("src", "app", moduleName);

    if (fs.existsSync(modulePath)) {
        log(chalk.red(`The module already exists in path ${modulePath}`));
        process.exit(1);
    }

    if (!fs.existsSync(path.join(cwd, ".templates"))) {
        log(chalk.yellow(".templates folder doesn't exists. Creating it..."));
        fs.mkdirSync(path.join(cwd, ".templates"));

        if (!fs.existsSync(path.join(cwd, ".templates", "module"))) {
            log(chalk.yellow(".templates/module folder doesn't exists. Creating it..."));
            fs.mkdirSync(path.join(cwd, ".templates", "module"));
        }
    }

    if (!fs.existsSync(path.join(cwd, "src", "app"))) {
        log(chalk.yellow("The app folder doesn't exists. Creating it..."));

        fs.mkdirSync(path.join(cwd, "src", "app"));
    }

    log(`Creating module ${chalk.blue(moduleName)} in path ${chalk.blue(modulePath)}`);

    const templatesPath = path.join(".templates", "module");

    log(`Using module template from ${chalk.blue(templatesPath)}`);

    ncp(templatesPath, modulePath, (err) => {
        if (err) {
            throw err;
        }

        log(chalk.green("Module created successfully"));
    });
}

module.exports = (...args) => {
    return create(...args).catch((err) => {
        log("Error while creating a new module", err);
        process.exit(1);
    });
};
