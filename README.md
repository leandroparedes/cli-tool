# cli-tool

Code generation CLI tool

## Installation

```
npm install --save-dev @leandroparedes/cli-tool
```

## Usage
```
tool [options] [command]
```

## Create a module

```
tool create-module <module-name>
```

When creating a module the tool it is going to look for a `.templates/module` folder.
This folder should contain the structure for your module. For example

```
- .templates
    - module
        -pages
            - Index.vue
        routes.js
```