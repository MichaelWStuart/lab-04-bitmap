'use strict';

const Bitmap = require('../model/bitmap.js');
const expect = require('expect');

let testBitmap = new Bitmap([0]);

describe('bitmap.js', function(){
  describe('invert', function(){
    it('should invert the color table', function(){
      let testInvert = testBitmap;
      testInvert.colorTableBuffer = [0,0,0]
      testInvert.invert();
      expect(testInvert.colorTableBuffer).toEqual([255,255,255]);
    })
  })
  describe('greyscale', function(){
    it('should average the colors and return the average for all three - RGB', function(){
      let testGrey = testBitmap;
      testGrey.colorTableBuffer = [0, 50, 100]
      testGrey.greyscale();
      expect(testGrey.colorTableBuffer).toEqual([50,50,50]);
    })
  })
  describe('colorScale', function(){
    it('should increase the red level by 80% the remaining distance to 255', function(){
      let testRed = testBitmap;
      testRed.colorTableBuffer = [0,0,0]
      testRed.colorScale('red');
      expect(testRed.colorTableBuffer).toEqual([0,0,204]);
    })
  })
})
