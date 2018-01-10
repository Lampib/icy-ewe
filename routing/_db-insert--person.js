let sizeOf = require('image-size');
let db     = require('../db');
let path   = require('path');

module.exports = addUser;

async function addUser(req, res, next) {
  let requiredFields = [
    'name',
    'email',
    'company_id',
  ];
  let booleanFields = [
    'primary',
  ];
  let optionalFields = [
    'phone',
  ];
  let optionalImages = [
    'thumb',
  ];

  let toInsert = {};

  requiredFields.forEach(fieldName => {
    if (!req.body[fieldName]) {
      throw Error(`Required field "${ fieldName }" was not provided when adding person.`);
    }
    toInsert[fieldName] = req.body[fieldName];
  });

  booleanFields.forEach(fieldName => {
    let positiveValues = [
      true, 'true', 'on', 'True', 'TRUE',
    ];
    if (positiveValues.indexOf(req.body[fieldName]) > -1) {
      toInsert[`company_${ fieldName }`] = true;
    } else {
      toInsert[`company_${ fieldName }`] = false;
    }
  });

  optionalFields.forEach(fieldName => {
    req.body[fieldName] && (toInsert[fieldName] = req.body[fieldName]);
  });

  optionalImages = optionalImages
    .forEach(fieldName => {
      if (!req.files || !req.files[fieldName]) { return null; }
      let file     = req.files[fieldName];
      let fileName = createFileName(file.mimetype);
      let filePath = path.join(global.appRoot, 'public', 'images', 'people', fileName);
      req.files[fieldName].mv(filePath)
        .catch(e => console.log(`${ fieldName } failed to move.`));
      toInsert[fieldName] = `/assets/images/people/${ fileName }`;
    });

  await db('people').insert(toInsert)
    .catch(e => { console.log(e); });

  next();
}

function createFileName(mimetype, minLength = 80) {
  let hash = '';
  do {
    hash += (+`${ Math.random() }`.replace(/\./g, '')).toString(36);
    hash = hash.replace(/^\d+/, '');
  } while (hash.length < minLength);

  return `${ hash }.${ mimetype.split('/').pop() }`;
}
