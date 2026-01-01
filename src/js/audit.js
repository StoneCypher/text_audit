
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





const a_concat = AofA => [].concat(... AofA),
      uniq     = Arr  => [... new Set(Arr)];

/**
 * Audits files matching glob patterns for occurrences of specified search terms
 *
 * @param {Object} config - Configuration object for the audit
 * @param {string[]} config.glob - Array of glob patterns to match files (e.g., ['./src/**/*.js'])
 * @param {string[]} config.terms - Array of terms to search for in each file (e.g., ['TODO', 'FIXME'])
 * @returns {Object[]} Array of file audit results, where each result contains:
 *   - {string} file - The file path
 *   - {Object[]} terms - Array of term results with properties:
 *     - {string} term - The search term
 *     - {number} count - Number of times the term appears in the file
 *
 * @example
 * const results = check({
 *   glob: ['./src/**/*.js'],
 *   terms: ['TODO', 'FIXME']
 * });
 * // Returns: [{ file: 'src/app.js', terms: [{ term: 'TODO', count: 3 }, { term: 'FIXME', count: 1 }] }]
 */
const check = config =>

  uniq(a_concat(config.glob.map(g => glob.sync(g))))
      .map(fromFile)
      .map(filedata => checkFile(filedata, config)); 





module.exports = { check };
