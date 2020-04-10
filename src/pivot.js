module.exports = function pivot(data, columns, names, values, opts) {
	const keepCols = data.columns.filter(c => !columns.includes(c));
	const long = [];
	columns.forEach(col => {
		data.forEach(d => {
			const row = {};
			keepCols.forEach(c => {
				row[c] = d[c];
			});
			row[names] = col;
			row[values] = d[col];
			long.push(row);
		});
	});
	return long;
}
