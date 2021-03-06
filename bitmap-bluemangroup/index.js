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

parseBitmap(filePaths[0], (err, data) => {          //parse
  if (err) return console.log(err);

  let bitmap = new Bitmap(data);                    //instantiate

  // bitmap.printTheBuffer();
  // bitmap.printColorTable();
  //
  // bitmap.colorScale('blue');                         //transform
  // bitmap.colorScale('red');
  bitmap.colorScale('green');
  // bitmap.deColorScale('blue');
  // bitmap.deColorScale('red');
  // bitmap.deColorScale('green');
  // bitmap.blueify();
  // bitmap.greyscale();
  // bitmap.invert();
  // bitmap.inverse();

  createBitmap(filePaths[0], bitmap);                //create
});
