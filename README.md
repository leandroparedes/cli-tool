# cli-tool

Code generation CLI tool

## Installation

```
npm install --save-dev @leandroparedes/cli-tool
```

## Usage
```
tool [command] [options]
```

## Commands

### module:create

Creates the boilerplate for a module from a template specified in the `.templates/modules` folder.
By default the `.templates/modules/default` module template will be used. You can change this behavior
with the `--template` option (`-t` for short). The module will be created in the `src/app` folder (the `src`
folder must be in the root of the directory)

#### Usage

```
tool module:create my-module

tool module:create my-module --template custom-module
```