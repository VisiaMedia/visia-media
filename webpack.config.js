const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isAnalyze = process.env.ANALYZE === 'true';

module.exports = {
    mode: 'production',
    entry: {
        app: './assets/js/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // Main bundle name
        chunkFilename: '[name].[contenthash:8].js', // Unique name for async chunks
    },
    devtool: false, // Disable source maps in production
    performance: {
        hints: 'warning',
        maxEntrypointSize: 400000, // Limiet voor initiële laadgrootte
        maxAssetSize: 300000 // Max asset grootte
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true, // Parallelle processen inschakelen
            terserOptions: {
                compress: {
                    drop_console: true, // Console.logs verwijderen voor productie
                    drop_debugger: true, // Debuggers verwijderen
                    dead_code: true, // Dode code verwijderen
                    passes: 2, // Optimalisatie passes verhogen voor betere compressie
                },
                mangle: true, // Variabelen en functie namen verkleinen
                format: {
                    comments: false // Alle opmerkingen verwijderen
                },
            },
            extractComments: false,
        })],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            maxSize: 350000, // verhoog de chunksize limiet
            cacheGroups: {
                blobity: {
                    test: /[\\/]node_modules[\\/](blobity)[\\/]/,
                    name: 'blobity',
                    priority: 20,
                    chunks: 'async'
                },
                dayjs: {
                    test: /[\\/]node_modules[\\/](dayjs)[\\/]/,
                    name: 'dayjs',
                    priority: 20,
                    chunks: 'async'
                },
                infiniteScroll: {
                    test: /[\\/]node_modules[\\/](infinite-scroll)[\\/]/,
                    name: 'infinite-scroll',
                    priority: 20,
                    chunks: 'async'
                },
                masonry: {
                    test: /[\\/]node_modules[\\/](masonry-layout)[\\/]/,
                    name: 'masonry',
                    priority: 20,
                    chunks: 'async'
                },
                imagesLoaded: {
                    test: /[\\/]node_modules[\\/](imagesloaded)[\\/]/,
                    name: 'imagesloaded',
                    priority: 20,
                    chunks: 'async'
                },
                draggableInertia: {
                    test: /[\\/]node_modules[\\/](gsap)[\\/](Draggable|InertiaPlugin)\.js/,
                    name: 'draggable-inertia',
                    priority: 25,
                    chunks: 'async'
                },
                gsap: {
                    test: /[\\/]node_modules[\\/](gsap)[\\/](?!Draggable|InertiaPlugin)/,
                    name: 'gsap',
                    enforce: true,
                    priority: 10,
                    chunks: 'all'
                },
                swup: {
                    test: /[\\/]node_modules[\\/](swup|@swup)[\\/]/,
                    name: 'swup',
                    enforce: true,
                    priority: 10,
                    chunks: 'all'
                },
                swiper: {
                    test: /[\\/]node_modules[\\/](swiper)[\\/]/,
                    name: 'swiper',
                    priority: 20,
                    chunks: 'async'
                },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
                generator: {
                    filename: 'assets/[name].[contenthash:7][ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!*.css'],
            cleanAfterEveryBuildPatterns: ['!*.css']
        }),
        isAnalyze && new BundleAnalyzerPlugin()
    ].filter(Boolean),
};