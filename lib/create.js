const chalk = require("chalk");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const log = console.log;

ncp.limit = 16;

async function create(moduleName, options) {
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
            return log(chalk.red("There was an error while creating the module"));
        }
        console.log(chalk.green(`Module created successfully`));
    });
}

module.exports = (...args) => {
    return create(...args).catch((err) => {
        console.log("Error while creating a new module", err);
        process.exit(1);
    });
};
