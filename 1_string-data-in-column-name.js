const io = require('indian-ocean');

/* --------------------------------------------
 *
 * @function pivot
 * @param {Array} data Input data
 * @param {Array} columns List of column names to pivot
 * @param {String} name The name of the new column to hold the current column headers
 * @param {String} value The name of the column to hold the cell values
 * @param {Object} opts Some options, not currently implemented
 *
 * --------------------------------------------
 */
function pivot(data, columns, name, value, opts) {
	const keepCols = data.columns.filter(c => !columns.includes(c));
	const long = [];
	columns.forEach(col => {
		data.forEach(d => {
			const row = {};
			keepCols.forEach(c => {
				row[c] = d[c];
			});
			// TODO, add an option to ignore if fails a truth test to approximate `values_drop_na`
			row[name] = col;
			row[value] = d[col];
			long.push(row);
		});
	});
	return long;
}

/* --------------------------------------------
 * relig_income example
 */
const religIncome = io.readDataSync('./tidyr/data-raw/relig_income.csv');

const religIncomePivoted = pivot(religIncome, religIncome.columns.slice(1), 'income', 'count');

console.log(religIncomePivoted);
