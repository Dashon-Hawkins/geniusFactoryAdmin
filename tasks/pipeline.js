/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */

// Below, as a demonstration, you'll see the built-in dependencies
// linked in the proper order order

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = ['styles/**/*.css', 'styles/**/*.css.map'];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Bring in the socket.io client
  // '/js/dependencies/socket.io.js', <<< Not needed in SailsJS v0.11.0+ because it is now in js/dependencies/sails.io.js. Uncomment if using SailsJS v 0.10.0 or lower only.>>>

  // Load sails.io before everything else
  // then beef it up with some convenience logic for talking to Sails.js this will bring in the socket.io client.

  'js/dependencies/sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/angular.1.3.js',

  // jQuery dependency <<< Probably not used if you didn't do --linker when you 1st set up SailsJS API (sails new YourAppNameHere -—linker) and are using AngularJS on front-end instead. Uncomment if not using AngularJS.  I didn’t use the --linker prarameter. That’s because there’s no longer a requirement to use it. By default, that functionality is built into every Sails project. This project uses Sails v0.11.0 w/ AngularJS. (e.g. /tasks/config/sails-linker.js). The jQuery dependency below, may need to be comented out.

  '/js/dependencies/jquery-1.11.1.js',

  'js/dependencies/**/*.js',

  // A simpler boilerplate library for getting you up and running w/ an
  // automatic listener for incoming messages from Socket.io. This was used older version of like SailsJS v0.10 or lower, with --linker. (see /tasks/config/sails-linker.js)

  // <<< Below is currently commented out becaue it is not used because of use of AngularJS on front-end. There is currently no linker folder. When you 1st set up sails new YourAppNameHere --no linker. Uncomment if not using AngularJS on front-end then in CLI $ sails new YourAppNameHere --linker  I didn’t use the --linker prarameter. That’s because there’s no longer a requirement to use it. By default, that functionality is built into every Sails project. This project uses Sails v0.11.0 with AngularJS. (e.g. /tasks/config/sails-linker.js)

  // '/**/app.js', <<< May or may not need to uncomment.>>>

  // *->    put other dependencies here   <-*

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/public/signup/SignupModule.js',
  'js/**/*.js'

  // All of the rest of your app scripts imported here if you use linker
  // 'linker/**/*.js'  <<< Not used anymore in Sails v0.11.0+ automatically added. See above comments. (See )>>>

];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = ['templates/**/*.html'];

// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/', tplPath);
});
