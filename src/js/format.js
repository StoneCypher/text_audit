
const ttf = require('txt_tocfill');

const color = data => ttf.compute({rows: data});

const json  = data => JSON.stringify(data),
      bw    = data => 'todo bw';

module.exports = { color, bw, json };
