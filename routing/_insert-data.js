let sizeOf = require('image-size');
let db     = require('../db');
let path   = require('path');

const POSITIVE_VALUES = [
  true, 'true', 'on', 'True', 'TRUE',
];

module.exports = insertData;

function insertData(tableName, fields, simpleData, files) {
  let toInsert = {};

  fields.forEach(field => {
    switch (field.type) {
      case 'boolean':
        return isSimpleValueValid(simpleData[field.name], field)
          && insertBoolean(field, simpleData[field.name], toInsert);
        break;
      case 'string':
        return isSimpleValueValid(simpleData[field.name], field)
          && insertString(field, simpleData[field.name], toInsert);
        break;
      case 'image':
        return insertImage(field, files, toInsert, tableName);
        break;
    }
  });

  return db(tableName).insert(toInsert)
    .catch(e => { console.log(e); });
}

function isSimpleValueValid(providedValue, field) {
  if (typeof providedValue === 'undefined' || providedValue === '') {
    if (field.required) {
      throw Error(`Required field "${ field.name }" was not provided when adding person.`);
    } else {
      return false;
    }
  }
  return true;
}

function insertString(field, value, toInsert) {
  toInsert[field.name] = value;
}

function insertBoolean(field, value, toInsert) {
  if (POSITIVE_VALUES.indexOf(value) > -1) {
    toInsert[field.name] = true;
  } else {
    toInsert[field.name] = false;
  }
}

function insertImage(field, files, toInsert, tableName) {
  let file = files && files[field.name];

  if (!file) { return null; }

  toInsert[field.name] = createImage(file, tableName, simpleString(field.name)).imageSrc;
}

function createImage(file, baseFolder, subFolder) {
  let fileName = createFileName(file.mimetype);
  let filePath = path.join(global.appRoot, 'public', 'images', baseFolder, subFolder, fileName);
  let movePromise =  file.mv(filePath)
                         .catch(e => console.log(`Image: "${ baseFolder }, ${ subFolder }" failed to move.`));
  return {
    movePromise,
    imageSrc: `/assets/images/${ baseFolder }/${ subFolder }/${ fileName }`,
  };
}

function createFileName(mimetype, minLength = 80) {
  let hash = '';
  do {
    hash += (+`${ Math.random() }`.replace(/\./g, '')).toString(36);
    hash = hash.replace(/^\d+/, '');
  } while (hash.length < minLength);

  return `${ hash }.${ mimetype.split('/').pop() }`;
}

function simpleString(str) {
  return str.toLowerCase().replace([/^-a-z0-9/g, '-']).replace(/-{2,}/g, '-');
}
