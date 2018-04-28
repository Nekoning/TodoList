'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var LiveReloadPlugin = require('webpack-livereload-plugin');

const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './out/'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".jsx", ".js", ".json", ".css"]
    },
    module: {
        rules: [
            {   test: /\.jsx$/, 
                loader: require.resolve('babel-loader'), 
                options: {
                    presets: ['react', 'es2016']
                },
                exclude:[path.resolve(__dirname, "/node_modules")]
            },
            {   test: /\.css$/, 
                use: ["style-loader", "css-loader"] 
            },
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html'
        })
    ]

};