const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new CompressionPlugin(),
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!*.css'],
            cleanAfterEveryBuildPatterns: ['!*.css']
        })
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: {
        'app': './assets/js/app.js'
    },
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false
        })],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -5,
                    reuseExistingChunk: true,
                    chunks: "initial",
                    name: "vendors",
                    minSize: 0,
                    maxSize: 175000,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    maxSize: 175000,
                },
                defaultVendors: false,
                gsap: {
                    test: /[\\/]node_modules[\\/](gsap)[\\/]/,
                    name: 'gsap',
                    chunks: "all",
                    priority: 10,
                    maxSize: 175000,
                },
                swup: {
                    test: /[\\/]node_modules[\\/](swup|@swup)[\\/]/,
                    name: 'swup',
                    chunks: "all",
                    priority: 10,
                    maxSize: 175000,
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};