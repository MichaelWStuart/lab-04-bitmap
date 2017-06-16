const fs = require('fs')

const Bitmap = require('./model/bitmap.js')

const filePaths = [
  './assets/bitmap.bmp',
  './assets/finger-print.bmp',
  './assets/house.bmp',
  './assets/newpicpls.bmp',
  './assets/non-palette-bitmap.bmp'
]

const parseBitmap = (filePath, callback) =>
  fs.readFile(filePath, (err, data) =>
    callback(err, data))

parseBitmap(filePaths[0], (err, data) => {
  if (err) return console.log(err)
  let bitmap = new Bitmap(data);

  //this is where we call our methods on the instantiated bitmap:

  bitmap.printTheOriginalOs()

  bitmap.printTheBuffer()

  const arbitraryValue = '19777'

  bitmap.changeTheOs(arbitraryValue)

  bitmap.printTheBuffer()

})
