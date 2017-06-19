'use strict';

module.exports = class Bitmap {
  constructor(buffer) {
    this.os = buffer.toString('utf8', 0, 2);
    this.size = buffer.slice(2,4);
    this.offset = buffer.slice(10,14);
    this.dibHeaderSize = buffer.slice(14,54)
    this.colorTable = buffer.toString('hex', 54, 1078).match(/.{1,8}/g)
    this.colorTableBuffer = buffer.slice(54,1078)
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

    this.bufferClone.write(str, 54, 1078, 'hex')
  }

//First attempt. Translates from buffer to hex then back again.

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

//Second attempt. Manipulates buffer directly.

  invert() {
    this.transformType = 'inverted';
    for(var i = 0; i < this.colorTableBuffer.length; i++) {
      this.colorTableBuffer[i] = Math.floor(255 - this.colorTableBuffer[i]);
    }
  }

  greyscale() {
    this.transformType = 'greyscale';
    for(var i = 0; i < this.colorTableBuffer.length; i+=4) {
      let averageGrey = Math.floor((this.colorTableBuffer[i] + this.colorTableBuffer[i+1] + this.colorTableBuffer[i+2])/3);
      this.colorTableBuffer[i] = averageGrey;
      this.colorTableBuffer[i+1] = averageGrey;
      this.colorTableBuffer[i+2] = averageGrey;
    }
  }

//Alters red/green/blue ratios, increasing the chosen color by 80% the remaining distance to 255.

  colorScale(color) {
    if (color !== 'red' && color !== 'blue' && color !== 'green') {
      throw new Error('please enter either red, green, or blue')
    } else {
      this.transformType = `${color}-scale`;

      let i;

      if (color === 'red')
        i = 2;
      if (color === 'green')
        i = 1;
      if (color === 'blue')
        i = 0;

      for(i; i < this.colorTableBuffer.length; i+=4) {
        this.colorTableBuffer[i] = this.colorTableBuffer[i] +
        Math.floor(.8 * (255-this.colorTableBuffer[i]));
      }
    }
  }

//For fun. Reduces the chosen color to 0.

  deColorScale(color) {
    if (color !== 'red' && color !== 'blue' && color !== 'green') {
      throw new Error('please enter either red, green, or blue')
    } else {
      this.transformType = `${color}-removed`;

      let i;

      if (color === 'red')
        i = 2;
      if (color === 'green')
        i = 1;
      if (color === 'blue')
        i = 0;

      for(i; i < this.colorTableBuffer.length; i+=4) {
        this.colorTableBuffer[i] = 0;
      }
    }
  }

//Manipulates the blue levels by translating from hex and back again.

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
