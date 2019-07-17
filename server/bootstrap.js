require('ignore-styles');
require('url-loader');
require('file-loader');
require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        '@babel/syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
        '@babel/transform-runtime',
        '@babel/plugin-proposal-class-properties'
    ]
});
require('./index');
