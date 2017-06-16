module.exports = class Bitmap {
  constructor(buffer) {
    this.os = buffer.toString('utf8', 0, 2)
    this.size = buffer.readUInt32LE(2);
    this.offset = buffer.readUInt32LE(10);
    this.dibHeaderSize = buffer.readUInt32LE(14)
    this.colorTable = buffer.toString('hex', 58, 186).match(/.{1,8}/g)
    this.bufferClone = buffer;
  }

  printTheOriginalOs() {
    console.log(this.os)
  }

  changeTheOs(value) {
    this.bufferClone.writeInt16LE(value, 0)
  }

  printTheBuffer() {
    console.log(this.bufferClone)
  }

  printSize() {
    console.log(`${this.size} bytes`)
  }

  printColorTable() {
    console.log(this.colorTable)
  }

};
