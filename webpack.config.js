const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const DEBUG = (NODE_ENV === 'development' || NODE_ENV === undefined);
const base_filename = DEBUG ? `[name]` : `[name]-[hash]`;
const rootDir = path.resolve(__dirname);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const plugins = [];
plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
}));
plugins.push(
    new MiniCssExtractPlugin({
        filename: `${base_filename}.css`,
        chunkFilename: "[name].css"
    })
);
if (DEBUG) {
    plugins.push(new webpack.NoEmitOnErrorsPlugin());
} else {
    plugins.push(
        new ManifestPlugin({
            fileName: 'webpack-manifest.json'
        })
    );
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
        })
    );
}

const config = {
    entry: {
        'index': `${rootDir}/ts/index.ts`,
        'layout': `${rootDir}/scss/layout.scss`,
        'main': `${rootDir}/scss/main.scss`
    },
    output: {
        path: `${rootDir}/static/build`,
        publicPath: '/static/',
        filename: `${base_filename}.js`
    },
    devtool: (DEBUG ? 'source-map' : false),
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                exclude: /(node_modules)/,
                test: /\.tsx?$/,
                loader: 'ts-loader?transpileOnly=true'
            },
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?mimetype=image/svg+xml'
            },
            {
                test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?mimetype=application/font-woff'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?mimetype=application/font-woff'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader?name=[path][name]-[hash].[ext]'
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(`${rootDir}/ts`),
            path.resolve(`${rootDir}/scss`),
            'node_modules'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.css', '.scss']
    }
};

if(!DEBUG) {
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ]
    }
}

module.exports = config;

