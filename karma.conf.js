module.exports = function(config) {
    config.set(
        frameworks: ['mocha'],
        basePath: '',
        files: [
            '*.js'
        ],

        client: {
            mocha: {
                reporter:'html',
                ui: 'tdd'
            }
        }
    );
};
