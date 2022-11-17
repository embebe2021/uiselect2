const path = require('path');
const WixStorybookWebpackPlugin = require('wix-storybook-utils/WixStorybookWebpackPlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { decorateMainConfig } = require('wix-storybook-config');

const options = {
    moduleName: 'magebuilder'
};

module.exports = decorateMainConfig({
    stories: ['../stories/*.story.@(js|jsx|ts|tsx)', '../src/**/*.story.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links'],
    webpackFinal: config => {
        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.svg$/;

        config.resolve.alias = {
            ...config.resolve.alias,
            'wix-storybook-utils': path.resolve(__dirname, '..', 'node_modules/wix-storybook-utils/dist/src')
        };

        config.plugins.push(new WixStorybookWebpackPlugin(options));

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            include: [
                path.resolve(__dirname, '..', 'src')
            ],
            use: [
                {
                    loader: require.resolve('ts-loader'),
                    options: {
                        transpileOnly: true
                    }
                }
            ]
        });

        config.resolve.extensions.push('.ts', '.tsx');

        config.module.rules.push({
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: ['@svgr/webpack', 'url-loader']
        });

        config.resolve.plugins = config.resolve.plugins || [];

        config.resolve.plugins.push(
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json')
            })
        );

        return config;
    },
    core: {
        builder: 'webpack5'
    },
    staticDirs: ['../public']
});
