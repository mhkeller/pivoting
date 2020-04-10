const io = require('indian-ocean');
const pivot = require('./src/pivot.js');

const data = io.readDataSync('./tidyr/data-raw/relig_income.csv');
const result = pivot(data, data.columns.slice(1), ['income'], ['count']);

console.log(result);
