const io = require('indian-ocean');
const pivot = require('./src/pivot.js');

const toInt = d => +d;

const data = io.readDataSync('./tidyr/data-raw/billboard.csv');

const result = pivot(data, columns => {
	return columns.filter(c => c.startsWith('wk'));
}, [['week', d => +d.replace('wk', '')]], ['rank', toInt]);

console.log(result);
