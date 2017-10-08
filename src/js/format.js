
const ttf = require('txt_tocfill');





const tautology                = f => f,
      f_tautology              = _ => true,
      removeEmptyBlocks        = b => b.terms.length,
      removeEmptyRows          = r => r.count,
      removeEmptyRowsFromBlock = b => ({ file: b.file, terms: b.terms.filter(removeEmptyRows) });





const writeBwTocRow = ({file, terms}) =>

    `${file}\n${ttf.compute({rows: terms.map(d => d.term), rightrows: terms.map(d => d.count)}).join('\n')}`;





const writeColorTocRow = ({file, terms}) =>

    `${file}\n${ttf.compute({rows: terms.map(d => d.term), rightrows: terms.map(d => d.count)}).join('\n')}`;





const list = (data, options, writer) =>

    data.map(   options['keep-empties']? tautology   : removeEmptyRowsFromBlock)
        .filter(options['keep-empties']? f_tautology : removeEmptyBlocks)
        .map(   writer)
        .join(  '\n\n');





const bw    = (data, options) => list(data, options, writeBwTocRow);
const color = (data, options) => list(data, options, writeColorTocRow);

const json  = data => JSON.stringify(data);





module.exports = { color, bw, json };
