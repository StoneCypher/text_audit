
const cmdParser = require('command-line-args'),

      pkg       = require('../../package.json'),
      audit     = require('./audit.js'),
      format    = require('./format.js');





const claArgDefs = [

  { name         : "terms",        
    alias        : "t", 
    type         : String, 
    multiple     : true,
    defaultValue : 'todo,fixme,checkme' },

  { name         : "format",       
    alias        : "f", 
    type         : f => ['color','bw','json'].includes(f)? f : 'color',
    defaultValue : 'color' },

  { name         : "skip-empties", 
    alias        : "s", 
    type         : Boolean,
    defaultValue : true },

  { name         : "glob",         
    alias        : "g", 
    type         : String, 
    multiple     : true,
    defaultValue : ['./src/**/*.js'] }

];





const options = cmdParser(claArgDefs),
      result  = audit.check({

                  glob        : options.glob,   
                  terms       : options.terms,  
                  skipEmpties : options.skipEmpties

                });

console.log( format[options.format](result) );
