module.exports = function pivot(data, columns, names, values, opts) {
	// This assumes you've loaded the data with d3-dsv
	// so you have access to `.columns`
	// which maybe is fine?
	const keepCols = data.columns.filter(c => !columns.includes(c));
	const long = [];
	columns.forEach(col => {
		data.forEach(d => {
			const row = {};
			keepCols.forEach(c => {
				row[c] = d[c];
			});
			// TODO, add an option to ignore if fails a truth test to approximate `values_drop_na`
			row[names] = col;
			row[values] = d[col];
			long.push(row);
		});
	});
	return long;
}
