const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const now = new Date();
const year = now.getFullYear().toString();
const releaseDate = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-" + now.getDate().toString().padStart(2, '0');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'NCounter',
            template: 'src/index.html'
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
        new LicensePlugin(),
        new CopyWebpackPlugin(
            [
                'src/icon/*.png',
                'src/icon/safari-pinned-tab.svg',
                'src/icon/favicon.ico',
                'src/icon/site.webmanifest',
                'src/icon/browserconfig.xml'
            ],
            {
                to: 'icons'
            }
        )
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    interpolate: true
                }
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    'svelte-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                { search: '|BUILD_YEAR|', replace: year },
                                { search: '|BUILD_DATE|', replace: releaseDate}
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