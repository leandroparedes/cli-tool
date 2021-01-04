/* eslint-disable no-console */

const chalk = require("chalk");
const fs = require("fs");
const ncp = require("ncp").ncp;
const path = require("path");
const log = console.log;

ncp.limit = 16;

async function create(storeName, options) {
    storeName = `${storeName}.js`;

    const cwd = process.cwd();

    const storePath = path.join("src", "store", "modules", storeName);

    if (fs.existsSync(storePath)) {
        log(chalk.red(`The store already exists in path ${storePath}`));
        process.exit(1);
    }

    if (!fs.existsSync(path.join(cwd, ".templates"))) {
        log(chalk.yellow(".templates folder doesn't exists. Creating it..."));
        fs.mkdirSync(path.join(cwd, ".templates"));
    }
    if (!fs.existsSync(path.join(cwd, ".templates", "stores"))) {
        log(chalk.yellow(".templates/stores folder doesn't exists. Creating it..."));
        fs.mkdirSync(path.join(cwd, ".templates", "stores"));
    }

    if (!fs.existsSync(path.join(cwd, "src", "store"))) {
        log(chalk.yellow("The store folder doesn't exists. Creating it..."));

        fs.mkdirSync(path.join(cwd, "src", "store"));
    }
    if (!fs.existsSync(path.join(cwd, "src", "store", "modules"))) {
        fs.mkdirSync(path.join(cwd, "src", "store", "modules"));
    }

    const storeTemplate = `${options.template ? options.template : "default"}.js`;

    if (!fs.existsSync(path.join(cwd, ".templates", "stores", storeTemplate))) {
        // todo: add doc link in log text
        log(chalk.red(`The store template ${chalk.bold(storeTemplate)} doesn't exists`));
        process.exit(1);
    }

    const templatePath = path.join(".templates", "stores", storeTemplate);

    log(
        `Creating store ${chalk.blue(storeName)} in path ${chalk.blue(storePath)} using template ${chalk.blue(
            templatePath
        )}`
    );

    ncp(templatePath, storePath, (err) => {
        if (err) {
            throw err;
        }

        log(chalk.green(`Store ${chalk.bold(storeName)} created successfully`));
    });
}

module.exports = (...args) => {
    return create(...args).catch((err) => {
        log("Error while creating a new store", err);
        process.exit(1);
    });
};
