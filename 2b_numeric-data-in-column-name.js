const io = require('indian-ocean');

/* --------------------------------------------
 *
 * Not yet implemented
 *
 * --------------------------------------------
 */
function pivot() {
}

/* --------------------------------------------
 * relig_income example
 */
const religIncome = io.readDataSync('./tidyr/data-raw/relig_income.csv');

// could also do second argument as `(col, i) => i > 0;
const religIncomePivoted = pivot()
	.columns(religIncome.columns.slice(1))
	.names(['income'])
	.values(['count'])(religIncome);

console.log(religIncomePivoted);


/* --------------------------------------------
 * Billboard example
 */
const toInt = d => +d;

const billboard = io.readDataSync('./tidyr/data-raw/billboard.csv');

// Maybe also support regex for column names in second argument
// The second argument could also be a filter function on the `data.columns`
const billboardPivoted = pivot()
	.columns(col => col.startsWith('wk'))
	.names(['week'])
	// transforms are matched up by index
	.transformNames([d => +d.replace('wk', '')])
	.values(['rank'])
	.transformValues([toInt])
	.options({
		filter: d => d.rank !== null // filter long format data
	})(billboard);

console.log(billboardPivoted);
