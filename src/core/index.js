const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const OBSToken = makeid(32);

exec(`start /d "${path.join(__dirname, "../", "../", "libs", "OBS Studio", "bin", "64bit")}" obs64.exe --collection "test" --profile "test" --websocket_port 5000 --websocket_password ${OBSToken}`, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}