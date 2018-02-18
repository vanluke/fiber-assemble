var path = require('path');

module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "jasmine": true,
      "jest": "true"
    },
    "settings": {
      "import/resolver": {
        "node": {
          "paths": [path.resolve(__dirname, './src')],
        },
      },
    },
    "rules": {
      'object-curly-spacing': [2, 'never'],
      "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
      "import/prefer-default-export": 1,
      "no-return-assign": 0,
      "no-sequences": 0
    }
};
