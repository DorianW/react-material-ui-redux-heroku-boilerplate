module.exports = function override(config, env) {
    //do stuff with the webpack config...
    const loaders = config.module.rules[2].oneOf;
    loaders.splice(loaders.length - 1, 0, {
        test: /\.svg$/,
        use: [{
            loader: 'svg-url-loader',
            options: {
                limit: 10000,
            }
        }]
    })
    return config;
}