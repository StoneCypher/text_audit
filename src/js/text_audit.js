
const cmdParser = require('command-line-args'),

      pkg       = require('../../package.json'),
      audit     = require('./audit.js'),
      format    = require('./format.js');





const claArgDefs = [

  { name         : "terms",
    alias        : "t",
    type         : String,
    multiple     : true,
    defaultValue : ['todo','fixme','checkme'] },

  { name         : "format",
    alias        : "f",
    type         : f => ['colorRollup','bwRollup','colorList','bwList','json'].includes(f)? f : 'colorRollup',
    defaultValue : 'color' },

  { name         : "remove-empties",
    alias        : "r",
    type         : Boolean,
    defaultValue : false },

  { name         : "glob",
    alias        : "g",
    type         : String,
    multiple     : true,
    defaultValue : ['./src/**/*.js'] }

];





const options = cmdParser(claArgDefs),
      result  = audit.check({

                  glob          : options.glob,
                  terms         : options.terms,
                  removeEmpties : options['remove-empties']

                });

// console.log(JSON.stringify(options));
// console.log(JSON.stringify(result));

console.log( format[options.format](result, options) );
