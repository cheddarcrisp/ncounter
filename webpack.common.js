const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'NCounter',
            meta: {viewport: 'width=device-width, initial-scale=1.0'}
        }),
        new GoogleFontsPlugin({
            fonts: [
                { family: "Material Icons" }
            ],
            local: false
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/sw.js'),
            publicPath: './'
        }),
        new LicensePlugin()
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    'svelte-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                { search: '|BUILD_YEAR|', replace: '2020' },
                                { search: '|BUILD_DATE|', replace: '2020-02-28'}
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
}