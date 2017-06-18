const fs = require('fs');

const Bitmap = require('./model/bitmap.js');

const filePaths = [
  './assets/bitmap.bmp',
  './assets/finger-print.bmp',
  './assets/house.bmp',
  './assets/newpicpls.bmp',
  './assets/non-palette-bitmap.bmp',
];

const parseBitmap = (filePath, callback) =>
  fs.readFile(filePath, (err, data) =>
    callback(err, data));

const createBitmap = (filePath, bitmap) => {
  const path = `${filePath.slice(0, -4)}-${bitmap.transformType}.bmp`;
  fs.writeFile(path, bitmap.bufferClone, 'utf16le', () => {
    console.log(path, 'successfully created');
  });
};

parseBitmap(filePaths[2], (err, data) => {
  if (err) return console.log(err);

  const bitmap = new Bitmap(data);
  const name = process.argv[2]
  const method = bitmap[name] ? name : 'unidentified'

  console.log(method)

  createBitmap(filePaths[2], bitmap);

});


process.argv.forEach((v, i) => i === 2 && console.log(v))
