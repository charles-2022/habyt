// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  // Set Content-Type to 'text/plain' so it can be rendered in a browser as text
  res.setHeader('Content-Type', 'text/plain');
  
  // Do not include Content-Disposition to prevent automatic download
  res.status(200).send(file);
};

