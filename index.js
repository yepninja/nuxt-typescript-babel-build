
module.exports = function () {
    if (!(this.options && this.options.cli && this.options.extensions && this.options.build)) {
        return
    }

    // Change color of CLI banner
    this.options.cli.bannerColor = 'blue';
    if (!this.options.extensions.includes('ts')) {
        this.options.extensions.push('ts');
    }
    // Extend Builder to handle .ts/.tsx files as routes and watch them
    this.options.build.additionalExtensions = ['ts', 'tsx'];

    this.extendBuild((config, { isClient, isModern }) => {

        if (!config.resolve || !config.resolve.extensions || !config.module) return

        config.resolve.extensions.push('.ts', '.tsx');
        config.module.rules.push({
        test: /\.tsx?$/,
        use: [
            {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-typescript',
                    '@nuxt/babel-preset-app'
                ],
                plugins: [
                    'babel-plugin-vuex-simple'
                ]
            }
            }
        ]
        })

    })
}