'use strict';


const reader = require('../model/bitmap.js');
const notSure = require('../model/constructor.js');
const expect = require('expect');



describe('file-ops.js', function(){
  describe('buffer modification', function(){
    it('should return modified buffer hex values? (this is too vague/wrong....?)', function(){
      let something = needSomethingHereSoTestSeesItAsAFunction.grayscale(['01010101, 00110011, 00010001, 00000000'])
      expect(something).toEqual(['0011, 0011, 0011, 0000']);
    });
  });
});

// describe('file-handler.js', function() {
//   describe('#grayScale', function() {
//     fileHandler.readFromFile('bitmap.bmp', 'grayScale', bitmapBuilder);
//     it('should create a new .bmp file with grayscaled colors', function(done) {
//       let testdir = [];
//       fs.readdir('data/', function(err, files) {
//         if (err) throw err;
//         testdir = files;
//         console.log(testdir);
//       });
//       done();
//       expect(testdir).to.include('bitmap-grayscaled.bmp');
//     });
//   });
// });
