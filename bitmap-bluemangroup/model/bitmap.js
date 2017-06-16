module.exports = class Bitmap {
  constructor(buffer) {
    this.os = buffer.toString('utf8', 0, 2)
    this.size = buffer.readUInt32LE(2);
    this.offset = buffer.readUInt32LE(10);
    this.dibHeaderSize = buffer.readUInt32LE(14)
    this.colorTable = buffer.toString('hex', 55, this.offset-1).match(/.{1,8}/g)
    this.bufferClone = buffer;
    this.transformType = '';
  }

  printTheBuffer() {
    console.log(this.bufferClone)
  }

  printColorTable() {
    console.log(this.colorTable)
  }

  updateColorTable(str) {
    this.bufferClone.write(str, 55, ((this.offset-1-55)/8), 'hex')
  }

  whitewash() {
    this.transformType = 'whitewashed'
    this.colorTable = [...this.colorTable].map(v => 'ffffff00')
    this.updateColorTable(this.colorTable.join(''))
  }

  inverse() {
    this.transformType = 'inversed'
    const rgbValues = [...this.colorTable].map(a => {
      return [a.slice(0, 2), a.slice(2,4), a.slice(4, 6)].map(b => {
        const rgbValue = (Math.abs(255 - parseInt(b, 16))).toString(16)
        return rgbValue.length === 1 ? `0${rgbValue}` : rgbValue
      }).join('')
    })
    this.updateColorTable(rgbValues.join(''))
  }

  grayscale() {
    this.transformType = 'grayscale'
    const rgbValues = [...this.colorTable].map(a => {
      // let intColors = [parseInt(a.slice(0, 2), 16), parseInt(a.slice(2,4), 16), parseInt(a.slice(4, 6), 16)];
      let one = parseInt(a.slice(0,2), 16);
      let two = parseInt(a.slice(2,4), 16);
      let three = parseInt(a.slice(4, 6), 16);
      let average = Math.floor((one + two + three)/3);
      one = average.length === 1 ? `0${average.toString(16)}` : average.toString(16);
      two = average.length === 1 ? `0${average.toString(16)}` : average.toString(16);
      three = average.length === 1 ? `0${average.toString(16)}` : average.toString(16);
      let rgbValue = [one, two, three].join('')+'00';
      console.log(rgbValue);
      return rgbValue;
    })
    console.log(rgbValues.join(''));
    this.updateColorTable(rgbValues.join(''));
  }
};
