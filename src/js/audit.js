
const fs   = require('fs'),

      glob = require('glob');





const to_lines = text => {

	return text.replace(/\r\n/g, '\n')
               .replace(/\r/g,   '\n')
               .split('\n')
               .filter(l => l !== '');

};





const fromFile = fpath => 

    ({file: fpath, lines: to_lines(`${fs.readFileSync(fpath)}`) });





const checkFile = ({file, lines}, {terms}) =>

    ({
    	file, 
    	terms: (terms||[]).map(t => 
    		({term: t, count: lines.filter(l => l.indexOf(t) !== -1).length})
    	)
    });





const check = config => 

  glob.sync(config.glob)
      .map(fromFile)
      .map(filedata => checkFile(filedata, config)); 





module.exports = { check };
