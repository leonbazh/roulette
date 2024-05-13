const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/run-script', (req, res) => {
  const scriptPath = path.join(__dirname, 'JS/script.js');
  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      res.status(500).send('Error executing script');
      return;
    }
    
    console.log(`Script output: ${stdout}`);
    console.error(`Script errors: ${stderr}`);
    res.send('Script executed successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});