const path = require("path");

const env = {
    es6: true,
    browser: true,
};

const ignorePatterns = [".eslintrc.js", "webpack.config.js"];

const plugins = ["@typescript-eslint", "import", "jsx-a11y"];

const extend = [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
];

const rules = {
    quotes: ["error", "double"],
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "react/prop-types": 0,
    "require-jsdoc": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "object-curly-spacing": [2, "always"],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    indent: 0,
};

const alias = {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
    map: [["item-issues-styles", "./Assets/Styles"]],
};

const settings = {
    react: {
        version: "latest",
    },
    "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
        alias,
        node: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", ".less"],
        },
        typescript: {
            project: path.resolve(__dirname, "./tsconfig.json"),
        },
    },
};

module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins,
    env,
    ignorePatterns,
    extends: extend,
    rules,
    settings,
};
