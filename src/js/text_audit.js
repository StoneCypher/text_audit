
const cmd   = require('commander'),

      pkg   = require('../../package.json'),
      audit = require('./audit.js');





const termList = tl => 

    tl.split(',').map(s => s.trim());





cmd.version(pkg.version)

   .option('-t, --terms',        
   	       'Comma-separated list of things to find [default todo,fixme,checkme]',
   	       termList)

   .option('-f, --format',       
   	       'Emission format (color|bw|json) [default color]',
   	       /^(color|bw|json)$/i,
   	       'color')

   .option('-s, --skip-empties', 
   	       'Remove empty rows from output [default true]',
   	       /^(true|false)$/i)

   .option('-g, --glob',
   	       'Glob of files to match [default ./**/*.js]')

   .parse(process.argv);

 console.log(cmd);





console.log( JSON.stringify(audit.check({

  glob        : cmd.glob   || './**/*.js',
  terms       : cmd.terms  || ['todo','fixme','checkme'],
  format      : cmd.format || 'color',
  skipEmpties : ( (cmd.skipEmpties) && (!([0,'0','false','f'].includes(cmd.skipEmpties))) )

})) );
