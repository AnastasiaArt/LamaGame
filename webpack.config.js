const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    stats: {
        children: true,
    },
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
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
    devServer: {
        contentBase: './docs',
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        disableHostCheck: true,
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
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|gif|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                use: [{
                    loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: 'fonts/',
                }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|mp3)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/',
                    }
                }]
            },
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
