// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  // Check if the request contains the custom header indicating it's from the IPTV app
  const isIPTVRequest = req.headers['x-iptv-app'] === 'true';

  if (!isIPTVRequest) {
    // If the request doesn't have the custom header, return a 403 Forbidden response
    res.status(403).send('Forbidden: Access Denied');
    return;
  }

  // Set Content-Type to text/plain so the browser doesn't download it
  res.setHeader('Content-Type', 'text/plain');

  // Serve the M3U file
  res.status(200).send(file);
};


