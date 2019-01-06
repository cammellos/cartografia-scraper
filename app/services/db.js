import electron from 'electron';
import path from 'path';

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const Datastore = require('nedb');

const dbPath = path.join(userDataPath, 'items.v1.db');
const db = new Datastore({ filename: dbPath, autoload: true });

function isDuplicate(message) {
  const regex = /Can't insert key/g;
  const matches = regex.exec(message);
  return matches && matches[0];
}

export function ensure() {
  return new Promise((resolve, reject) => {
    db.ensureIndex({ fieldName: 'id', unique: true }, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

export function insert(item) {
  return ensure().then(
    () =>
      new Promise((resolve, reject) => {
        db.insert(item, (err, newItem) => {
          if (err && !isDuplicate(err.message)) {
            reject(err);
          }
          resolve(newItem);
        });
      })
  );
}

export function insertBulk(items) {
  return Promise.all(items.map(insert));
}
