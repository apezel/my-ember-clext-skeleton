var brocCore = require('./node_modules/my-ember-brocfile-core/Brocfile-core'),
    compileSass = require('broccoli-sass-source-maps'),
    autoprefixer = require('broccoli-autoprefixer');

var app = {
        path: 'app',
        destJs: '/js',
        imports: [
            'bower_components/d3/d3.js',
            'bower_components/moment/moment.js',
            'bower_components/moment/locale/fr.js',
            'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'
        ]
    };

module.exports = brocCore.build(app, function(trees, config) {

        appCss = compileSass(
            [app.path + '/styles/'],
            'app.scss',
            'css/' + config.modulePrefix + '.css',
            {sourceMapEmbed: true}
        );

        appCss = autoprefixer(appCss);

        trees.push(appCss);

    });