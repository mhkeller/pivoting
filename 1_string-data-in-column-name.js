const io = require('indian-ocean');
const pivot = require('./src/pivot.js');

const religIncome = io.readDataSync('./tidyr/data-raw/relig_income.csv');
const result = pivot(religIncome, religIncome.columns.slice(1), 'income', 'count');

console.log(result);
