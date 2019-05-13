module.exports = {
    "env": {
        "node": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'no-console': 'off',
        'no-undef': 'off'
    }
};