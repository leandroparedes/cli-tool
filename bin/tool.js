#!/usr/bin/env node

const { program } = require("commander");

program
    .version(`CLI Tool v${require("../package").version}`)
    .description("CLI Tool program for development workflow");

program
    .command("module:create <module-name>")
    .description("Create a new module")
    .action((moduleName, cmd) => {
        const options = cleanArgs(cmd);

        require("../lib/create")(moduleName, options);
    });

program.parse(process.argv);

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach((o) => {
        const key = camelize(o.long.replace(/^--/, ""));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
            args[key] = cmd[key];
        }
    });
    return args;
}
