const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LicensePlugin = require('webpack-license-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const now = new Date();
const year = now.getFullYear().toString();
const releaseDate = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-" + now.getDate().toString().padStart(2, '0');

module.exports = {
    entry: {
        index: './src/index.js',
        sw: './src/sw.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            excludeChunks: ['sw'],
            template: 'src/index.html'
        }),
        new LicensePlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/icon/*.png', to: path.resolve(__dirname, 'dist', 'icons', '[name][ext]')
                },
                {
                    from: 'src/icon/safari-pinned-tab.svg', to: 'icons'
                },
                {
                    from: 'src/icon/favicon.ico', to: 'icons'
                },
                {
                    from: 'src/icon/site.webmanifest', to: 'icons'
                },
                {
                    from: 'src/icon/browserconfig.xml', to: 'icons'
                }
            ]
        })
    ],
    output: {
        filename: '[name].js',
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
            },
            {
                test: /\.png$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
      conditionNames: ['svelte']  
    },
}