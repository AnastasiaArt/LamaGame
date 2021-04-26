const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: ['@babel/polyfill', './js/index.js'],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'docs/img'),
                },
            ],
        }),
    ],
    devServer: {
        contentBase: './docs',
        compress: true,
        port: 9000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                    }
                }
            }
        ]
    }
};
