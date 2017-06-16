module.exports = class Bitmap {
  constructor(buffer) {
    this.os = buffer.readInt16LE(0)
    // this.size = buffer.readUInt32LE(2);
    // this.offset = buffer.readUInt32LE(10);
    // this.DIBHeader = buffer.readUInt32LE(15, 54)
    // this.colorTable = fileOps.readUINTwhatever(55, 1078)
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

};
