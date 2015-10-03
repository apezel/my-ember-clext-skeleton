var concatenate = require('broccoli-concat'),
    mergeTrees  = require('broccoli-merge-trees'),
	compileES6 	= require('broccoli-es6-concatenator'),
	HtmlbarsCompiler = require('ember-cli-htmlbars'),
	findBowerTrees = require('broccoli-bower'),
	env = require('broccoli-env').getEnv(),
	writeFile = require('broccoli-file-creator'),
	uglifyJavaScript = require('broccoli-uglify-js'),
    Funnel = require('broccoli-funnel'),
    path = require('path'),
	trees = [];
	

module.exports.build = function(app, fn) {
	
	var config = require('./'+app.path+'/config/environment')(env);
	var appJs, appCss;

	// =========================
	// = TEMPLATES AND VENDORS =
	// =========================

	var appTree = new Funnel(app.path, {
        srcDir: '/',
        include: ['*.js', '**/*.js'],
        destDir: config.modulePrefix
    });

    var templateTree = new Funnel(app.path, {
        srcDir: '/',
        include: ['**/*.hbs'],
        destDir: config.modulePrefix
    });

	templateTree = new HtmlbarsCompiler(templateTree, {
        isHTMLBars: true,
        EmberENV: config.EmberENV,
        templateCompiler: require('./bower_components/ember/ember-template-compiler')
	});

	var sourceTrees = [templateTree, appTree];

	// = ----------- =

	// ===============
	// = ENVIRONMENT =
	// ===============

	var configTree = writeFile(config.modulePrefix + '-config.js', 'export default '+ JSON.stringify(config));

	var appAndDependencies = mergeTrees(sourceTrees, { overwrite: true });

	appAndDependencies = mergeTrees([appAndDependencies, configTree]);
	
	var ES6Modules = require('broccoli-es6modules');
	
    var appJs = new ES6Modules(appAndDependencies, {
	    esperantoOptions: {
	      absolutePaths: true,
	      strict: true,
	      _evilES3SafeReExports: false
	    }
	});
    
    var babelTranspiler = require('broccoli-babel-transpiler');
	appJs = babelTranspiler(appJs, {
        ignore: [app.path+ '/templates/*.js', app.path+ '/templates/**/*.js'],
		compact: env === "production" ? true:"auto",
//        modules: "umd",
//        moduleIds: true,
        "whitelist": [
            "strict",
            "es6.classes",
            "es6.constants",
            "es6.destructuring",
            "es6.forOf",
            "es6.modules",
            "es6.objectSuper",
            "es6.parameters.default",
            "es6.parameters.rest",
            "es6.properties.computed",
            "es6.properties.shorthand",
            "es6.regex.sticky",
            "es6.regex.unicode",
            "es6.spec.blockScoping",
            "es6.spec.symbols",
            "es6.spec.templateLiterals",
            "es6.spread",
            "es6.tailCall",
            "es6.templateLiterals",
            "es6.arrowFunctions",
            "es6.blockScoping"
        ]
    });
	
    
    appJs = concatenate(appJs, {
        inputFiles: [config.modulePrefix + '/*.js', config.modulePrefix + '/**/*.js', config.modulePrefix + '-config.js'],
        outputFile: app.destJs + '/' + config.modulePrefix + '.js',
        description: 'Concat: App',
        header     : '/** Copyright Apyx 2015 **/'
    });
	
	if (env == "production") {
		appJs = uglifyJavaScript(appJs);
	}
    
	trees.push(appJs);
    
    //call build function
    fn(trees, config);

    var ember = env === "production" ? "ember.min.js":"ember.js";

    var imports = [
        'node_modules/broccoli-babel-transpiler/node_modules/babel-core/browser-polyfill.min.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/ember/ember-template-compiler.js',
        'bower_components/ember/'+ember,
        'vendor/loader.js',
        'vendor/defines.js',
        'bower_components/ember-load-initializers/ember-load-initializers.js',
        'vendor/x-resolver.js'
    ];
    
    if (app.imports) {
        
        imports = imports.concat(app.imports);
        
    }
    
    var subtrees = [];
    imports.forEach(function(importPath) {
        
        
        subtrees.push(new Funnel(path.dirname(importPath), {
            include: [path.basename(importPath)],
            destDir: 'imports'
        }));
        
    });

    var importJs = concatenate(mergeTrees(subtrees), {
            inputFiles : imports.map(function(x) { return "imports/"+path.basename(x); }),
            outputFile : app.destJs + '/imports.js',
            header     : '/** Copyright Apyx 2015 **/'
        });

    if (env == "production") {
        importJs = uglifyJavaScript(coreJs);
    }
    
    var publicFiles = new Funnel('./public');

    // merge HTML, JavaScript and CSS trees into a single tree and export it
    return mergeTrees(trees.concat([importJs, publicFiles]), {overwrite: true});
    
};