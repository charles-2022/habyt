// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  console.log('Request Headers:', req.headers);  // Log the headers for debugging

  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  // Check for the custom header X-IPTV-App
  const isIPTVRequest = req.headers['x-iptv-app'] === 'true';

  if (!isIPTVRequest) {
    console.log('Forbidden: No IPTV App header or incorrect header');
    res.status(403).send('Forbidden: Access Denied');
    return;
  }

  // Set the Content-Type for plain text to avoid browser download or rendering
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(file);
};


