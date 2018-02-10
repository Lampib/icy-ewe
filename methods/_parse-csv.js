module.exports = parseCSV;

function parseCSV(csvString, { skipEmpty = false } = {}) {
  let lines = csvString.split('\n');
  let keys  = lines[0].split(',').map(prop => prop.trim());

  return lines.slice(1).map(line => {
    let parts = line.split(',').map(part => part.trim());

    return keys.reduce((acc, curr, i) => {
      if (parts[i] || !skipEmpty) {
        acc[curr] = parts[i];
      }

      return acc;
    }, {});
  });
}
