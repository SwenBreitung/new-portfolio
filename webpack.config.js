module.exports = {
    module: {
        rules: [{
            test: /\.(glsl|vs|fs)$/,
            loader: 'webpack-glsl-loader'
        }]
    }
};