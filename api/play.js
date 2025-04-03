// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  console.log('Request Headers:', req.headers);

  const filePath = path.join(process.cwd(), 'play.txt');
  let file;

  try {
    file = fs.readFileSync(filePath, 'utf-8'); // Read as UTF-8
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Internal Server Error');
    return;
  }

  const isIPTVRequest = req.headers['x-iptv-app'] === 'true';

  // Browser download
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Mozilla')) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="playlist.txt"');
    res.status(200).send(file);
    return;
  }

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