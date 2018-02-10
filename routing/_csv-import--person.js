let insertData = require('../routing/_insert-data');
let parseCSV   = require('../methods/_parse-csv');
const FIELDS   = require('../config/_schema--person');

module.exports = importPeopleFromCSV;

async function importPeopleFromCSV(req, res, next) {
  let csv        = req.files.csv;
  let bufferCSV  = csv.data;
  let stringCSV  = csv.data.toString('utf8');
  let peopleData = parseCSV(stringCSV, { skipEmpty : true });

  await Promise.all(peopleData.map(person => insertData('person', FIELDS, person, {})))
  .catch(err => console.log(err));

  next();
}
