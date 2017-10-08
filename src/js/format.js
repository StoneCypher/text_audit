
const ttf = require('txt_tocfill'),
      clc = require('cli-color');





const tautology                = f => f,
      f_tautology              = _ => true,
      removeEmptyBlocks        = b => b.terms.length,
      removeEmptyRows          = r => r.count,
      removeEmptyRowsFromBlock = b => ({ file: b.file, terms: b.terms.filter(removeEmptyRows) });





const colNum = (num,tx) => (num > 10)? (clc.red(tx||num)) : (num? (clc.yellow(tx||num)) : (clc.green(tx||num)));





const writeBwTocRow = ({file, terms}) =>

    `${file}\n${ttf.compute({rows: terms.map(d => d.term), rightrows: terms.map(d => d.count)}).join('\n')}`;

const writeColorTocRow = ({file, terms}) =>

    `${clc.blackBright(file)}\n${ttf.compute({rows: terms.map(d => colNum(d.count,d.term)), rightrows: terms.map(d => colNum(d.count))}).join('\n')}`;





const writeBwRollupRow = res => {

    const topics = Object.keys(res);
    return `${ttf.compute({rows: topics, rightrows: topics.map(t => res[t])}).join('\n')}`;

};


const writeColorRollupRow = res => {

    const topics = Object.keys(res);
    return `${ttf.compute({rows: topics.map(t => colNum(res[t], t)), rightrows: topics.map(t => colNum(res[t]))}).join('\n')}`;

};




const list = (data, options, writer) =>

    data.map(   options['remove-empties']? removeEmptyRowsFromBlock : tautology)
        .filter(options['remove-empties']? removeEmptyBlocks        : f_tautology)
        .map(   writer)
        .join(  '\n\n');

const bwList      = (data, options) => list(data, options, writeBwTocRow);
const colorList   = (data, options) => list(data, options, writeColorTocRow);






const objectZeroFilter = obj =>
    Object.keys(obj).reduce( (acc, cur) => ((obj[cur]? (acc[cur] = obj[cur]) : true), acc) , {} );

const maybeObjectZeroFilter = (should, obj) =>
    should? objectZeroFilter(obj) : obj;

const rollup_aggregate = (data, options) =>
    maybeObjectZeroFilter(
    	options['remove-empties'],
    	[].concat(... data.map(d => d.terms))
        .reduce( (acc, cur) => ((acc[cur.term] = (acc[cur.term] || 0) + cur.count ), acc), {} )
    );

const rollup = (data, options, writer) =>
    writer( rollup_aggregate(data, options) );

const bwRollup    = (data, options) => rollup(data, options, writeBwRollupRow);
const colorRollup = (data, options) => rollup(data, options, writeColorRollupRow);





const json = data => JSON.stringify({ aggregate: rollup_aggregate(data), breakdown: data });





module.exports = { colorList, bwList, json, bwRollup, colorRollup };
