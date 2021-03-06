let sizeOf = require('image-size');
let db     = require('../db');
let path   = require('path');
let bcrypt = require('bcrypt');
let uuidv4 = require('uuid/v4');

const POSITIVE_VALUES = [
  true, 'true', 'on', 'True', 'TRUE',
];

module.exports = insertData;

function insertData(tableName, fields, simpleData = {}, files = {}) {
  let formattedFields     = {};
  let UUID         = simpleData.uuid || uuidv4();
  let inserts      = [];

  let fieldPromises = fields
    .filter(field => {
      let value = simpleData[field.name];
      switch (field.type) {
        case 'string':
        case 'password':
          return isSimpleValueValid(value, field);
        default:
          return true;
      }
    })
    .map(field => {
      let value = simpleData[field.name];
      switch (field.type) {
        case 'one2many':
          return inserts.push(insertOne2Many(field, simpleData, files, tableName, UUID));
        case 'boolean':
          return insertBoolean(field, value, formattedFields);
        case 'string':
          return insertString(field, value, formattedFields);
        case 'password':
          return insertPassword(field, value, formattedFields);
        case 'image':
          return insertImage(field, files, formattedFields, tableName);
      }
    });

  if (simpleData.uuid) {
    inserts.push(
      Promise.all(fieldPromises)
      .then(uuid => {
        return db(tableName).where('uuid', simpleData.uuid).update(formattedFields);
      })
      .then(() => console.log(`Updated ${ UUID } in ${ tableName }.`))
      .catch(err => { throw Error(err); })
    );
  } else {
    inserts.push(
      Promise.all(fieldPromises)
      .then(() => {
        return addUUID(tableName, UUID)
      })
      .then(uuid => {
        formattedFields.uuid = uuid;
        return db(tableName).insert(formattedFields);
      })
      .then(() => console.log(`Inserted ${ UUID } into ${ tableName }.`))
      .catch(err => { throw Error(err); })
    );
  }

  return Promise.all(inserts)
  .catch(err => console.log(err));
}

function addUUID(tableName, UUID) {
  return new Promise(async (resolve, reject) => {
    await db('uuid').insert({ uuid : UUID, table : tableName })
    .catch(err => { throw Error(err); });
    resolve(UUID);
  });
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

function insertString(field, value, formattedFields) {
  formattedFields[field.name] = value;
}

function insertOne2Many(field, _simpleData, _files, parentName, parentUUID) {
  let inserts = [];
  let fields = field.fields.slice(0);
  fields.push(
    {
      name : 'relation_type',
      type : 'string',
    },
    {
      name : 'relation_uuid',
      type : 'string',
    }
  );
  let simpleDataList = Object.keys(_simpleData)
    // Limit the reduce to only items which have teh correct prefix
    .filter(key => key.indexOf(`${ field.name }__`) === 0)
    // Get an array of one2many inserts to make
    .reduce((acc, key) => {
      let index = +/\d+$/.exec(key);
      if (!index) { return acc; }
      index = index - 1;
      acc[index] = acc[index] || {};
      let newKey = /__(\D+)/.exec(key)[0].slice(2,-1);
      acc[index][newKey] = _simpleData[key];
      return acc;
    }, []);

  simpleDataList.forEach(simpleData => {
    simpleData.relation_type = parentName;
    simpleData.relation_uuid = parentUUID;
    inserts.push(insertData(field.name, fields, simpleData/*, files*/));
  });

  return Promise.all(inserts);
}

function insertPassword(field, value, formattedFields) {
  return bcrypt.hash(value, 11)
    .then(hash => {
      formattedFields[field.name] = hash;
    });
}

function insertBoolean(field, value, formattedFields) {
  if (POSITIVE_VALUES.indexOf(value) > -1) {
    formattedFields[field.name] = true;
  } else {
    formattedFields[field.name] = false;
  }
}

function insertImage(field, files, formattedFields, tableName) {
  let file = files && files[field.name];

  if (!file) { return null; }

  formattedFields[field.name] = createImage(file, tableName, simpleString(field.name)).imageSrc;
}

function createImage(file, baseFolder, subFolder) {
  let fileName    = createFileName(file.mimetype);
  let filePath    = path.join(global.appRoot, 'public', 'images', baseFolder, subFolder, fileName);
  let movePromise = file.mv(filePath)
                        .catch(err => console.log(`Image: "${ baseFolder }, ${ subFolder }" failed to move: ${ err }`));
  return {
    movePromise,
    imageSrc: `/assets/images/${ baseFolder }/${ subFolder }/${ fileName }`,
  };
}

function createFileName(mimetype) {
  return `${ uuidv4() }.${ mimetype.split('/').pop() }`;
}

function simpleString(str) {
  return str.toLowerCase().replace([/^-a-z0-9/g, '-']).replace(/-{2,}/g, '-');
}
