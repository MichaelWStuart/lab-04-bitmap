'use strict'

const fs = require('fs')

const readBitmap = module.exports = {}

const files = [
  './assets/bitmap.bmp',
  './assets/finger-print.bmp',
  './assets/house.bmp',
  './assets/newpicpls.bmp',
  './assets/non-palette-bitmap.bmp'
]

// const display = data => console.log(data)

readBitmap.getFileHeader = (file) => fs.readFile(file, (err, data) => data.slice(0, 14)))

readBitmap.getDIBHeader = (file) => fs.readFile(file, (err, data) => data.slice(15, 54))

readBitmap.getColorTable = (file) => fs.readFile(file, (err, data) => data.slice(55, 1078))

readBitmap.getPixelArray = (file) => fs.readFile(file, (err, data) => data.slice(1079))

// readBitmap.getFileHeader(files[0], display)
