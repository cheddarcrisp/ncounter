const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Terser = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization:{
        minimizer: [new Terser({
            test: /\.m?js$/,
        })]
    }
});