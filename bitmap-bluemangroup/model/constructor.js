'use strict';

const fileOps = require('../lib/file-ops.js');

const constructor = module.exports = {};

constructor.Bitmap = (buffer) => {
  this.os = buffer.toString(0,2);
  this.size = buffer.readUInt32LE(2);
  this.offset = buffer.readUInt32LE(10);
  this.DIBHeader = fileOps.getDIBHeader(buffer)
  this.colorTable = fileOps.getColorTable(buffer)
  this.originalBuffer = buffer;
};
