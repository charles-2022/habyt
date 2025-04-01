// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename=play.txt');
  res.status(200).send(file);
};
