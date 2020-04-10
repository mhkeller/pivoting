module.exports = function pivot(data, cols, names, values, opts) {
	const columns = Array.isArray(cols) ? cols : cols(data.columns);

	const namesArr = Array.isArray(names) ? names : [names];
	values[1] = values[1] || (d => d);

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
			namesArr.forEach(n => {
				const nClean = Array.isArray(n) ? n : [n, q => q];
				row[nClean[0]] = nClean[1](col);
				row[values[0]] = values[1](d[col]);
				long.push(row);
			});
		});
	});
	return long;
};
