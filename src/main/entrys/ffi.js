const { ipcMain } = require('electron');
const ffi = require('ffi-napi');
const path = require('path');

const CHANNELNAME = 'test-ffi';

let ffiLib = undefined;

ipcMain.handle(CHANNELNAME, async (event, args) => {
  console.log('args -> ', args);
  const { action } = args;

  switch (action) {
    case 'loadDLL':
      const apiObj = {
        testSleep: ['long', ['long']],
      };

      const libPath = path.join(__dirname, '..', '..','..', 'cpp_code', 'forTest', 'x64', 'Debug', 'forTest.dll');
      console.log('libPath -> ', libPath);

      ffiLib = ffi.Library(libPath, apiObj);

      return 'loadDLL Done';
    case 'syncSleep10S':
      console.log('syncSleep10S');

      console.log('Run C++ function==>');
      ffiLib['testSleep'](10000);
      console.log('Run C++ function==><==');

      return 'syncSleep10S Done';
    case 'asyncSleep10S':
      console.log('Run C++ function==>');
      const r = await new Promise((resolve) => {
        ffiLib['testSleep'].async(10000, (_err, r1) => {
          resolve(r1);
        });
      });
      console.log('Run C++ function==><== ', r);
      return 'asyncSleep10S Done';
    default:
      console.log('default');
      break;
  }
});

// ipcMain.on('MR', (event, args) => {
//   if (args == 'loadDLL') {
//     let apiObj = {
//       add: ['uint32', ['uint32', 'uint32']],
//       testSleep: ['void', ['uint32']],
//       doSomethingTimeConsuming: ['uint32', ['uint32']],
//     };

//     ffiLib = ffi.Library('C:\\00_Work\\03_Personal\\Code\\ArthurXin\\electron-quick-start\\cpp_code\\forTest\\x64\\Debug\\forTest.dll', apiObj);
//   } else if (args == 'Add') {
//     const sum = ffiLib['add'](12, 34);
//     console.log('sum -> ', sum)
//   } else if (args == 'Sleep') {
//     ffiLib['doSomethingTimeConsuming'](10000);
//   }
// })