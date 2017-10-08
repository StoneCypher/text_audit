
const audit = require('./text_audit.js');





console.log(JSON.stringify(audit.check({

  glob: 'src/js/*.js',

  terms: [
    'whargarbl',
    'todo',
    'comeback',
    'checkme'
  ]

})));
