// api/playlist.js
const fs = require('fs');
const path = require('path');

export default (req, res) => {
  const filePath = path.join(process.cwd(), 'play.txt');
  const file = fs.readFileSync(filePath);

  // Check if the request is coming from the IPTV app (example: check for a custom header or User-Agent)
  const isIPTVRequest = req.headers['user-agent'] && req.headers['user-agent'].includes('YourIPTVAppUserAgent');

  if (!isIPTVRequest) {
    // If the request is not from the IPTV app, return a 403 Forbidden response
    res.status(403).send('Forbidden: Access Denied');
    return;
  }

  // Set Content-Type to text/plain so the browser does not download it automatically
  res.setHeader('Content-Type', 'text/plain');

  // Serve the file normally if the request is from the IPTV app
  res.status(200).send(file);
};

