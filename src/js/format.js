
const ttf = require('txt_tocfill'),
      clc = require('cli-color');





const tautology                = f => f,
      f_tautology              = _ => true,
      removeEmptyBlocks        = b => b.terms.length,
      removeEmptyRows          = r => r.count,
      removeEmptyRowsFromBlock = b => ({ file: b.file, terms: b.terms.filter(removeEmptyRows) });





const writeBwTocRow = ({file, terms}) =>

    `${file}\n${ttf.compute({rows: terms.map(d => d.term), rightrows: terms.map(d => d.count)}).join('\n')}`;





const colNum = (num,tx) => (num > 10)? (clc.red(tx||num)) : (num? (clc.yellow(tx||num)) : (clc.green(tx||num)));





const writeColorTocRow = ({file, terms}) =>

    `${clc.blackBright(file)}\n${ttf.compute({rows: terms.map(d => colNum(d.count,d.term)), rightrows: terms.map(d => colNum(d.count))}).join('\n')}`;





const list = (data, options, writer) =>

    data.map(   options['keep-empties']? tautology   : removeEmptyRowsFromBlock)
        .filter(options['keep-empties']? f_tautology : removeEmptyBlocks)
        .map(   writer)
        .join(  '\n\n');





const bw    = (data, options) => list(data, options, writeBwTocRow);
const color = (data, options) => list(data, options, writeColorTocRow);

const json  = data => JSON.stringify(data);





module.exports = { color, bw, json };
