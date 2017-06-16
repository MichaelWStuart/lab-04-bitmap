'use strict';

const fileOps = require('../lib/file-ops.js');

module.exports = function(buffer) {
  this.os = buffer.toString(0,2);
  this.size = buffer.readUInt32LE(2);
  this.offset = buffer.readUInt32LE(10);
  this.DIBHeader = buffer.readUInt32LE(15, 54)
  this.colorTable = fileOps.readUINTwhatever(55, 1078)
  this.originalBuffer = buffer;
};
