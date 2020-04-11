const io = require('indian-ocean');

/* --------------------------------------------
 *
 * @function pivot
 * @param {Array} data Input data
 * @param {Array|Function} columns List of column names to pivot. Or, a function passed to filter on data.columns
 * @param {Array} names A list of names of the new columns to hold the current column headers. Each item in the array can also be a two-dimensional array containing ['STRINGNAME', optionalTransformFunction]`
 * @param {Array} values The name of the cell value column as a two-dimensional array containing `['STRINGNAME', optionalTransformFunction]`.
 * @param {Object} opts Some options, not currently implemented
 *
 * --------------------------------------------
 */
function pivot(data, cols, names, values, opts) {
	const columns = Array.isArray(cols) ? cols : data.columns.filter(cols);

	values[1] = values[1] || (d => d);

	const keepCols = data.columns.filter(c => !columns.includes(c));
	const long = [];
	columns.forEach(col => {
		data.forEach(d => {
			const row = {};
			keepCols.forEach(c => {
				row[c] = d[c];
			});
			// TODO, add an option to ignore if fails a truth test to approximate `values_drop_na`
			names.forEach(n => {
				const nClean = Array.isArray(n) ? n : [n, q => q];
				row[nClean[0]] = nClean[1](col);
				row[values[0]] = values[1](d[col]);
				long.push(row);
			});
		});
	});
	return long;
}

/* --------------------------------------------
 * relig_income example
 */
const religIncome = io.readDataSync('./tidyr/data-raw/relig_income.csv');

// could also do second argument as `(col, i) => i > 0;
const religIncomePivoted = pivot(religIncome, religIncome.columns.slice(1), ['income'], ['count']);

console.log(religIncomePivoted);


/* --------------------------------------------
 * Billboard example
 */
const toInt = d => +d;

const billboard = io.readDataSync('./tidyr/data-raw/billboard.csv');

// Maybe also support regex for column names in second argument
// The second argument could also be a filter function on the `data.columns`
const billboardPivoted = pivot(billboard,
	col => col.startsWith('wk'),
	[['week', d => +d.replace('wk', '')]],
	['rank', toInt]);

console.log(billboardPivoted);
