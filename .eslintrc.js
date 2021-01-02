module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:vue/essential", "google", "prettier", "prettier/vue"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["vue"],
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4, { SwitchCase: 1 }],
        "max-len": ["error", { code: 110 }],
        "comma-dangle": ["error", { arrays: "always-multiline", objects: "always-multiline" }],
        "object-curly-spacing": ["error", "always"],
        "no-console": ["error", { allow: ["error"] }],
        "linebreak-style": 0,
    },
};
