const { exec } = require('child_process');
const path = require('path');

function runShellScript() {
  exec(`bash ${'./main.sh'}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing shell script: ${error}`);
      return;
    }
    
    console.log(`Shell script output: ${stdout}`);
    console.error(`Shell script errors: ${stderr}`);
  });
}

runShellScript();