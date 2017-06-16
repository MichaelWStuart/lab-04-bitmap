module.exports = class Bitmap {
  constructor(buffer) {
    this.os = buffer.toString('utf8', 0, 2);
    this.size = buffer.readUInt32LE(2);
    this.offset = buffer.readUInt32LE(10);
    this.dibHeaderSize = buffer.readUInt32LE(14);
    this.colorTable = buffer.toString('hex', 58, 186).match(/.{1,8}/g);
    this.bufferClone = buffer;
    this.transformType = '';
  }

  printTheBuffer() {
    console.log(this.bufferClone);
  }

  printColorTable() {
    console.log(this.colorTable);
  }

  updateColorTable(str) {
    this.bufferClone.write(str, 58, 128, 'hex');
  }

  inverse() {
    this.transformType = 'inversed';
    const rgbValues = [...this.colorTable].map(a => {
      return [a.slice(0, 2), a.slice(2,4), a.slice(4, 6)].map(b => {
        const rgbValue = (255 - parseInt(b, 16)).toString(16);
        return rgbValue.length === 1 ? `0${rgbValue}` : rgbValue;
      }).join('');
    });
    this.updateColorTable(rgbValues.join(''));
  }

  blueify(){
    this.transformType = 'blueified';
    const rgbValues = [...this.colorTable].map(a => {
      return [a.slice(0, 2), a.slice(2,4), a.slice(4, 6)].map((b, i) => {
        let rgb = i === 0 ? 'ff' : Math.floor(parseInt(b,16)/2).toString(16);
        return rgb.length === 1 ? `0${rgb}` : rgb;
      }).join('');
    });
    this.updateColorTable(rgbValues.join(''));
  }
};
