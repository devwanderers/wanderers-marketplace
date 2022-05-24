const webpack = require('webpack')
const CracoLessPlugin = require('craco-less')
const tailswindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            const fallback = webpackConfig.resolve.fallback || {}
            Object.assign(fallback, {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                assert: require.resolve('assert'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify'),
                url: require.resolve('url'),
            })
            webpackConfig.resolve.fallback = fallback
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer'],
                }),
            ])
            webpackConfig.ignoreWarnings = [/Failed to parse source map/]
            return webpackConfig
        },
    },

    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {},
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    style: {
        postcssOptions: {
            plugins: [tailswindcss, autoprefixer],
        },
    },
}
