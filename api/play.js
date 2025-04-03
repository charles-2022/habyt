// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  console.log('Request Headers:', req.headers);

  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  const isIPTVRequest = req.headers['x-iptv-app'] === 'true';

  if (!isIPTVRequest) {
    console.log('Forbidden: No IPTV App header or incorrect header');
    res.status(403).send('Forbidden: Access Denied');
    return;
  }

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-IPTV-App');

  res.status(200).send(file);
};


