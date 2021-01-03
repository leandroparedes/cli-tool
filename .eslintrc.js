module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["google"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4, { SwitchCase: 1 }],
        "max-len": ["error", { code: 110 }],
        "comma-dangle": ["error", { arrays: "always-multiline", objects: "always-multiline" }],
        "object-curly-spacing": ["error", "always"],
        "no-console": ["error", { allow: ["error"] }],
        "linebreak-style": 0,
        "require-jsdoc": 0,
        "quote-props": ["error", "as-needed"],
    },
};
