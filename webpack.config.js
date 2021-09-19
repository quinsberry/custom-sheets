const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const plugins = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'public/favicon.ico'), to: path.resolve(__dirname, 'dist')},
                {from: path.resolve(__dirname, 'public/logo.png'), to: path.resolve(__dirname, 'dist')},
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ];

    if (isDev) {
        plugins.push(new ESLintPlugin({
            extensions: ['ts'],
            emitError: false,
            failOnError: false,
            failOnWarning: false,
            emitWarning: true,
        }));
    }

    return plugins;
};

console.info('Process node env:', process.env.NODE_ENV);
console.info('Is in production mode:', isProd);

module.exports = {
    entry: './src/index.ts',
    mode: process.env.NODE_ENV || 'development',
    devtool: isDev ? 'inline-source-map' : false,
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '*': path.resolve(__dirname, './src'),
        },
    },
    devServer: {
        static: './dist',
        port: 3000,
        hot: isDev,
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};
